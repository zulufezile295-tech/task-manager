import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import TaskPage from "./TaskPage";

function App() {
  const [stage, setStage] = useState("register"); // register | login | tasks
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    setCurrentUser(null);
    setStage("login"); // send user back to login
  };

  return (
    <div className="app-container">

      {stage === "register" && (
        <>
          <h2>Create Your Account</h2>
          <Register onRegistered={() => setStage("login")} />
          <p>
            Already have an account?{" "}
            <button onClick={() => setStage("login")}>
              Login
            </button>
          </p>
        </>
      )}

      {stage === "login" && (
        <>
          <h2>Login to Continue</h2>
          <Login
            onLogin={(user) => {
              setCurrentUser(user);
              setStage("tasks");
            }}
          />
          <p>
            Don’t have an account?{" "}
            <button onClick={() => setStage("register")}>
              Register
            </button>
          </p>
        </>
      )}

      {stage === "tasks" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Welcome to Your Task Manager</h2>
            <button onClick={handleLogout}>
              Logout
            </button>
          </div>

          <TaskPage currentUser={currentUser} />
        </>
      )}

    </div>
  );
}

export default App;