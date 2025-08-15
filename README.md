# 🚨 Satu Dua Backend (Agora + Express + TypeScript)

This is the backend service for the **Emergency Call App**.  
It handles **token generation** and **channel management** for Agora voice calls between **users (mobile app)** and **operators (web dashboard)**.

---

## ⚙️ Features
- Generate **Agora RTC Tokens** securely.
- Create and manage **call channels**.
- Provide a simple REST API for clients (mobile + web).
- Built with **TypeScript** + **Express**.
- Ready for deployment to **Vercel**, **Railway**, or any Node.js host.

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [Yarn](https://yarnpkg.com/) or `pnpm`
- An [Agora account](https://console.agora.io/)  
  - Create a project in the Agora Console.
  - Get your **App ID** and **App Certificate**.
- An [Upstash Redis](https://upstash.com/) account  
  - Create a Redis database.
  - Get your **Redis URL** and **Token**.

---

## 🚀 Setup Project

### 1. Initialize Project
```bash
mkdir satu-dua-backend
cd satu-dua-backend
pnpm init -y
pnpm install express cors dotenv
pnpm install --save-dev typescript ts-node nodemon @types/node @types/express @types/cors
```

### 2. Setup TypeScript
```bash
pnpx tsc --init
```

Edit `tsconfig.json` to include:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

### 3. Project Structure
```
```

## Environment Variables
Create .env file in the root directory:
```plaintext
AGORA_APP_ID=your-agora-app-id
AGORA_APP_CERTIFICATE=your-agora-app-certificate

UPSTASH_REDIS_URL=yor-upstash-redis-url
UPSTASH_REDIS_TOKEN=your-upstash-redis-token

PORT=4000
```

## Run Locally
```bash
git clone <URL>

cd satu-dua-backend

pnpx i 

pnpx --approve-build

pnpx run dev
```

## API Endpoints
### Start Call
```http
POST /api/start-call
Content-Type: application/json
{
  "userId": 123
}
```

Response:
```json
{
  "channelName": "emergency_16921023944",
  "token": "AGORA-TOKEN-HERE",
  "uid": 123
}
```

### List Active Calls
```http
GET /call/channels
Headers: x-operator-key
```

### Join Call(Operator)
```http
POST /api/join-call
Content-Type: application/json
{
  "channelName": "emergency_16921023944",
  "operatorUid": 456
}
```



