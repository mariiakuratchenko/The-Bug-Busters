// Login.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, create a mock token. Replace this with actual API call later
    const mockToken = "mock-jwt-token-" + Date.now();
    login(mockToken);
    console.log("Login form submitted:", { email, password });
    navigate("/");
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
          <button type="submit" className="btn-primary form-submit">
            Login
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
