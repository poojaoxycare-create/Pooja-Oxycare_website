# 🌐 PoojaOxycare Website

## 📌 Overview

PoojaOxycare is a healthcare-focused web platform designed to provide fast access to oxygen services, medical equipment, and emergency support. The system allows users to request help quickly while giving administrators tools to manage services efficiently.

The platform focuses on reliability, speed, and accessibility during urgent situations.

---

## 🚀 Features

### 👤 User Side

* Browse available oxygen and medical services
* Submit contact or emergency requests
* Secure authentication system
* Responsive UI for mobile and desktop
* Fast loading interface with optimized assets

### 🛠️ Admin Panel

* Role-based access control
* Dashboard for managing requests
* Ability to monitor users and activity
* Backend protected routes
* Secure admin access via metadata roles

### 🔐 Authentication

Authentication is handled using Clerk.
Admins are assigned roles through public metadata, allowing secure access to admin routes without exposing backend logic.

---

## 🏗️ Tech Stack

### Frontend

* React (Vite setup)
* Modern component-based architecture
* Clean responsive UI
* API-based communication with backend

### Backend

* Node.js
* Express.js
* MongoDB database
* REST API architecture

### Authentication

* Clerk authentication service

---

## 📂 Project Structure

```
Pooja-Oxycare/
│
├── frontend/        # React client
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── backend/         # Express API server
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Environment Variables

The project uses environment variables for security.

Examples include:

* Database connection string
* Clerk authentication keys
* Email credentials
* Frontend URL

These variables should be stored in a `.env` file and **must not be committed to GitHub**.

---

## 💻 Running Locally

### 1️⃣ Clone repository

```
git clone <repo-url>
```

### 2️⃣ Install dependencies

Frontend:

```
cd frontend
npm install
```

Backend:

```
cd backend
npm install
```

### 3️⃣ Run development servers

Frontend:

```
npm run dev
```

Backend:

```
npx nodemon
```

---

## 🌍 Deployment

The project is designed for deployment on modern hosting platforms.

Typical deployment flow:

1. Build frontend
2. Configure environment variables on hosting platform
3. Deploy backend server
4. Connect domain
5. Verify API endpoints

The frontend can be deployed to platforms like Vercel, while backend can be hosted on any Node-compatible service.

---

## 🔒 Security Notes

* Sensitive keys are stored in environment variables
* Admin access is role-based
* Backend routes protected with authentication middleware
* Production deployment should include rate limiting and security headers

---

## 🎯 Purpose of the Project

This project was built to demonstrate full-stack development skills including:

* Authentication integration
* Role-based access control
* REST API development
* Real-world healthcare service workflow
* Deployment-ready architecture

It also serves as a practical solution for providing essential healthcare resources quickly through a digital platform.

---

## 👨‍💻 Author

Developed by Rupesh Singh
Full-stack developer focused on building meaningful and impactful web applications.

---

## 📜 License

This project is for demonstration and portfolio purposes.
Commercial use should be discussed with the author.

---

