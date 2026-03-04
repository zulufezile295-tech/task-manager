import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must be at least 8 characters, include one uppercase letter, one number and one special character."
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Account created successfully! You can now login.");
        setForm({ email: "", password: "" });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server connection failed.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1 className="app-title">Smart Task Manager</h1>
        <p className="app-description">
          Organize your tasks, manage priorities, and stay productive.
        </p>

        <h2>Create Account</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={handleChange}
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

        <small className="password-hint">
          Must contain 8+ characters, uppercase letter, number & special character.
        </small>

        <button type="submit" className="auth-btn">
          Register
        </button>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
      </form>
    </div>
  );
}

export default Register;