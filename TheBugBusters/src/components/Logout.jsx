// Logout.jsx
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Logout() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <main className="page-center">
      <div className="status-card status-card-success">
        <div className="status-icon">✓</div>
        <h1 className="status-title">You have been logged out</h1>
        <p className="status-text">
          Your session is now closed. You can safely close this window or log in
          again whenever you are ready.
        </p>

        <div className="status-actions">
          <Link to="/login" className="btn-primary">
            Login again
          </Link>
          <Link to="/" className="btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Logout;
