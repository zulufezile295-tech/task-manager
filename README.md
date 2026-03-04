# Task Manager Application

A full-stack task management system built with React for the frontend, Node.js and Express for the backend, and MongoDB for data storage. The application allows users to register, log in, and manage their tasks efficiently.

---

## Project Structure

task-manager/
│
├── backend/
│   ├── models/
│   │   ├── Task.js            # Task schema defining fields like title, date, notes, etc.
│   │   └── user.js            # User schema with authentication details
│   │
│   ├── routes/
│   │   ├── authRoutes.js      # Routes for user registration and login
│   │   └── taskRoutes.js      # Routes for task CRUD operations
│   │
│   ├── server.js              # Backend server configuration
│   ├── package.json           # Backend dependencies
│   ├── package-lock.json
│   └── .env                   # Environment variables (not included in repository)
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Pages such as TaskPage, LoginPage, RegisterPage
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── TaskPage.js        # Task management interface
│   │
│   ├── package.json           # Frontend dependencies
│   └── package-lock.json
│
├── .gitignore                 # Files and folders ignored by Git
└── README.md                  # Project documentation

---

## Prerequisites

- Node.js (LTS version)
- MongoDB Compass
- Git

---

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager

2. Backend Setup
cd backend
npm install

Create a .env file in the backend folder with the following variables:

MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
JWT_SECRET=your_secret_key

Start the backend server:

npm start

The backend server will run at:

http://localhost:5000
3. Frontend Setup

Open a new terminal:

cd frontend
npm install
npm run dev

The frontend application will run at:

http://localhost:3000
4. MongoDB Compass Setup

Open MongoDB Compass.

Create a new connection:

mongodb://127.0.0.1:27017

Connect to the database.

Database name:

taskmanager

Collection name:

tasks

The database and collection will automatically populate when tasks are created in the application.

Database Schema

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
  "email": "john@example.com",
  "password": "hashed_password"
}
Technologies Used

React

Node.js

Express

MongoDB

JWT for authentication

Axios for API requests

Troubleshooting

Backend not running: Verify .env file is configured and MongoDB is running. Run npm install and npm start in the backend folder.

Frontend not loading: Ensure all dependencies are installed (npm install) and start the frontend using npm run dev.

Tasks not saving: Check the backend connection and MongoDB database status. Monitor backend logs for errors.

Contribution

Contributions are welcome. Fork the repository, create a new branch, and submit a pull request with your improvements.

License

This project is for educational purposes.


---

If you want, I can also **add a short “How to use the app” section** explaining step-by-step creating users, logging in, and adding tasks to make it fully ready for submission.  

Do you want me to add that?
