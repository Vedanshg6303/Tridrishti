# 🛠️ TRIDRISHTI.COM — Official Setup & Deployment Guide

---

## 1. Prerequisites
- **Node.js**: v18+ or v20+
- **npm** or **yarn**
- *(Optional)* **MongoDB Atlas URI** (The server runs immediately out-of-the-box in zero-delay in-memory mode if no MongoDB connection is provided).
- *(Optional)* **Razorpay Key & Secret** (Simulated gateway flow is built-in for local testing).

---

## 2. Local Setup Instructions

### Step 1: Start Backend API Server
```bash
cd server
npm install
npm run dev
```
*The backend API server boots in <100ms at `http://localhost:5001`.*

### Step 2: Start Frontend Client
```bash
cd client
npm install
npm run dev
```
*The React + Vite frontend launches at `http://localhost:5173`.*

---

## 3. Environment Variables Reference

### Backend (`server/.env`):
```env
PORT=5001
NODE_ENV=development
JWT_SECRET=tridrishti_jwt_super_secret_production_key_2026
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=tridrishti_refresh_super_secret_key_2026
REFRESH_TOKEN_EXPIRES_IN=30d
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tridrishti?retryWrites=true&w=majority
RAZORPAY_KEY_ID=rzp_test_your_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLIENT_URL=http://localhost:5173
```

### Frontend (`client/.env`):
```env
VITE_API_URL=http://localhost:5001/api
```

---

## 4. One-Click Cloud Deployment

### 🌐 Deploy Frontend to Vercel
1. Push `TRIDRISHTI_PLATFORM_OFFICIAL` to GitHub.
2. In Vercel, import the repository and set Root Directory to `client`.
3. Set `VITE_API_URL` to your deployed backend URL.
4. Click **Deploy**. *(Pre-configured with `vercel.json` SPA routing)*.

### ⚙️ Deploy Backend to Render / Railway
1. In Render, select **New Web Service** and select Root Directory `server`.
2. Build Command: `npm install && npm run build`
3. Start Command: `npm start`
4. Add environment variables.
5. Click **Create Web Service**.
