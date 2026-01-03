# 🚀 Dayflow — Human Resource Management System (HRMS)

![Status](https://img.shields.io/badge/Status-Active-success)
![Hackathon](https://img.shields.io/badge/Hackathon-Project-orange)
![Stack](https://img.shields.io/badge/Stack-MERN-green)
![Auth](https://img.shields.io/badge/Auth-JWT-blue)
![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Build](https://img.shields.io/github/actions/workflow/status/your-org/dayflow/ci.yml?label=Build)
![License](https://img.shields.io/badge/License-MIT-blue)

> **Dayflow** is a full‑stack HRMS built during a hackathon to manage employees, HR workflows, attendance, leave approvals, payroll visibility, and role‑based access in a single unified platform.

---

## ✨ Highlights
- Role‑based dashboards (Employee / HR / Admin)
- JWT authentication with backend‑enforced RBAC
- Dynamic, editable profile cards
- Attendance tracking & leave management
- Clean MERN architecture (React + Express + MongoDB Atlas)
- Demo‑ready UI, production‑ready backend

---

## 🎯 Objectives
- Centralize HR and employee operations  
- Secure authentication & authorization  
- Clean frontend–backend separation  
- Scalable, real‑world architecture  

---

## 👥 User Roles & Permissions

| Role | Capabilities |
|---|---|
| **Employee** | Attendance, Leave Requests, Profile, Payroll |
| **HR** | Employee Management, Leave Approval, Attendance |
| **Admin** | Full HR access + system control |

> Access is enforced on **frontend and backend** using JWT and role middleware.

---

## 🧱 Architecture

```
Frontend (React + Vite)
 ├─ Role-based routing
 ├─ Protected routes
 ├─ Context API (Auth)
 └─ Reusable UI components

Backend (Node + Express)
 ├─ JWT Authentication
 ├─ Role-based Authorization Middleware
 ├─ REST APIs
 └─ MongoDB Atlas (Cloud)
```

---

## 🖥 Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- Context API
- Responsive CSS

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT, bcrypt
- dotenv, cors

---

## 📁 Project Structure

```
frontend/
 └─ src/

backend/
 ├─ src/
 │  ├─ config/
 │  ├─ controllers/
 │  ├─ middleware/
 │  ├─ models/
 │  ├─ routes/
 │  ├─ app.js
 │  └─ server.js
 └─ package.json
```

---

## 🔗 API Endpoints

**Auth**
- POST `/api/auth/register`
- POST `/api/auth/login`

**Profile**
- GET `/api/profile/me`
- PUT `/api/profile/me`

**Attendance**
- POST `/api/attendance`
- GET `/api/attendance`

**Leave**
- POST `/api/leave`
- GET `/api/leave`
- PUT `/api/leave/:id` (HR/Admin)

---

## ⚙️ Environment Variables

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dayflow
JWT_SECRET=dayflow_secret_key
```

> Never commit `.env` to version control.

---

## 🚀 Run Locally

**Backend**
```bash
cd backend
npm install
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Security
- JWT authentication
- Password hashing with bcrypt
- Role‑based authorization middleware
- Protected frontend routes

---

## 🏆 Highlights
- Built end‑to‑end under time constraints
- Real‑world RBAC implementation
- Cloud database (MongoDB Atlas)
- Demo‑ready with scalable backend

---

## 📜 License
MIT License © Dayflow
<break> Video link: https://drive.google.com/file/d/1Wo5C7CJWdbHr4BRV3bEKaZWl2L8ezcDS/view?usp=drive_link
