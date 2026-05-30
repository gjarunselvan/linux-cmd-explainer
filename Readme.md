<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Linux%20Command%20Explainer&fontSize=40&fontColor=fff&animation=twinkling&fontAlignY=36&desc=Understand%20any%20Linux%20command%20instantly%20with%20AI&descAlignY=55&descSize=16" />

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-linux--cmd--explainer.vercel.app-00ff9d?style=for-the-badge&logoColor=white)](https://linux-cmd-explainer.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Groq](https://img.shields.io/badge/Powered_by-Groq_AI-F55036?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com)

</div>

---

## 🧠 What is this?

> **Linux Command Explainer** is an AI-powered web app that breaks down any Linux command into plain English — instantly.

Paste a scary-looking command like:

```bash
ps aux | grep nginx | awk '{print $2}' | xargs kill -9
```

And get a clear, structured explanation covering **what it does**, **each flag/part**, **gotchas**, and **pro tips**.

Perfect for DevOps engineers, SREs, students, and anyone who wants to understand Linux better.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI-Powered** | Uses Groq's `llama-3.3-70b-versatile` model for fast, accurate explanations |
| ⚡ **Instant** | Groq's LPU inference gives near-instant responses |
| 🎯 **Structured output** | Always returns: What it does · Breakdown · Watch out · Pro tip |
| 💡 **Example commands** | 6 built-in examples to get started quickly |
| 📋 **Copy output** | One-click copy of the full explanation |
| 🌙 **Dark theme** | Terminal-inspired dark UI, easy on the eyes |
| 📱 **Responsive** | Works on desktop and mobile |

---

## 🖥️ Demo

```
┌─────────────────────────────────────────────────┐
│  $ linux --explainer v1.0                       │
│                                                  │
│  Linux Command                                   │
│  Explainer                                       │
│                                                  │
│  // ENTER COMMAND                                │
│  ┌────────────────────────────────────────────┐ │
│  │ df -h | awk 'NR>1 {print $5,$6}' | sort   │ │
│  └────────────────────────────────────────────┘ │
│  [find logs] [kill process] [tar backup] ...     │
│                                                  │
│  [ Explain this command → ]                      │
│                                                  │
│  // EXPLANATION                                  │
│  📌 WHAT IT DOES                                 │
│  Shows disk usage sorted by percentage...        │
│                                                  │
│  🔍 BREAKDOWN                                    │
│  df -h  → shows disk usage in human readable    │
│  awk    → filters and prints columns 5 and 6    │
│  sort   → sorts by usage percentage             │
└─────────────────────────────────────────────────┘
```

---

## 🏗️ Tech Stack

```
Frontend          Backend           AI / Infra
─────────         ───────           ──────────
React 18          Vercel            Groq Cloud
Vite 5            Serverless        llama-3.3-70b
CSS-in-JS         API Routes        LPU Inference
JetBrains Mono    Node.js           REST API
Syne Font
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A free [Groq API key](https://console.groq.com)

### 1️⃣ Clone the repo

```bash
git clone https://github.com/gjarunselvan/linux-cmd-explainer.git
cd linux-cmd-explainer
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> 🔑 Get your free key at [console.groq.com](https://console.groq.com) → API Keys → Create Key

### 4️⃣ Run locally

```bash
# requires vercel cli for api routes
npm i -g vercel
vercel dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
linux-cmd-explainer/
│
├── 📂 api/
│   └── explain.js        # Vercel serverless function → calls Groq API
│
├── 📂 src/
│   ├── App.jsx            # Main React component (UI + state)
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles + CSS variables
│
├── index.html             # HTML entry point (Vite)
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies and scripts
├── .env                   # Local env variables (not committed)
├── .env.example           # Template for env variables
└── .gitignore
```

---

## 🌐 Deploy to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "feat: initial commit"
git push

# 2. Go to vercel.com → Import your repo
# 3. Add environment variable:
#    GROQ_API_KEY = your key
# 4. Deploy!
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gjarunselvan/linux-cmd-explainer)

---

## 🔌 How it works

```
User types command
       │
       ▼
  React (App.jsx)
  POST /api/explain
       │
       ▼
  Vercel Serverless
  (api/explain.js)
       │
       ▼
  Groq API
  llama-3.3-70b-versatile
       │
       ▼
  Structured explanation
  returned to UI
```

---

## 📝 Example Output

**Input:**
```bash
find / -name '*.log' -mtime -7 -exec ls -lh {} \;
```

**Output:**
```
📌 WHAT IT DOES
Finds all .log files modified in the last 7 days and lists their details.

🔍 BREAKDOWN
find /        → search starting from root directory
-name '*.log' → match files ending in .log
-mtime -7     → modified within the last 7 days
-exec ls -lh  → run ls -lh on each result
{} \;         → {} is placeholder for filename, \; ends the -exec

⚠️ WATCH OUT
Running find from / can be slow and produce permission errors.
Use a specific path like /var/log instead for better performance.

💡 PRO TIP
Add 2>/dev/null to suppress permission denied errors:
find /var/log -name '*.log' -mtime -7 -exec ls -lh {} \; 2>/dev/null
```

---

## 🤝 Contributing

PRs are welcome! Feel free to:
- Add more example commands
- Improve the UI
- Add new features like command history or bookmarks

---

## 👨‍💻 Author

**Arun Selvan G J**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-gjarunselvan-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/gjarunselvan)
[![GitHub](https://img.shields.io/badge/GitHub-gjarunselvan-181717?style=flat-square&logo=github)](https://github.com/gjarunselvan)
[![Portfolio](https://img.shields.io/badge/Portfolio-gjarunselvan.online-00ff9d?style=flat-square)](https://portfolio.gjarunselvan.online)

---

## 📄 License

MIT © [Arun Selvan G J](https://github.com/gjarunselvan)

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" />

</div>
