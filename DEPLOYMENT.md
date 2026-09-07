# Render Deployment Guide

This repository is optimized for deployment on **[Render](https://render.com/)**. You can choose between two deployment approaches:

---

## Option 1: Single Web Service (Recommended - Simplest & Free-Tier Friendly)

Deploy frontend and backend together as a single Node.js Web Service. Render builds the React client and serves it directly through Express alongside the API routes.

### Steps:
1. Push your latest code to your GitHub repository.
2. Log in to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** → **Web Service**.
4. Connect your GitHub repository: `AI-Mock-Interview`.
5. Configure the service settings:
   - **Name**: `ai-mock-interview`
   - **Region**: Select your closest region (e.g., Singapore, Frankfurt, Oregon)
   - **Branch**: `main`
   - **Root Directory**: *(Leave empty)*
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
6. Add Environment Variables under **Environment**:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGODB_URI`: *Your MongoDB connection string*
   - `JWT_SECRET`: *A secure random string (at least 32 characters)*
   - `JWT_EXPIRES_IN`: `7d`
   - `GEMINI_API_KEY`: *Your Google Gemini API Key*
   - `MURF_API_KEY`: *Your Murf AI API Key*
   - `ASSEMBLYAI_API_KEY`: *Your AssemblyAI API Key*
7. Set **Health Check Path** (under Advanced): `/health`
8. Click **Deploy Web Service**.

Render will install dependencies, build the React frontend, start the server, and serve your app at `https://ai-mock-interview-xxxx.onrender.com`.

---

## Option 2: Two Separate Services (Static Site + Web Service)

If you prefer keeping Frontend and Backend completely isolated:

### A. Backend (Web Service)
1. In Render, create a **Web Service** pointing to your repository.
2. Set **Root Directory**: `server`
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Add the environment variables (`MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, etc.).
6. Set `CLIENT_URL` to your frontend Render URL (e.g., `https://ai-mock-interview-client.onrender.com`).
7. Deploy and copy your backend URL (e.g., `https://ai-mock-interview-server.onrender.com`).

### B. Frontend (Static Site)
1. In Render, click **New +** → **Static Site**.
2. Connect the repository.
3. Set **Root Directory**: `client`
4. Set **Build Command**: `npm install && npm run build`
5. Set **Publish Directory**: `dist`
6. Add Environment Variable:
   - `VITE_API_URL`: `https://ai-mock-interview-server.onrender.com/api`
7. In the Static Site settings, add a **Rewrite Rule**:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
8. Deploy!
