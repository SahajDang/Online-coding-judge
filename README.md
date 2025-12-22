# 🧑‍💻 Online Coding Judge Platform

A **cloud-native Online Coding Judge** that allows users to **register, login, write code, run it against test cases, and view results in real time**.  
Built with a **distributed microservice architecture** and deployed on the cloud.

---

## 🚀 Live Demo

- **Frontend:** https://online-coding-frontend-m811.onrender.com  
- **Backend API:** https://online-judge-backend-n0bx.onrender.com  
- **Compiler/Judge Service:** https://online-judge-compiler-y6ef.onrender.com  

---

## 🏗️ Architecture Overview

Frontend (React + Vite)

↓

Backend API (Node.js + Express)

↓

Judge / Compiler Service (Java)


> ⚠️ Docker is used **only for local development**.  
> In production, services communicate via **secure HTTP APIs**.

---

## ✨ Features

- 🔐 User authentication (Register / Login with JWT)
- 👨‍🎓 Role-based access (Student / Teacher)
- 🧠 Online code editor
- ▶️ Run Java code against test cases
- 📊 Real-time execution results
- ☁️ Fully deployed on Render
- 🔁 Handles cold starts on free-tier deployments

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Axios
- React Hook Form
- Zod
- Radix UI

### Backend
- Node.js
- Express
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Zod Validation

### Judge / Compiler
- Java (JDK 17)
- Secure code execution
- HTTP-based judge service

### DevOps & Deployment
- Docker (local)
- Render (Frontend, Backend, Compiler)
- MongoDB Atlas

---

## 📂 Project Structure

Online-coding-judge/

├── frontend/ # React frontend

├── backend/ # Node.js API|

├── judge/ # Java compiler service

├── docker-compose.yml

└── README.md


---

## ⚙️ Environment Variables

### Backend (`backend`)
```env
PORT=7777
APP_NAME=ONLINE_JUDGE_BACKEND
JWT_SECRET=your_secret_key
DB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/judge-db
JUDGE_URL=https://online-judge-compiler-y6ef.onrender.com
```

### Frontend (`frontend`)
```env
VITE_API_URL=https://online-judge-backend-n0bx.onrender.com
```

### ▶️ Running Locally

## 1️⃣ Clone the repository
```
git clone https://github.com/SahajDang/Online-coding-judge.git
cd Online-coding-judge
```

## 2️⃣ Start using Docker (Recommended)
```
docker-compose up --build
```

## 3️⃣ Or run manually
- Start MongoDB
- Run backend:
```
cd backend
npm install
npm run dev
```

- Run frontend:
```
cd frontend
npm install
npm run dev
```

## 🧪 Known Limitations
- Free-tier services may experience cold start delays
- Currently supports Java only
- Judge runs sample test cases (submit flow can be extended)

## 🚀 Future Enhancements
- Multi-language support (C++, Python)
- Hidden test cases & submissions
- Problem management dashboard
- Execution time & memory metrics
- Rate limiting and sandbox hardening

## 👨‍💻 Author
Sahaj Dang
GitHub: @SahajDang
