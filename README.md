# **Task Manager Application**

**A full-stack task management system built with React (frontend), Node.js & Express (backend), and MongoDB for data storage. Users can register, log in, and manage tasks efficiently.**

---

## **Project Structure**

task-manager  
  backend  
    models  
      Task.js – Task schema defining title, date, notes, priority, and completion  
      user.js – User schema for authentication  
    routes  
      authRoutes.js – User registration and login routes  
      taskRoutes.js – Task CRUD routes  
    server.js – Backend server configuration  
    package.json – Backend dependencies  
    package-lock.json  
    .env – Environment variables (not committed)  
  frontend  
    public  
      index.html  
      manifest.json  
      robots.txt  
    src  
      components – Reusable UI components  
      pages – Pages such as TaskPage, LoginPage, and RegisterPage  
      App.js  
      App.css  
      index.js  
      TaskPage.js – Task management interface  
    package.json – Frontend dependencies  
    package-lock.json  
.gitignore – Git ignored files  
README.md – Project documentation  

---

## **Prerequisites**

- Node.js  
- MongoDB Compass  
- Git  

---

## **Setup and Installation**

### **1. Clone the repository**


git clone https://github.com/your-username/task-manager.git

cd task-manager


---

### **2. Backend Setup**


cd backend
npm install


Create a **.env** file in the backend folder:


MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
JWT_SECRET=your_secret_key


Start the backend server:


npm start


Backend runs at:  
http://localhost:5000

---

### **3. Frontend Setup**

Open a new terminal:


cd frontend
npm install
npm run dev


Frontend runs at:  
http://localhost:3000

---

### **4. MongoDB Compass Setup**

- Open MongoDB Compass  
- Create a new connection:  
  mongodb://127.0.0.1:27017  
- Database name: taskmanager  
- Collection name: tasks  
- The database populates automatically when tasks are created

---

## **Database Schema**

Task Document Example:


{
"title": "Read book",
"date": "2026-03-10",
"time": "12:30",
"priority": "Low",
"notes": "Read a programming book",
"completed": false,
"user": "userId"
}


User Document Example:


{
"name": "John Doe",
"email": "john@example.com
",
"password": "hashed_password"
}


---

## **Technologies Used**

- React  
- Node.js  
- Express  
- MongoDB  
- JWT for authentication  
- Axios for API requests  

---

## **Troubleshooting**

- Backend not running → Check .env file and MongoDB, run npm install and npm start  
- Frontend not loading → Run npm install and npm run dev in frontend  
- Tasks not saving → Check backend logs and MongoDB connection  

---

## **How to Use**

1. Register an account  
2. Log in  
3. Add tasks with title, date, time, priority, and notes  
4. Mark tasks as complete  
5. Delete or edit tasks  

---

## **Contribution**

Fork the repository, create a new branch, and submit a pull request.

---

## **License**

This project is for educational purposes.
