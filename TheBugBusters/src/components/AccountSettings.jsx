// AccountSettings.jsx
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AccountSettings.css";

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AccountSettings() {
  const { loggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentEmail: "",
    currentPassword: "",
    newEmail: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!loggedIn) {
      alert("Please login to access account settings");
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.currentEmail || !formData.currentPassword) {
      setError("Current email and password are required");
      return;
    }

    // Check if any changes are being made
    if (!formData.newEmail && !formData.newPassword) {
      setError("Please provide at least one field to update (new email or new password)");
      return;
    }

    // Validate new password if provided
    if (formData.newPassword) {
      if (formData.newPassword.length < 6) {
        setError("New password must be at least 6 characters long");
        return;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        setError("New passwords do not match");
        return;
      }
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${apiURL}/api/auth/update-account`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentEmail: formData.currentEmail,
          currentPassword: formData.currentPassword,
          newEmail: formData.newEmail || undefined,
          newPassword: formData.newPassword || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update account");
        return;
      }

      setSuccess("Account updated successfully!");
      
      // Clear form
      setFormData({
        currentEmail: "",
        currentPassword: "",
        newEmail: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      // If email was changed, user needs to login again
      if (formData.newEmail) {
        setTimeout(() => {
          alert("Email changed successfully. Please login again with your new email.");
          logout();
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      console.error("Update account error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!loggedIn) {
    return null;
  }

  return (
    <div className="account-settings-page">
      <div className="account-settings-container">
        <h1 className="account-title">Account Settings</h1>
        <p className="account-subtitle">
          Update your email address or password. For security, you must verify your current credentials.
        </p>

        <div className="settings-card">
          <form className="settings-form" onSubmit={handleSubmit}>
            {/* Error & Success Messages */}
            {error && <p className="form-error">{error}</p>}
            {success && <p className="form-success">{success}</p>}

            {/* Current Credentials Section */}
            <div className="form-section">
              <h2 className="section-title">Current Credentials</h2>
              <p className="section-description">
                Enter your current email and password to verify your identity
              </p>

              <div className="form-group">
                <label htmlFor="currentEmail" className="form-label">
                  Current Email *
                </label>
                <input
                  id="currentEmail"
                  name="currentEmail"
                  type="email"
                  className="form-input"
                  placeholder="your.current@email.com"
                  value={formData.currentEmail}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="currentPassword" className="form-label">
                  Current Password *
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* New Credentials Section */}
            <div className="form-section">
              <h2 className="section-title">New Credentials</h2>
              <p className="section-description section-note">
                * Leave fields blank if you don't want to change them
              </p>

              <div className="form-group">
                <label htmlFor="newEmail" className="form-label">
                  New Email
                </label>
                <input
                  id="newEmail"
                  name="newEmail"
                  type="email"
                  className="form-input"
                  placeholder="your.new@email.com (leave blank for no change)"
                  value={formData.newEmail}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  className="form-input"
                  placeholder="•••••••• (leave blank for no change)"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {formData.newPassword && (
                <div className="form-group">
                  <label htmlFor="confirmNewPassword" className="form-label">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/")}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
