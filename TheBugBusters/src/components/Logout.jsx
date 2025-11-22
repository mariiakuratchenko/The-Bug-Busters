// Logout.jsx
import React from "react";
import { Link } from "react-router-dom";

function Logout() {
  // İstersen burada localStorage temizliği yapabilirsin
  // useEffect(() => { localStorage.removeItem("authToken"); ... }, []);

  return (
    <main className="shell page-center">
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
