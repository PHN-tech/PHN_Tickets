import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';


// Định nghĩa cấu trúc dữ liệu UTXO trả về (tương tự Mesh SDK)
interface ProcessedUTXO {
    input: {
        txHash: string;
        outputIndex: number;
    };
    output: {
        address: string;
        amount: Array<{ unit: string; quantity: string }>;
    };
    assets: Array<{ unit: string; quantity: string }>;
    datum: any;
    metadata?: any; // Thêm metadata cho asset
}


export async function POST(request: NextRequest) {
    try {
        // 1. Lấy địa chỉ từ request
        const { address } = await request.json();


        // 2. Kiểm tra địa chỉ
        if (!address) {
            return NextResponse.json({ error: 'Thiếu địa chỉ ví' }, { status: 400 });
        }


        // 3. Cấu hình Blockfrost
        const blockfrostURL = process.env.NEXT_PUBLIC_BLOCKFROST_GATEWAY || 'https://cardano-preprod.blockfrost.io/api/v0';
        const apiKey = process.env.BLOCKFROST_API_KEY || process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY || '';
        const headers = {
            project_id: apiKey
        };

        if (!apiKey) {
            console.error('[blockfrost] Missing Blockfrost API key');
            return NextResponse.json({ success: false, error: 'Missing Blockfrost API key' }, { status: 500 });
        }


        // 4. Lấy UTXOs từ Blockfrost
        const response = await axios.get(`${blockfrostURL}/addresses/${address}/utxos`, { headers });
        const utxos = response.data;


        // 5. Xử lý từng UTXO
        const result: ProcessedUTXO[] = [];


        for (const utxo of utxos) {
            let datumValue = null;
            let metadata = null;

            console.log(`[blockfrost] Processing UTXO: ${utxo.tx_hash}#${utxo.output_index}`);
            console.log(`[blockfrost] Has data_hash: ${!!utxo.data_hash}, Has inline_datum: ${!!utxo.inline_datum}`);

            // Tìm asset chính (non-lovelace)
            const mainAsset = utxo.amount.find((a: any) => a.unit !== 'lovelace');
            if (mainAsset) {
                try {
                    const metaResponse = await axios.get(`${blockfrostURL}/assets/${mainAsset.unit}`, { headers });
                    metadata = metaResponse.data;
                    console.log(`[blockfrost] Got metadata for ${mainAsset.unit}:`, metadata);
                } catch (err) {
                    console.error(`[blockfrost] Error fetching metadata for ${mainAsset.unit}:`, err);
                }
            }

            if (utxo.data_hash) {
                try {
                    const datumResponse = await axios.get(`${blockfrostURL}/scripts/datum/${utxo.data_hash}`, { headers });
                    datumValue = datumResponse.data.json_value;
                    console.log(`[blockfrost] Got datum from data_hash:`, datumValue);
                } catch (err) {
                    console.error(`[blockfrost] Error fetching datum:`, err);
                    datumValue = { error: 'Không thể lấy datum' };
                }
            } else if (utxo.inline_datum) {
                // Inline datum từ Blockfrost là hex string CBOR
                // Thử parse nó
                try {
                    // Inline datum thường là hex, cần giải mã
                    datumValue = { cbor: utxo.inline_datum, raw: utxo.inline_datum };
                    console.log(`[blockfrost] Got inline_datum (hex):`, utxo.inline_datum);
                } catch (err) {
                    datumValue = { error: 'Không thể parse inline datum' };
                }
            }


            result.push({
                input: {
                    txHash: utxo.tx_hash,
                    outputIndex: utxo.output_index
                },
                output: {
                    address: utxo.address,
                    amount: utxo.amount
                },
                assets: utxo.amount,
                datum: datumValue,
                metadata: metadata
            });
        }

        console.log(`[blockfrost] Returning ${result.length} UTXOs`);


        // 6. Trả về kết quả
        return NextResponse.json({
            success: true,
            data: result,
            total: result.length
        });


    } catch (error) {
        console.error('Lỗi API:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Không thể lấy dữ liệu blockchain'
            },
            { status: 500 }
        );
    }
}
