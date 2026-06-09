# 🌸 GynoGuideAI

> An AI-powered gynecology knowledge and assistance platform — conditions, medicines, learning, and video resources all in one place.

![GynoGuideAI Banner](https://img.shields.io/badge/GynoGuideAI-Women's%20Health%20Intelligence-e91e63?style=for-the-badge&logo=heart)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![Claude AI](https://img.shields.io/badge/Powered%20by-Claude%20AI-orange?style=flat)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Git Workflow](#git-workflow)
- [Medical Disclaimer](#medical-disclaimer)

---

## Overview

GynoGuideAI is a comprehensive React-based web application that combines:
- **AI-powered chat assistant** (Claude by Anthropic) specialized in gynecology
- **Conditions library** with detailed information on gynecological diseases
- **Medicine reference** guide for gynecological medications
- **Knowledge hub** with structured learning content
- **Video library** with curated educational gynecology videos

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 AI Assistant | Claude-powered chat for gynecology questions, 24/7 |
| 🔬 Conditions A–Z | 8+ major conditions with symptoms, causes, diagnosis, treatment |
| 💊 Medicine Guide | 10+ gynecology drugs with dosages, side effects, contraindications |
| 📚 Knowledge Hub | Learning modules: anatomy, menstrual cycle, fertility, preventive care |
| 🎬 Video Library | 12 curated YouTube videos from medical institutions |
| 🔍 Search & Filter | Real-time search and category filtering across all sections |
| 📱 Responsive Design | Mobile-first, works on all screen sizes |
| ⚕️ Evidence-Based | Based on ACOG, WHO, and RCOG guidelines |

---

## 🛠 Tech Stack

- **Frontend:** React 18, React Router v6
- **Build Tool:** Vite 5
- **Styling:** Pure CSS with CSS Custom Properties (no CSS framework)
- **AI:** Anthropic Claude API (claude-sonnet-4-20250514)
- **Markdown Rendering:** react-markdown + remark-gfm
- **Icons:** lucide-react

---

## 📁 Project Structure

```
gynoguide-ai/
├── index.html
├── vite.config.js
├── package.json
├── .env.example
├── .gitignore
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Router configuration
    ├── styles/
    │   └── globals.css       # Design system & global styles
    ├── components/
    │   ├── Layout.jsx        # Navbar + Footer wrapper
    │   └── Layout.css
    ├── data/
    │   ├── diseases.js       # Gynecological conditions data
    │   ├── medicines.js      # Medication data
    │   └── videos.js         # Video library data
    ├── utils/
    │   └── anthropicApi.js   # Claude API integration
    └── pages/
        ├── HomePage.jsx/.css
        ├── ChatPage.jsx/.css
        ├── DiseasesPage.jsx/.css
        ├── DiseaseDetailPage.jsx/.css
        ├── MedicinesPage.jsx/.css
        ├── LearnPage.jsx/.css
        └── VideosPage.jsx/.css
```

---

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js** v18+ installed ([Download](https://nodejs.org/))
- **npm** v9+ (comes with Node.js)
- **Anthropic API Key** ([Get one](https://console.anthropic.com/))
- **Git** installed ([Download](https://git-scm.com/))

Check your versions:
```bash
node --version   # Should be v18+
npm --version    # Should be v9+
git --version
```

---

## 🚀 Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/gynoguide-ai.git
cd gynoguide-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:
```env
VITE_ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_ANTHROPIC_API_KEY` | ✅ Yes | Your Anthropic API key for the AI chat feature |

> ⚠️ **Security Note:** Never commit `.env.local` to version control. It's already in `.gitignore`.

---

## ▶️ Running the Project

### Development mode

```bash
npm run dev
```

Opens at `http://localhost:3000` with hot module replacement.

### Preview production build locally

```bash
npm run build
npm run preview
```

---

## 🏗 Building for Production

```bash
npm run build
```

Output is in the `dist/` directory. The build includes:
- Tree-shaken bundle
- CSS optimization
- Asset hashing for cache busting

---

## 🚢 Deployment

### Option 1: Vercel (Recommended — easiest)

1. Push your code to GitHub (see Git Workflow below)
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"New Project"** → Import your repository
4. Under **Environment Variables**, add:
   - Key: `VITE_ANTHROPIC_API_KEY`
   - Value: `sk-ant-api03-your-key`
5. Click **Deploy**

Your app is live at `https://gynoguide-ai.vercel.app` (or custom domain).

### Option 2: Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → **New site from Git**
3. Choose your repo; set build command: `npm run build`, publish dir: `dist`
4. Under **Site settings → Environment variables**, add `VITE_ANTHROPIC_API_KEY`
5. Trigger deploy

### Option 3: GitHub Pages (static hosting)

```bash
npm install --save-dev gh-pages
```

Add to `package.json` scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Add to `vite.config.js`:
```js
base: '/gynoguide-ai/',
```

Deploy:
```bash
npm run deploy
```

---

## 🔄 Git Workflow

### First-time setup

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Initial commit
git commit -m "feat: initial GynoGuideAI project setup"

# Create remote repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/gynoguide-ai.git
git branch -M main
git push -u origin main
```

### Daily development workflow

```bash
# Check status
git status

# Stage changes
git add .
# or stage specific files:
git add src/pages/ChatPage.jsx

# Commit with conventional message
git commit -m "feat: add suggested questions to chat sidebar"

# Push to remote
git push origin main
```

### Branching for features

```bash
# Create and switch to feature branch
git checkout -b feature/add-quiz-section

# ... make changes ...

git add .
git commit -m "feat: add gynecology knowledge quiz"
git push origin feature/add-quiz-section

# Merge back to main (via Pull Request on GitHub, or locally):
git checkout main
git merge feature/add-quiz-section
git push origin main
```

### Commit message conventions

| Prefix | Use for |
|---|---|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `style:` | CSS/design changes |
| `data:` | Adding/updating data |
| `docs:` | Documentation |
| `refactor:` | Code refactoring |
| `chore:` | Dependencies, config |

---

## ⚕️ Medical Disclaimer

> GynoGuideAI is an **educational platform only**. The information provided — including AI responses, condition descriptions, medication details, and videos — is intended for general informational purposes and does not constitute medical advice, diagnosis, or treatment.
>
> Always consult a qualified gynecologist or licensed healthcare provider for personal medical guidance.
>
> In case of a medical emergency, call your local emergency services immediately.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) file for details.

---

Built with ❤️ for women's health education.
