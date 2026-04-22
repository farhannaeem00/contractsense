<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=4F46E5&height=200&section=header&text=ContractSense&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=AI-Powered%20Contract%20Intelligence%20Platform&descAlignY=58&descSize=18" width="100%"/>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live%20%F0%9F%9F%A2-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PRs-Welcome-orange?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq-LLaMA3-8B5CF6?style=for-the-badge&logo=ai&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<p align="center">
  <a href="https://contractsenseclient.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/%F0%9F%9A%80%20Live%20Demo-Visit%20Now-4F46E5?style=for-the-badge" />
  </a>
  <a href="https://contractsense-seven.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/%F0%9F%94%97%20API-Live%20Backend-10B981?style=for-the-badge" />
  </a>
  <a href="https://github.com/farhannaeem00/contractsense" target="_blank">
    <img src="https://img.shields.io/badge/%E2%AD%90%20Star-this%20repo-FFD700?style=for-the-badge" />
  </a>
</p>

<br/>

> ### 🧠 *"Upload any contract. Get instant AI-powered risk analysis. No lawyer needed."*

<br/>

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🔍 Overview

**ContractSense** is a full-stack AI-powered SaaS platform that transforms the way individuals and businesses review legal contracts. Built with the **MERN stack** and integrated with **Groq AI (LLaMA3-70B)**, it enables anyone to upload a PDF or DOCX contract and receive an instant, comprehensive risk analysis — without spending hundreds of dollars on a lawyer.

ContractSense is architected as a **production-grade application** with JWT authentication, background processing, real-time status polling, AI-generated analysis, and PDF report generation — all deployed on scalable cloud infrastructure at zero hosting cost.

---

## 🔴 The Problem

<table>
<tr>
<td width="50%">

**The Legal Gap is Real:**
- 📋 Freelancers sign 10+ contracts per year without fully understanding them
- 💸 Lawyers charge **$200–$500/hour** for contract review
- ⚠️ 60% of small businesses have signed unfair contracts
- 🕒 Manual contract review takes **2–5 hours** per document
- 🌍 In developing countries, access to legal services is nearly impossible

</td>
<td width="50%">

**The Hidden Costs of Uninformed Signing:**
- Non-compete clauses that restrict career growth
- IP ownership buried in freelance agreements
- 90-day payment terms that destroy cash flow
- Liability caps that leave you exposed
- Auto-renewal traps that quietly drain budgets

</td>
</tr>
</table>

---

## 💡 The Solution

ContractSense bridges the **legal intelligence gap** by combining:

```
📄 Document Parsing  +  🤖 AI Analysis  +  📊 Risk Visualization  +  📥 PDF Reports
```

> Upload → Extract → Analyze → Visualize → Act

In under **60 seconds**, users get a complete breakdown of every clause, a risk score from 0–100, plain-English explanations, and actionable negotiation suggestions — all through a clean, intuitive dashboard.

---

## ✨ Key Features

<table>
<tr>
<td>

### 🔐 Authentication System
- Secure JWT-based authentication
- Password hashing with bcrypt (12 rounds)
- Protected routes on frontend and backend
- Automatic token refresh on expiry

</td>
<td>

### 📄 Smart Document Processing
- PDF and DOCX support (up to 10MB)
- In-memory file processing (no disk writes)
- Robust multi-page text extraction
- Handles complex, multi-section contracts

</td>
</tr>
<tr>
<td>

### 🤖 AI Contract Analysis
- Powered by **Groq LLaMA3-70B**
- Automatically extracts all significant clauses
- Scores each clause: `LOW` / `MEDIUM` / `HIGH` risk
- Plain-English explanations for every finding
- Negotiation strategy suggestions per clause

</td>
<td>

### 📊 Risk Intelligence Dashboard
- Overall contract risk score (0–100)
- Clause-by-clause visual breakdown
- Color-coded risk indicators
- Real-time analysis status polling
- Auto-refreshes every 4 seconds

</td>
</tr>
<tr>
<td>

### 📅 Deadline Intelligence
- Automatically extracts all dates from contracts
- Calculates days remaining per deadline
- Status labels: `expired` / `due today` / `due soon` / `upcoming` / `future`
- Visual deadline cards with urgency-based colors

</td>
<td>

### 📥 PDF Report Generation
- Professional reports generated via PDFKit
- Includes risk score, summary, and all clauses
- Color-coded by risk level
- Secure download via authenticated API endpoint
- Blob-based download (no token leakage in URL)

</td>
</tr>
<tr>
<td>

### ⚡ Background Processing
- Non-blocking contract analysis pipeline
- Instant `202 Accepted` response to the client
- AI analysis runs asynchronously in the background
- Error recovery and persistent status tracking

</td>
<td>

### 🎨 Professional UI/UX
- Clean, minimal design system
- Fully responsive on mobile and desktop
- Toast notification system
- Skeleton loading animations
- Drag-and-drop file upload

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 18.x | UI framework |
| Vite | 5.x | Build tool and dev server |
| TailwindCSS | 3.x | Utility-first styling |
| React Router | 6.x | Client-side routing |
| Axios | Latest | HTTP client with interceptors |
| Lucide React | Latest | Icon library |
| React Hot Toast | Latest | Toast notifications |
| React Dropzone | Latest | Drag-and-drop file upload |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20.x | Runtime environment |
| Express.js | 4.18 | REST API framework |
| MongoDB Atlas | M0 | NoSQL cloud database |
| Mongoose | 7.x | MongoDB ODM |
| JSON Web Token | Latest | Stateless authentication |
| bcryptjs | Latest | Password hashing |
| Multer | Latest | Multipart file upload handler |
| pdf-parse | Latest | PDF text extraction |
| mammoth | Latest | DOCX text extraction |
| PDFKit | Latest | PDF report generation |
| Groq SDK | Latest | AI inference client |

### Infrastructure & DevOps

| Service | Purpose | Cost |
|---|---|---|
| Vercel | Frontend + Backend hosting | **Free** |
| MongoDB Atlas | Cloud database (M0 tier) | **Free** |
| Groq API | LLaMA3-70B inference | **Free** |
| GitHub | Version control and CI/CD | **Free** |

> 💡 **Total infrastructure cost: $0/month**

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│                                                                 │
│   React + Vite + TailwindCSS (Vercel CDN)                       │
│   Landing → Auth → Dashboard → Upload → Analysis               │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS / REST API
                           │ JWT Bearer Token
┌──────────────────────────▼──────────────────────────────────────┐
│                        API GATEWAY                              │
│                   Node.js + Express.js                          │
│                                                                 │
│   ┌─────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│   │  /api/auth  │  │/api/contracts│  │    /api/reports      │  │
│   │  register   │  │  upload      │  │    PDF generation    │  │
│   │  login      │  │  get/delete  │  │    PDFKit            │  │
│   │  me         │  │  analyze     │  │                      │  │
│   └─────────────┘  └──────┬───────┘  └──────────────────────┘  │
│                           │                                     │
│   ┌───────────────────────▼───────────────────────────────────┐ │
│   │                  SERVICE LAYER                            │ │
│   │                                                           │ │
│   │  extractText()  →  analyzeContract()  →  processDeadlines│ │
│   │  pdf-parse          Groq LLaMA3           Date calculator │ │
│   │  mammoth            JSON parsing          Status labels   │ │
│   └───────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Mongoose ODM
┌──────────────────────────▼──────────────────────────────────────┐
│                      DATA LAYER                                 │
│                   MongoDB Atlas (M0)                            │
│                                                                 │
│   Users Collection          Contracts Collection               │
│   ├── _id                   ├── _id                            │
│   ├── name                  ├── userId (ref: Users)            │
│   ├── email (unique)        ├── fileName                       │
│   └── password (hashed)     ├── rawText                        │
│                             ├── status                         │
│                             ├── riskScore                      │
│                             ├── summary                        │
│                             ├── clauses[]                      │
│                             └── deadlines[]                    │
└─────────────────────────────────────────────────────────────────┘
```

### Request Lifecycle — Contract Upload

```
1. User uploads PDF              → POST /api/contracts (multipart/form-data)
2. Multer stores file in memory  → Buffer (no disk write)
3. Contract saved to MongoDB     → status: "analyzing"
4. 202 response sent instantly   → contractId returned to client
5. Background process starts     ─────────────────────────────────┐
6. Text extracted from buffer    → pdf-parse / mammoth            │
7. Text sent to Groq AI          → LLaMA3-70B (~8k tokens)        │
8. AI returns structured JSON    → clauses, score, summary        │
9. Deadlines processed           → daysRemaining calculated       │
10. MongoDB updated              → status: "done"  ◄──────────────┘
11. Frontend polls every 4s      → detects "done" → renders UI
```

---

## 📁 Project Structure

```
contractsense/
│
├── 📁 client/                          # React Frontend (Vite)
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 context/
│   │   │   └── AuthContext.jsx         # Global auth state management
│   │   ├── 📁 pages/
│   │   │   ├── Landing.jsx             # Marketing landing page
│   │   │   ├── Login.jsx               # User login
│   │   │   ├── Register.jsx            # User registration
│   │   │   ├── Dashboard.jsx           # Contract list and stats
│   │   │   ├── Upload.jsx              # Drag-and-drop upload
│   │   │   └── Analysis.jsx            # Full AI analysis view
│   │   ├── 📁 utils/
│   │   │   └── api.js                  # Axios instance with interceptors
│   │   ├── App.jsx                     # Router and protected routes
│   │   ├── main.jsx                    # React entry point
│   │   └── index.css                   # Tailwind base imports
│   ├── .env                            # Local environment variables
│   ├── .env.production                 # Production environment variables
│   ├── vite.config.js                  # Vite and Tailwind config
│   └── package.json
│
├── 📁 server/                          # Node.js Backend
│   ├── 📁 config/
│   │   └── db.js                       # MongoDB connection
│   ├── 📁 controllers/
│   │   ├── authController.js           # Register, login, getMe
│   │   └── contractController.js       # Upload, analyze, CRUD
│   ├── 📁 middleware/
│   │   ├── auth.js                     # JWT verification middleware
│   │   ├── upload.js                   # Multer in-memory config
│   │   └── errorHandler.js             # Global error handler
│   ├── 📁 models/
│   │   ├── User.js                     # User schema with password hashing
│   │   └── Contract.js                 # Contract, clauses, and deadlines schema
│   ├── 📁 routes/
│   │   ├── auth.js                     # Auth routes
│   │   ├── contracts.js                # Contract routes
│   │   └── reports.js                  # PDF download route
│   ├── 📁 services/
│   │   ├── extractText.js              # PDF and DOCX text extraction
│   │   ├── analyzeContract.js          # Groq AI integration
│   │   ├── processDeadlines.js         # Date parsing and status calculation
│   │   └── generateReport.js           # PDFKit report builder
│   ├── index.js                        # Express app entry point
│   ├── vercel.json                     # Vercel serverless config
│   └── package.json
│
├── 📁 screenshots/                     # README screenshots
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

```bash
node --version    # v20.x or higher
npm --version     # v9.x or higher
git --version     # any recent version
```

You will also need free accounts at:
- [MongoDB Atlas](https://mongodb.com/atlas) — cloud database
- [Groq Console](https://console.groq.com) — AI API key

---

### 1. Clone the Repository

```bash
git clone https://github.com/farhannaeem00/contractsense.git
cd contractsense
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `server/.env` file with the following variables:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/contractsense
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLIENT_URL=http://localhost:5173
```

Start the development server:

```bash
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `client/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend dev server:

```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

### 4. Open in Browser

Navigate to:

```
http://localhost:5173
```

🎉 **ContractSense is now running locally!**

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive a JWT token | ❌ |
| `GET` | `/api/auth/me` | Get current user profile | ✅ |

**Register — Request Body:**
```json
{
  "name": "Farhan Naeem",
  "email": "farhannaeem00@gmail.com"
  "password": "********"
}
```

**Register — Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f3b2c1...",
    "name": "Farhan Naeem",
    "email": "farhannaeem00@gmail.com"
  }
}
```

---

### Contracts

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/contracts` | Upload and begin analysis of a contract | ✅ |
| `GET` | `/api/contracts` | Retrieve all contracts for the current user | ✅ |
| `GET` | `/api/contracts/:id` | Get a single contract with full analysis | ✅ |
| `DELETE` | `/api/contracts/:id` | Delete a contract | ✅ |

**Upload — Response (202 Accepted):**
```json
{
  "success": true,
  "contractId": "64f3b2c1abc123...",
  "status": "analyzing",
  "message": "Contract uploaded. Analysis started."
}
```

**Analysis — Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "64f3b2c1...",
    "fileName": "employment-contract.pdf",
    "status": "done",
    "riskScore": 72,
    "summary": "This is a 12-month employment agreement...",
    "clauses": [
      {
        "title": "Non-Compete Clause",
        "text": "Employee shall not engage in...",
        "risk": "high",
        "explanation": "A 3-year global restriction is unusually broad...",
        "suggestion": "Negotiate down to 6 months, limited to your local region."
      }
    ],
    "deadlines": [
      {
        "label": "Contract Renewal",
        "date": "2026-12-31",
        "daysRemaining": 253,
        "status": "future"
      }
    ]
  }
}
```

---

### Reports

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/reports/:id` | Download PDF analysis report for a contract | ✅ |

---

## 📸 Screenshots

> Screenshots coming soon. Run the app locally or visit the [live demo](https://contractsenseclient.vercel.app) to see it in action.

---

## 🛣️ Future Roadmap

```
v1.1
├── [ ] Email notifications for upcoming deadlines
├── [ ] Contract version comparison (diff viewer)
└── [ ] Bulk contract upload (up to 10 at once)

v1.2
├── [ ] Multi-language contract support (Arabic, French, Urdu)
├── [ ] Team workspaces with role-based access control
├── [ ] Inline clause editing and annotation tools
└── [ ] Browser extension for reviewing contracts on LinkedIn/Upwork

v2.0
├── [ ] Stripe integration (freemium SaaS model)
├── [ ] Upgrade to GPT-4 for higher accuracy
├── [ ] Contract template library (NDA, freelance, employment)
├── [ ] E-signature integration via DocuSign API
└── [ ] Mobile app (React Native)
```

---

## 🤝 Contributing

Contributions are welcome and appreciated. Here is how to get involved:

1. **Fork** the repository on GitHub

2. **Clone** your fork locally:
```bash
git clone https://github.com/your-username/contractsense.git
```

3. **Create** a feature branch:
```bash
git checkout -b feature/your-feature-name
```

4. **Commit** your changes using the convention below:
```bash
git commit -m "Add: description of your feature"
```

5. **Push** your branch:
```bash
git push origin feature/your-feature-name
```

6. **Open a Pull Request** on the original repository.

### Commit Message Convention

```
Add:      New feature
Fix:      Bug fix
Update:   Improvement to an existing feature
Refactor: Code restructuring without behavior change
Docs:     Documentation updates only
```

---

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/farhannaeem00.png" width="100" style="border-radius: 50%"/>

### Farhan Naeem

**BS Computer Science Student**
Full Stack Developer | AI Enthusiast

[![GitHub](https://img.shields.io/badge/GitHub-farhannaeem00-181717?style=for-the-badge&logo=github)](https://github.com/farhannaeem00)

</div>

---

## 📄 License

```
MIT License

Copyright (c) 2026 Farhan Naeem

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=4F46E5&height=100&section=footer" width="100%"/>

**If this project helped you, please consider giving it a ⭐**

Made with ❤️ by [Farhan Naeem](https://github.com/farhannaeem00)

</div>
