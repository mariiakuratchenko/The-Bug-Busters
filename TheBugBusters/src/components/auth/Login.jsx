//The-Bug-Busters-main\TheBugBusters\src\components\auth\Login.jsx

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      // Login successful
      login(data.token);
      navigate("/");
    } catch (err) {
      setError("Network error. Please check your connection.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-center">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">
          Log in to manage your bug-free services and dashboard.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          {/* Email */}
          {error && <p>{error}</p>}
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Remember + Forgot */}
          <div className="form-row-between">
            <label className="form-checkbox">
              <input type="checkbox" /> <span>Remember me</span>
            </label>
            <button type="button" className="link-button">
              Forgot password?
            </button>
          </div>
          {/* Submit */}
          <button type="submit" className="btn-primary form-submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="form-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="btn-ghost form-submit"
            // onClick={() }
          >
            Continue with Google
          </button>

          <p className="form-footer-text">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="form-link">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
