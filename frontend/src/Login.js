import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      onLogin(res.data.user);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Check server connection.");
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1 className="app-title">Smart Task Manager</h1>
        <p className="app-description">
          Manage your daily tasks, track priorities, and boost productivity.
        </p>

        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="view-btn"
          >
            {showPassword ? "Hide" : "View"}
          </button>
        </div>

        <button type="submit" className="auth-btn">
          Login
        </button>

        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
}

export default Login;