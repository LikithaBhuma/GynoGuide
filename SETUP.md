# GynoGuideAI – Setup Guide

A step-by-step guide to get GynoGuideAI running on your local machine and deployed online.

---

## ⚡ Quick Start (5 minutes)

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/gynoguide-ai.git
cd gynoguide-ai

# 2. Install
npm install

# 3. Configure API key
cp .env.example .env.local
# Edit .env.local → paste your Anthropic API key

# 4. Run
npm run dev
# Open http://localhost:3000
```

---

## Step 1 — Install Node.js

Download and install **Node.js v18 or newer** from https://nodejs.org/

Verify:
```bash
node --version
# v18.x.x or higher
```

---

## Step 2 — Get Your Anthropic API Key

1. Visit https://console.anthropic.com/
2. Sign up or log in
3. Go to **API Keys** → **Create Key**
4. Copy the key (starts with `sk-ant-api03-...`)
5. Keep it safe — you'll add it to `.env.local`

---

## Step 3 — Install Dependencies

In the project folder:
```bash
npm install
```

This installs React, Vite, react-router-dom, lucide-react, and react-markdown.

---

## Step 4 — Configure Environment

```bash
cp .env.example .env.local
```

Open `.env.local` in any text editor:
```
VITE_ANTHROPIC_API_KEY=sk-ant-api03-PASTE-YOUR-KEY-HERE
```

Save the file.

---

## Step 5 — Run Development Server

```bash
npm run dev
```

Your browser opens to http://localhost:3000 automatically.

**Test the AI chat:**
1. Click "AI Assistant" in the navbar
2. Type: "What are the symptoms of endometriosis?"
3. You should get a detailed AI response

If you see a yellow warning banner about the API key, double-check your `.env.local` file and restart the dev server (`Ctrl+C`, then `npm run dev` again).

---

## Step 6 — Build for Production

When you're ready to deploy:
```bash
npm run build
```

This creates a `dist/` folder with optimized files.

To preview the production build locally:
```bash
npm run preview
# Opens http://localhost:4173
```

---

## Step 7 — Deploy to Vercel

**Easiest option — takes 2 minutes:**

1. Push to GitHub (see below)
2. Go to https://vercel.com → Sign in with GitHub
3. Click **"Add New Project"**
4. Select your `gynoguide-ai` repository
5. Vercel auto-detects Vite — keep default settings
6. Expand **"Environment Variables"**
   - Name: `VITE_ANTHROPIC_API_KEY`
   - Value: your API key
7. Click **Deploy**

Your site is live! Vercel gives you a URL like `https://gynoguide-ai-xyz.vercel.app`.

---

## Step 8 — Push to GitHub

```bash
# First time
git init
git add .
git commit -m "feat: initial GynoGuideAI setup"

# Create repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/gynoguide-ai.git
git branch -M main
git push -u origin main

# Future updates
git add .
git commit -m "feat: added new condition"
git push
```

---

## Troubleshooting

**"Module not found" error:**
```bash
rm -rf node_modules
npm install
```

**AI chat not working (shows yellow banner):**
- Check `.env.local` exists (not `.env`)
- Confirm key starts with `sk-ant-`
- Restart dev server: `Ctrl+C` then `npm run dev`

**Port 3000 already in use:**
```bash
npm run dev -- --port 3001
```

**Build fails:**
```bash
npm run lint  # Check for errors first
npm run build
```

---

## Project Dependencies

| Package | Version | Purpose |
|---|---|---|
| react | ^18.3.1 | UI framework |
| react-dom | ^18.3.1 | React DOM renderer |
| react-router-dom | ^6.26.0 | Client-side routing |
| lucide-react | ^0.383.0 | Icon library |
| react-markdown | ^9.0.1 | Render AI markdown responses |
| remark-gfm | ^4.0.0 | GitHub-flavored markdown |
| vite | ^5.4.0 | Build tool & dev server |
| @vitejs/plugin-react | ^4.3.1 | React support for Vite |
