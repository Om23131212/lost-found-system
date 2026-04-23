# 🎯 Lost & Found Item Management System (MERN)

A full-stack web application built using the **MERN Stack (MongoDB, Express, React, Node.js)** to help students **report, search, and manage lost & found items** on a college campus efficiently.

---

## 🚀 Live Demo

* 🌐 **Frontend:** https://lost-found-frontend-v05v.onrender.com
* ⚙️ **Backend API:** https://lost-found-backend-511q.onrender.com

---

## 📌 Key Features

* 🔐 User Authentication (Register/Login using JWT)
* 📦 Report Lost Items
* 📍 Report Found Items
* 🔍 Search Items (by title/category)
* 🔄 Update Item Status (Lost ↔ Found)
* ❌ Delete Item (only by owner)
* 🛡️ Protected Routes
* 🚪 Secure Logout

---

## 🛠️ Tech Stack

### 🔹 Frontend

* React.js
* Axios
* React Router DOM
* Custom CSS (Modern UI)

### 🔹 Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt.js

---

## 📂 Project Structure

```
lost-found-system/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
```

---

## ⚙️ Installation (Local Setup)

### 🔹 Clone Repository

```bash
git clone https://github.com/Om23131212/lost-found-system.git
cd lost-found-system
```

---

### 🔹 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run server:

```bash
node server.js
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🌍 Deployment

* 🚀 Backend deployed on **Render (Web Service)**
* 🌐 Frontend deployed on **Render (Static Site)**

---

## 🔐 Authentication Flow

1. User registers → password hashed using bcrypt
2. User logs in → receives JWT token
3. Token stored in localStorage
4. Protected APIs verify token before access

---

## 🔄 API Endpoints

### 🔹 Auth Routes

* `POST /api/auth/register`
* `POST /api/auth/login`

### 🔹 Item Routes

* `GET /api/items`
* `POST /api/items`
* `PUT /api/items/:id`
* `PATCH /api/items/:id/status`
* `DELETE /api/items/:id`
* `GET /api/items/search?q=keyword`

---

## 🎯 Real-World Workflow

1. User reports lost item
2. Another user finds it
3. Status updated to **FOUND**
4. Item returned
5. Record deleted

---

## 🚀 Future Improvements

* 📱 Fully responsive mobile UI
* 🔔 Notifications system
* 🧑‍💼 Admin dashboard
* 📍 Location tracking

---

## 👨‍💻 Author

**Om Prakash Kannaujiya**
🔗 GitHub: https://github.com/Om23131212

---

## ⭐ Support

If you like this project, please ⭐ star the repository!
