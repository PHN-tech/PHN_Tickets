PHNS_Tickets

This is a minimal scaffold for a Ticket Marketplace demo (PHNS_Tickets) inspired by demo-punno, hello_world, vesting, gift_card, and using the wallet pattern from `my-dapp`.

What's included:
- Next.js app (app router)
- Client-side wallet integration using `@meshsdk/react` via a dynamically-loaded Mesh provider to avoid SSR issues
- Simple `CreateTicket` and `Marketplace` components
- Mock API routes (`/api/create-ticket`, `/api/buy-ticket`)

Run locally:

1. cd PHNS_Tickets
2. npm install
3. npm run dev

Notes:
- Mesh SDK may pull native/wasm packages (e.g. `@sidan-lab/...`). If you hit build-time WASM errors, ensure you run the app in dev and that `MeshProvider` is loaded client-side (we used dynamic import). For CI/production you may need to include the WASM package or adapt server-side code accordingly.
- All blockchain interactions are mocked; replace the API handlers with real transaction-building code when ready.
#
Getting started (for contributors)

Follow these steps after cloning the repo to run the project locally:

1. Install Node.js 18+ (recommended). Optionally use `nvm` to manage versions.
2. cd into the project folder:

	```powershell
	cd PHNS_Tickets
	# PHNS_Tickets

	Đây là một project demo Marketplace bán vé (Ticket Marketplace) sử dụng Next.js (app router) và tích hợp ví Cardano thông qua Mesh SDK. Mục tiêu là minh họa quy trình mint, lock (khóa) và hiển thị vé trên marketplace.

	**Các thành phần chính:**
	- Trang `CreateTicket`: upload poster, mint token (NFT), và lock token vào script để bán.
	- Trang `Marketplace`: liệt kê các UTxO đã bị khóa vào script (listing), hiển thị token, giá, và thao tác Buy / Re-lock / Burn.
	- API server nhỏ xử lý upload lên Pinata và truy vấn Blockfrost.

	## Yêu cầu môi trường
	- Node.js 18+ (khuyến nghị)
	- NPM hoặc PNPM

	## Cài đặt & chạy (developer)
	1. Clone repo và vào thư mục:

		```powershell
		git clone <repo-url>
		cd PHNS_Tickets
		```

	2. Cài dependencies:

		```powershell
		npm install
		```

	3. Tạo file môi trường từ mẫu và điền các biến:

		```powershell
		copy .env.example .env.local
		# chỉnh .env.local để thêm PINATA_JWT và Blockfrost API key
		```

	4. Chạy dev server:

		```powershell
		npm run dev
		```

	5. Mở trình duyệt và truy cập `http://localhost:3000` rồi vào `/CreateTicket` hoặc `/Marketplace`.

	## Biến môi trường cần có (xem ` .env.example`)
	- `PINATA_JWT`: JWT của Pinata để upload file (server API sử dụng)
	- `NEXT_PUBLIC_GATEWAY_URL`: host gateway Pinata (tùy chọn, dùng để preview)
	- `NEXT_PUBLIC_BLOCKFROST_API_KEY`: Blockfrost project key (hoặc gateway tương đương)
	- `NEXT_PUBLIC_BLOCKFROST_GATEWAY`: URL API gateway (ví dụ testnet Blockfrost)

	> Lưu ý: KHÔNG commit `.env.local` hoặc bất kỳ khoá bí mật nào lên Git. Sử dụng `.env.example` để tài liệu hóa biến cần thiết.

	## Quy trình cơ bản trong app
	1. Tạo vé: lên trang `/CreateTicket` → upload poster → mint token (NFT) → lưu unit của token (policyId + tokenName hex).
	2. Khóa vé (Lock): sau khi mint, click `Lock to Marketplace` để gửi token vào script address (một UTxO trên script chứa datum bán hàng như price, seller,...).
	3. Hiển thị trong Marketplace: trang `/Marketplace` gọi API server để lấy UTxOs của script address, decode datum, lọc assets (non-lovelace) và hiển thị token + price.

	## Vấn đề thường gặp & khắc phục nhanh
	- Nếu dev server báo lỗi WASM / `@sidan-lab` trên Windows: chắc chắn `MeshProvider` chỉ được load client-side (project đã cố gắng làm điều này bằng cách tránh import Mesh phía server). Nếu vẫn gặp lỗi, khởi động lại server hoặc chạy trên môi trường Linux/WSL.
	- Nếu marketplace không hiển thị token:
	  - Chắc chắn bạn đã thực hiện cả hai bước: mint rồi **lock** token vào script (ở `CreateTicket`).
	  - Mở console (F12) và tìm log `[blockfrost]` hoặc `[Marketplace]` để xem UTxO và datum.
	  - Kiểm tra `.env.local` có `NEXT_PUBLIC_BLOCKFROST_API_KEY` và `NEXT_PUBLIC_BLOCKFROST_GATEWAY` hợp lệ.
	- Nếu upload thất bại: kiểm tra `PINATA_JWT` trong `.env.local`.

	## Đóng góp / chạy trên máy người khác
	- Người khác clone repo chỉ cần:
	  - `npm install`
	  - `copy .env.example .env.local` và điền secrets riêng
	  - `npm run dev`
