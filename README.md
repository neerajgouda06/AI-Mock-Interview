# 🎙️ AI Mock Interview Platform

An AI-powered mock interview platform that simulates realistic technical interviews. Upload your resume, get personalized questions, answer via voice or code, and receive detailed performance feedback — all powered by Google Gemini, Murf AI, and AssemblyAI.

---

## ✨ Features

- **Resume-Based Questions** — AI analyzes your resume and generates personalized interview questions tailored to your experience
- **Voice Interviews** — Listen to questions via AI voice (Murf TTS) and record verbal answers with speech-to-text transcription (AssemblyAI)
- **Live Coding Challenges** — Built-in Monaco code editor for write, fix, and explain coding questions
- **AI Scoring & Feedback** — Detailed performance report with scores across 5 categories
- **Interview History** — Paginated history of all past interviews with scores and feedback
- **Multi-Role Support** — Frontend, Backend, Full Stack, Data Analyst, DevOps, and more

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Monaco Editor
- MediaRecorder API (voice recording)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Multer (file uploads)
- PDF.js (resume text extraction)
- JWT Authentication

### AI & External APIs
- **Google Gemini** — Question generation, follow-up questions, code evaluation, feedback
- **Murf AI** — Text-to-speech for the AI interviewer (Natalie)
- **AssemblyAI** — Speech-to-text transcription for voice answers

---

## 📁 Project Structure

```
project/
├── server/                     # Express backend
│   └── src/
│       ├── config/             # Gemini AI client setup
│       ├── constants/          # Prompt templates
│       ├── controllers/        # Route handlers
│       ├── middleware/         # Auth, file upload
│       ├── models/             # Mongoose schemas (User, Resume, Interview)
│       ├── routes/             # Express routers
│       ├── services/           # Business logic (Gemini, AssemblyAI, Murf, etc.)
│       └── utils/              # JSON parsing utilities
└── client/                     # React frontend
    └── src/
        ├── components/         # AudioPlayer, VoiceRecorder, CodeEditor, ScoreCard, etc.
        ├── pages/              # HomePage, InterviewSetupPage, InterviewPage, FeedbackPage, HistoryPage
        └── services/           # Axios API wrappers
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- API keys for: Google Gemini, Murf AI, AssemblyAI

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-mock-interview-platform.git
cd ai-mock-interview-platform
```

### 2. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server/` directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
ASSEMBLYAI_API_KEY=your_assemblyai_api_key
MURF_API_KEY=your_murf_api_key
```

### 4. Run the development servers

```bash
# Start backend (from server/)
npm run dev

# Start frontend (from client/)
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000` (or your configured port).

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

### Resume
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/upload` | Upload and parse a PDF resume |
| GET | `/api/resume/` | Retrieve the saved resume |

### Interview
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/interview/start` | Start a new interview session |
| POST | `/api/interview/transcribe` | Transcribe a voice recording |
| POST | `/api/interview/:id/answer` | Submit a text answer |
| POST | `/api/interview/:id/voice-answer` | Submit a voice answer |
| POST | `/api/interview/:id/code` | Submit a code answer |
| POST | `/api/interview/:id/end` | End interview and generate feedback |
| GET | `/api/interview/:id` | Get interview details |
| POST | `/api/interview/speak` | Stream TTS audio for a given text |

### History
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/history` | Get paginated interview history |
| GET | `/api/history/:id` | Get a specific history item |
| DELETE | `/api/history/:id` | Delete a history item |
| DELETE | `/api/history/clear` | Clear all interview history |

---

## 🧠 How It Works

1. **Setup** — User uploads their PDF resume and selects a role and difficulty level
2. **Question Generation** — Gemini analyzes the resume and generates a mix of behavioral, technical, and coding questions
3. **Interview** — Natalie (AI interviewer) speaks questions via Murf TTS; candidate answers by voice (transcribed via AssemblyAI) or text
4. **Code Challenges** — For coding questions, the Monaco editor opens; Gemini evaluates the submission
5. **Follow-ups** — After each answer, Gemini generates a contextual follow-up using the full conversation history
6. **Feedback** — At the end, Gemini scores the candidate across 5 dimensions and returns strengths, improvement areas, and an overall assessment

---

## 📊 Feedback Categories

Candidates are scored across:
- Communication
- Technical Knowledge
- Problem Solving
- Code Quality (if applicable)
- Overall Performance

---

## 📝 License

MIT
