# x402 Mode — HTTP 402 Paywall Engine 🚀

**x402 Mode** is a lightweight, open-source payment-gated access layer implementing the **HTTP 402 (Payment Required)** pattern.

It allows AI agents, APIs, or web services to **charge per request** and unlock content dynamically using on-chain payments (EVM/Solana) + JWT tokens.

---

## ✨ Features
- Toggle paywall mode via `.env` (`X402_MODE=on/off`)
- Automatic **JWT token issuance** on successful payment
- Guard middleware for Fastify or Express
- On-chain verification hooks (EVM / Solana ready)
- Ready-to-run monorepo (Gateway · Client · Merchant · Dashboard · Shared · Infra)

---

## 🏗 Repository Structure
```
x402-mode/
├─ services/gateway/     # 402 gateway (pricing, verify, proxy)
├─ apps/client-agent/    # example buyer agent
├─ apps/merchant-agent/  # example seller/merchant agent
├─ apps/dashboard/       # Next.js dashboard
├─ packages/shared/      # shared types/config/mode helpers
├─ infra/                # docker-compose (Postgres + Redis)
└─ README.md, package.json, .env.example, tsconfig.json
```

---

## ⚙️ Environment Variables
```
X402_MODE=on
X402_TOKEN_TTL=900
X402_JWT_SECRET=change-me
DATABASE_URL=postgresql://x402:x402@localhost:5432/x402
REDIS_URL=redis://localhost:6379
RICH_DEV_WALLET=7HsGPwzrnp1Pm2DbK3QuTaFXNX8bEwYxUSMkUg6dnwu5
```

---

## 🧠 Flow Overview
1️⃣ **Client** requests a paywalled resource → receives HTTP 402 invoice JSON  
2️⃣ **Payment** occurs on-chain (EVM USDC or SPL USDC)  
3️⃣ **Gateway** verifies tx → issues a **JWT token**  
4️⃣ **Client** retries with `Authorization: Bearer <token>`  
5️⃣ **Merchant** validates token and grants access  

---

## 🔧 Quick Start
```bash
cp .env.example .env
npm i
docker compose -f infra/docker-compose.yml up -d
npm run dev
```

Then open:
- Gateway → http://localhost:4020  
- Merchant → http://localhost:4021  
- Dashboard → http://localhost:3000  

---

## 🧩 Example API
| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/x402/quote` | POST | Returns a 402 invoice (price + nonce + resource) |
| `/x402/verify` | POST | Verifies tx, issues token |
| `/x402/token/verify` | POST | Checks token validity |
| `/premium` | GET | Example paywalled resource |

---

## 🛠 Integration Tips
- Replace `verify-evm.ts` with real EVM tx log parser (viem/ethers)  
- Or add `verify-solana.ts` using @solana/web3.js  
- Add Redis/Postgres receipts persistence  
- Extend dashboard to show invoices + receipts  

---

## 📜 License
MIT — free for commercial and open-source use.  
Built for agent-to-agent payments and Web3 micro-commerce.

---

*(c) 2025 x402 Mode Community — Inspired by pandorax402 and RICH Ecosystem)*
