# PHN Tickets - Marketplace Bán Vé Blockchain

**PHN Tickets** là một ứng dụng web3 cho phép người dùng tạo, khóa, và bán vé (NFT) trên blockchain Cardano thông qua Marketplace được xây dựng với Next.js, Mesh SDK, và Plutus Smart Contracts.

## 📋 Mục Lục
- [Giới Thiệu](#giới-thiệu)
- [Tính Năng](#tính-năng)
- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [Cài Đặt & Cấu Hình](#cài-đặt--cấu-hình)
- [Cách Sử Dụng](#cách-sử-dụng)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Quy Trình Hoạt Động](#quy-trình-hoạt-động)
- [API Routes](#api-routes)
- [Smart Contract](#smart-contract)
- [Khắc Phục Sự Cố](#khắc-phục-sự-cố)
- [Tài Liệu Tham Khảo](#tài-liệu-tham-khảo)

---

## 🎯 Giới Thiệu

PHN Tickets là một nền tảng marketplace phi tập trung cho phép:
- **Người bán**: Tạo vé (NFT), đặt giá, khóa vào smart contract
- **Người mua**: Duyệt danh sách vé, mua vé, nhận NFT vào ví
- **Quản lý**: Re-lock vé, cập nhật giá, hủy danh sách

Dự án được xây dựng trên:
- **Blockchain**: Cardano (Preprod testnet)
- **Frontend**: Next.js 16 + React 19
- **SDK**: Mesh SDK (@meshsdk/core, @meshsdk/react)
- **Smart Contract**: Plutus v3 (Aiken language)
- **Storage**: Pinata (IPFS)
- **Indexer**: Blockfrost

---

## ✨ Tính Năng

### 1. **Tạo Vé (Create Ticket)**
- Upload ảnh poster (lưu trữ trên IPFS via Pinata)
- Nhập thông tin vé: tên, số lượng, giá
- Mint NFT với metadata trỏ tới ảnh
- Khóa token vào smart contract để bán

### 2. **Marketplace**
- Danh sách tất cả vé đã bị khóa (listings)
- Hiển thị ảnh, tên, giá, số lượng còn lại
- **Mua vé**: Người mua chọn số lượng, thực hiện transaction
- **Re-lock**: Chủ sở hữu khóa lại vé với số lượng mới
- **Burn**: Hủy danh sách vé (chỉ chủ sở hữu)
- **Cập nhật giá**: Thay đổi giá bán

### 3. **Ví Dụ Giao Dịch**
- Tích hợp tự động với các ví Cardano (Nami, Eternl, v.v.)
- Ký giao dịch, submit lên blockchain
- Tracking trạng thái transaction

---

## 💻 Yêu Cầu Hệ Thống

### Bắt Buộc
- **Node.js**: 18.0.0 hoặc cao hơn
- **NPM** hoặc **PNPM**: Để quản lý dependencies
- **Git**: Clone repository

### Tài Khoản & API Keys
1. **Pinata** (lưu ảnh):
   - Đăng ký tại [pinata.cloud](https://www.pinata.cloud)
   - Lấy JWT token

2. **Blockfrost** (indexer):
   - Đăng ký tại [blockfrost.io](https://blockfrost.io)
   - Chọn network "Cardano Preprod"
   - Lấy API key

3. **Ví Cardano** (testnet):
   - Cài đặt [Nami](https://chrome.google.com/webstore) hoặc [Eternl](https://eternl.io)
   - Request test ADA từ faucet Preprod

---

## 🚀 Cài Đặt & Cấu Hình

### Bước 1: Clone Repository
```bash
git clone https://github.com/your-repo/PHN_Tickets.git
cd PHN_Tickets
```

### Bước 2: Cài Đặt Dependencies
```bash
npm install
# hoặc
pnpm install
```

### Bước 3: Tạo File `.env.local`
Tại thư mục gốc dự án, tạo file `.env.local` với nội dung:

```env
# Pinata (IPFS storage)
PINATA_JWT=your_pinata_jwt_token_here

# Blockfrost API
NEXT_PUBLIC_BLOCKFROST_API_KEY=your_blockfrost_api_key_here

# Pinata Gateway
NEXT_PUBLIC_GATEWAY_URL=https://gateway.pinata.cloud

# Cardano Network (preprod hoặc mainnet)
NEXT_PUBLIC_NETWORK=preprod
```

### Bước 4: Kiểm Tra & Build Smart Contract
```bash
cd aiken-marketplace
aiken build
cd ..
```

### Bước 5: Chạy Development Server
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

---

## 🎮 Cách Sử Dụng

### Quy Trình Người Bán

#### 1. Tạo Vé Mới
1. Truy cập tab **"Create Ticket"**
2. Nhấp **"Choose File"** và chọn ảnh poster
3. Nhập các thông tin:
   - **Tên vé**: VD: "Coldplay 2025"
   - **Số lượng**: VD: "100"
   - **Giá (Lovelace)**: VD: "5000000" (= 5 ADA)
4. Nhấp **"Create & Lock"**
5. Xác nhận trong ví, chờ transaction hoàn tất

#### 2. Quản Lý Vé (MyTicket)
1. Truy cập tab **"My Ticket"**
2. Xem danh sách vé của bạn
3. Các tùy chọn cho mỗi vé:
   - **Burn**: Hủy danh sách (không thể mua được nữa)
   - **Re-lock**: Thay đổi số lượng, khóa lại
   - **Update Price**: Cập nhật giá bán

### Quy Trình Người Mua

#### 1. Duyệt Marketplace
1. Truy cập tab **"Marketplace"**
2. Xem danh sách tất cả vé có sẵn
3. Mỗi vé hiển thị: ảnh, tên, giá, số lượng

#### 2. Mua Vé
1. Chọn vé muốn mua
2. Nhập **số lượng** cần mua
3. Nhấp **"Buy"**
4. Xác nhận giao dịch trong ví
5. Chờ transaction hoàn tất
6. Vé sẽ được chuyển vào ví của bạn

---

## 📁 Cấu Trúc Dự Án

```
PHN_Tickets/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Layout chính
│   │   ├── page.tsx                  # Trang chủ
│   │   ├── create/                   # Trang tạo vé
│   │   │   └── page.tsx
│   │   ├── Marketplace/              # Trang marketplace
│   │   │   └── page.tsx
│   │   ├── MyTicket/                 # Trang quản lý vé của bạn
│   │   │   └── page.tsx
│   │   ├── api/                      # API Routes
│   │   │   ├── blockfrost/route.ts   # Fetch dữ liệu từ Blockfrost
│   │   │   ├── upload/route.ts       # Upload ảnh lên Pinata
│   │   │   └── url/route.ts          # Lấy URL ảnh từ IPFS
│   │   ├── CreateTicket/             # Component tạo vé
│   │   │   └── CreateTicket.tsx
│   │   └── globals.css               # Stylesheet chung
│   ├── components/                   # React Components
│   │   ├── Header.tsx                # Header navigation
│   │   ├── providers.tsx             # Mesh Provider (client-side)
│   │   ├── Home/                     # Components trang chủ
│   │   │   ├── WalletInfo.tsx
│   │   │   ├── WalletList.tsx
│   │   │   ├── SendTransaction.tsx
│   │   │   └── AssetViewer.tsx
│   │   ├── CreateTicket/             # Components tạo vé
│   │   │   └── CreateTicket.tsx
│   │   ├── Marketplace/              # Components marketplace
│   │   │   └── Marketplace.tsx
│   │   └── MyTicket/                 # Components quản lý vé
│   │       ├── BurnForm.tsx
│   │       └── RelockForm.tsx
│   ├── mesh.ts                       # Mesh Adapter (class extends cho SDK)
│   ├── offchain.ts                   # Contract class (build transactions)
│   └── utils/
│       └── config.ts                 # Config Pinata & Blockfrost
├── aiken-marketplace/                # Smart Contract (Plutus/Aiken)
│   ├── aiken.toml
│   ├── plutus.json                   # Compiled contract
│   ├── validators/
│   │   └── ticket_marketplace.ak     # Main contract file
│   └── build/                        # Build outputs
├── public/                           # Static files
├── package.json
├── tsconfig.json
├── next.config.ts
├── index.ts                          # CLI script (lock/unlock)
├── .env.local                        # Environment variables
└── README.md / README_VI.md
```

---

## ⚙️ Quy Trình Hoạt Động

### Sơ Đồ Luồng Dữ Liệu

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                      │
│  ┌────────────────┐  ┌─────────────┐  ┌──────────────────┐ │
│  │ Create Ticket  │  │ Marketplace │  │   My Tickets     │ │
│  └────────────────┘  └─────────────┘  └──────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
						   │
		 ┌─────────────────┼─────────────────┐
		 │                 │                 │
	┌────▼────┐      ┌────▼────┐      ┌─────▼─────┐
	│  Mesh   │      │ Offchain │     │  API      │
	│   SDK   │      │ Contract │     │  Routes   │
	│         │      │          │     │           │
	└────┬────┘      └────┬─────┘     └─────┬─────┘
		 │                │                 │
		 │         ┌──────▼──────┐         │
		 │         │  Plutus      │         │
		 │         │  Contract    │         │
		 │         └──────┬───────┘         │
		 │                │                 │
	┌────▼────────────────▼─────────────────▼────┐
	│          Cardano Blockchain (Preprod)      │
	│     - Mint NFT (Policy)                    │
	│     - Lock UTxO (Smart Contract)           │
	│     - Spend UTxO (Buy/Unlock)              │
	└──────────────────────────────────────────────┘
		 │
	┌────▼─────────────────────────────────────┐
	│   Data Indexers & Storage                │
	│  - Blockfrost (Indexing)                 │
	│  - Pinata (IPFS - Metadata & Images)     │
	└──────────────────────────────────────────┘
```

### Quy Trình Mint & Lock Vé

```
1. Người dùng upload ảnh + nhập thông tin
   │
2. Upload ảnh → Pinata (IPFS)
   │
3. Tạo metadata NFT với URI trỏ đến IPFS
   │
4. Mint NFT:
   - Tạo Policy ID
   - Mint token với số lượng
   │
5. Lock vào Script:
   - Tạo Datum: [seller, price, policy_id, asset_name, status, total_qty]
   - Tạo UTxO với Datum tại script address
   │
6. Vé sẵn sàng bán trên Marketplace
```

### Quy Trình Mua Vé

```
1. Người mua chọn vé, nhập số lượng
   │
2. Build transaction:
   - Input: Script UTxO (tất cả vé)
   - Redeemer: [action=0(buy), buyer, qty, None]
   - Outputs:
	 * Send purchased qty to buyer
	 * Lock remaining qty vào script (nếu có)
   │
3. Ký giao dịch với ví
   │
4. Submit transaction
   │
5. Vé được chuyển vào ví người mua
```

---

## 🔌 API Routes

### `GET /api/blockfrost`
**Mục đích**: Fetch UTxO data từ Blockfrost

**Parameters**:
- `tx_hash`: Transaction hash
- `address`: (tùy chọn) Wallet address

**Response**:
```json
{
  "utxos": [
	{
	  "input": { "txHash": "...", "outputIndex": 0 },
	  "output": {
		"address": "addr...",
		"amount": [
		  { "unit": "lovelace", "quantity": "2000000" },
		  { "unit": "policy.asset", "quantity": "100" }
		],
		"inlineDatum": "..."
	  }
	}
  ]
}
```

### `POST /api/upload`
**Mục đích**: Upload ảnh lên Pinata (IPFS)

**Request Body**:
```json
{
  "file": "<binary-file-data>"
}
```

**Response**:
```json
{
  "ipfsHash": "QmXxxx...",
  "url": "https://gateway.pinata.cloud/ipfs/QmXxxx..."
}
```

### `GET /api/url`
**Mục đích**: Lấy URL ảnh từ IPFS hash

**Parameters**:
- `hash`: IPFS hash

**Response**:
```json
{
  "url": "https://gateway.pinata.cloud/ipfs/QmXxxx..."
}
```

---

## 📜 Smart Contract

### Plutus Contract (Aiken Language)
**File**: `aiken-marketplace/validators/ticket_marketplace.ak`

### Datum Structure
```aiken
pub type TicketDatum {
  seller: ByteArray,        // Seller's public key hash
  price: Int,               // Giá (Lovelace)
  policy_id: ByteArray,     // NFT Policy ID
  asset_name: ByteArray,    // NFT Asset Name
  status: Int,              // Trạng thái (0=normal, 1=locked, ...)
  total_quantity: Int       // Tổng số lượng vé
}
```

### Redeemer Actions
```aiken
pub type TicketRedeemer {
  action: Int,              // 0=buy, 1=cancel, 2=update_price
  buyer: ByteArray,         // Buyer/actor public key hash
  quantity: Int,            // Số lượng giao dịch
  new_price: Option(Int)    // Giá mới (cho update_price)
}
```

### Logic Xác Thực
- **Buy (action=0)**:
  - Buyer ký giao dịch
  - Unlock một phần vé
  - Lock lại phần còn lại với Datum cũ
  - Trả tiền cho seller

- **Cancel (action=1)**:
  - Chỉ seller mới có thể hủy
  - Unlock tất cả vé
  - Return vé cho seller

- **Update Price (action=2)**:
  - Chỉ seller mới có thể cập nhật
  - Lock lại vé với Datum có giá mới

---

## 🐛 Khắc Phục Sự Cố

### Lỗi: "Cannot read properties of undefined (reading 'forEach')"
**Nguyên nhân**: Amounts array không được validate trước khi pass vào transaction builder

**Giải pháp**:
1. Kiểm tra console browser (F12 → Console)
2. Tìm message: `[buyTickets] Amounts:` hoặc `[cancelListing] Amounts:`
3. Nếu empty hoặc undefined, UTxO không có token hợp lệ
4. Cập nhật code offchain.ts để validate amounts trước use

### Lỗi: "UTxO not found for given txHash after retries"
**Nguyên nhân**: Transaction chưa được index bởi Blockfrost hoặc UTxO không tồn tại

**Giải pháp**:
1. Kiểm tra Preprod Explorer: https://preprod.cexplorer.io
2. Tìm transaction hash trong explorer
3. Nếu transaction pending, chờ 1-2 phút
4. Kiểm tra Blockfrost API key có hợp lệ không

### Lỗi: "No asset found in UTxO"
**Nguyên nhân**: UTxO không chứa token NFT (chỉ có ADA)

**Giải pháp**:
1. Kiểm tra UTxO có đúng token không
2. Nếu là listing mới, chờ Blockfrost index
3. Refresh trang Marketplace

### Lỗi: "Invalid asset in UTxO for cancellation"
**Nguyên nhân**: Metadata hoặc structure asset không hợp lệ

**Giải pháp**:
1. Kiểm tra token có unit và quantity không
2. Re-create listing hoặc liên hệ admin

### Lỗi: "No collateral available"
**Nguyên nhân**: Ví không đủ ADA để dùng làm collateral (tối thiểu 2 ADA)

**Giải pháp**:
1. Request test ADA từ faucet: https://docs.cardano.org/cardano-testnets/tools/faucet
2. Chờ transaction confirm
3. Refresh trang

### WASM Build Errors
**Nguyên nhân**: @sidan-lab/... package có native dependencies

**Giải pháp**:
```bash
# Xóa node_modules & package-lock
rm -r node_modules package-lock.json

# Cài lại
npm install

# Chạy dev (không build)
npm run dev

# Nếu vẫn lỗi, thêm vào next.config.ts:
module.exports = {
  webpack: (config, { isServer }) => {
	config.externals.push({
	  '@sidan-lab/lucid-cardano': '@sidan-lab/lucid-cardano'
	});
	return config;
  }
}
```

---

## 📚 Tài Liệu Tham Khảo

### Cardano & Blockchain
- [Cardano Official](https://cardano.org)
- [Cardano Docs](https://docs.cardano.org)
- [Preprod Testnet Faucet](https://docs.cardano.org/cardano-testnets/tools/faucet)
- [Cexplorer - Preprod Explorer](https://preprod.cexplorer.io)

### SDK & Tools
- [Mesh SDK Docs](https://meshjs.dev)
- [Blockfrost API](https://blockfrost.io)
- [Pinata Docs](https://docs.pinata.cloud)
- [Aiken Language](https://aiken-lang.org)

### Next.js & React
- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Ví Cardano Testnet
- [Nami Wallet](https://namiwallet.io)
- [Eternl Wallet](https://eternl.io)
- [Typhon Wallet](https://typhonwallet.io)

---

## 🤝 Đóng Góp

Để đóng góp vào dự án:

1. Fork repository
2. Tạo branch feature: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Mở Pull Request

---

## 📄 License

Dự án được phát hành dưới license MIT. Chi tiết xem file LICENSE.

---

## 📞 Liên Hệ & Support

- **Issues**: Sử dụng GitHub Issues để báo lỗi
- **Discussions**: Tham gia GitHub Discussions để thảo luận
- **Email**: hoangphong7889@gmail.com

---

**Cảm ơn đã sử dụng PHN Tickets!** 🎟️✨
