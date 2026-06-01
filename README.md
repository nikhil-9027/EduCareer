<div align="center">

# 🎓 EduCareer

### India's Most Comprehensive Career & Education Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-Latest-green?style=for-the-badge&logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-Latest-003B57?style=for-the-badge&logo=sqlite)](https://www.sqlite.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**From personalized roadmaps to AI guidance, mentorship, and job opportunities — all in your local language.**

[✨ Features](#-features) • [🚀 Getting Started](#-getting-started) • [🏗️ Project Structure](#️-project-structure) • [🛠️ Tech Stack](#️-tech-stack) • [🤝 Contributing](#-contributing)

</div>

---

## 📸 Overview

EduCareer is a full-stack web platform built for students and professionals across India. It combines AI-powered career guidance, expert mentorship, an integrated job marketplace, and a thriving community — all accessible in 13+ Indian languages.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **Personalized Career Roadmaps** | Step-by-step, adaptive learning paths tailored to your interests, skills, and goals |
| 🤖 **24/7 AI Career Assistant** | Multilingual AI chatbot providing instant, personalized career and course recommendations |
| 👥 **Expert Mentorship Network** | Connect with industry professionals for one-on-one real-world guidance |
| 💼 **Integrated Job Marketplace** | Find skill-matched internships and job opportunities from entry-level to expert |
| 🏆 **Gamified Learning Paths** | Earn badges, points, and achievements as you hit milestones |
| 📁 **Dynamic Professional Portfolio** | Build and share a living showcase of your skills, projects, and achievements |
| 🌐 **Community Feed** | Share knowledge, discover resources, and build reputation among peers |
| 🌍 **13+ Indian Languages** | Available in English, Hindi, Tamil, Telugu, Bengali, and more |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **pnpm** (pnpm recommended)
- **Git**

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/nikhil-9027/EduCareer.git
cd EduCareer
```

**2. Install frontend dependencies**

```bash
cd Edu-career
npm install
# or
pnpm install
```

**3. Install backend dependencies**

The backend uses packages already listed in the root `package.json`. If running the Express server standalone:

```bash
cd Edu-career/backend
npm install express cors bcryptjs sqlite sqlite3
```

---

### Running the Application

#### Frontend (Next.js Dev Server)

```bash
cd Edu-career
npm run dev
```

> The Next.js app will be available at **http://localhost:3000**

#### Backend (Express API Server)

In a separate terminal:

```bash
cd Edu-career/backend
node server.js
```

> The API server will be available at **http://localhost:3000** with all routes under `/api`

---

### Building for Production

```bash
cd Edu-career
npm run build
npm run start
```

---

## 🏗️ Project Structure

```
EduCareer/
│
└── Edu-career/                    # Main application directory
    │
    ├── app/                       # Next.js App Router
    │   ├── api/                   # Next.js API routes
    │   │   ├── chat/              # AI chat endpoints
    │   │   ├── community/         # Community post endpoints
    │   │   ├── jobs/              # Job listing endpoints
    │   │   └── users/             # User auth endpoints
    │   ├── community/             # Community page
    │   │   └── page.tsx
    │   ├── dashboard/             # User dashboard page
    │   │   ├── page.tsx
    │   │   └── loading.tsx
    │   ├── jobs/                  # Job marketplace page
    │   │   ├── page.tsx
    │   │   └── loading.tsx
    │   ├── globals.css            # Global styles
    │   ├── layout.tsx             # Root layout with providers
    │   └── page.tsx               # Home / Landing page
    │
    ├── backend/                   # Express.js backend server
    │   ├── routes/
    │   │   ├── ai.js              # AI assistant routes
    │   │   ├── community.js       # Community routes
    │   │   ├── marketplace.js     # Job marketplace routes
    │   │   └── users.js           # User auth routes
    │   ├── database.js            # SQLite database setup
    │   ├── database.sqlite        # SQLite database file
    │   └── server.js              # Express server entry point
    │
    ├── components/                # Reusable React components
    │   ├── ui/                    # Shadcn/UI base components
    │   ├── auth-modal.tsx         # Authentication modal
    │   ├── chat-window.tsx        # AI chat window
    │   ├── community-feed.tsx     # Community posts feed
    │   ├── job-card.tsx           # Job listing card
    │   ├── navigation.tsx         # Top navigation bar
    │   └── theme-provider.tsx     # Dark/light theme provider
    │
    ├── contexts/
    │   └── auth-context.tsx       # Authentication context (React)
    │
    ├── hooks/                     # Custom React hooks
    ├── lib/                       # Utility functions
    ├── public/                    # Static assets
    ├── styles/                    # Additional styles
    │
    ├── components.json            # Shadcn/UI configuration
    ├── next.config.mjs            # Next.js configuration
    ├── package.json               # Dependencies & scripts
    ├── postcss.config.mjs         # PostCSS configuration
    └── tsconfig.json              # TypeScript configuration
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 14** | React framework with App Router |
| **TypeScript 5** | Type-safe JavaScript |
| **Tailwind CSS 4** | Utility-first styling |
| **Shadcn/UI + Radix UI** | Accessible component primitives |
| **Lucide React** | Icon library |
| **next-themes** | Dark/light mode support |
| **Vercel Analytics** | Usage analytics |
| **Recharts** | Data visualization |
| **React Hook Form + Zod** | Form validation |

### Backend
| Technology | Purpose |
|---|---|
| **Express.js** | REST API server |
| **SQLite + sqlite3** | Lightweight relational database |
| **bcryptjs** | Password hashing |
| **CORS** | Cross-origin resource sharing |

---

## 🔌 API Endpoints

### Users
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Authenticate a user |

### Community
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/community` | Get all community posts |
| `POST` | `/api/community` | Create a new post |

### Jobs / Marketplace
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/marketplace` | Get all job listings |

### AI Assistant
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ai` | Send a message to the AI assistant |

---

## 🌍 Supported Languages

EduCareer is designed for India's diverse student population and supports:

`English` • `हिंदी (Hindi)` • `தமிழ் (Tamil)` • `తెలుగు (Telugu)` • `বাংলা (Bengali)` • and **8+ more** regional languages

---

## ⚙️ Environment Variables

Create a `.env.local` file in the `Edu-career/` directory for any environment-specific config:

```env
# Example — add your own keys as needed
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) guide before submitting a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Made with ❤️ for students across India.

---

<div align="center">

⭐ **Star this repo if you find it helpful!** ⭐

</div>
