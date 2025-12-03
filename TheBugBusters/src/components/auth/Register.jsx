//The-Bug-Busters/TheBugBusters/src/components/auth/Register.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Validate password length
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      // Show success message
      setSuccess("Account created successfully! Redirecting to login...");
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("Network error. Please check your connection.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-center">
      <div className="auth-card">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">
          Join The Bug Busters and keep your world spotless and bug-free.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          
          {/* Name row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="form-input"
                placeholder="John"
                value={form.firstName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="form-input"
                placeholder="Smith"
                value={form.lastName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="reg-email" className="form-label">
              Email address
            </label>
            <input
              id="reg-email"
              name="email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          {/* Passwords */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit row */}
          <div className="form-buttons-row">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
            <Link to="/" className="btn-ghost">
              Cancel
            </Link>
          </div>

          <p className="form-footer-text">
            Already have an account?{" "}
            <Link to="/login" className="form-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Register;
