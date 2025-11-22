// Layout.jsx
import { Link, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "nav-link nav-link-active" : "nav-link";

  return (
    <header className="shell">
      <div className="navbar">
        {/* Logo / Brand */}
        <div className="navbar-left">
          <div className="brand-mark">BB</div>
          <div>
            <div className="brand-name">The Bug Busters</div>
            <div className="brand-tagline">Smart Protection · Clean Code</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="navbar-right">
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          <Link to="/login" className={isActive("/login")}>
            Login
          </Link>
          <Link to="/register" className={isActive("/register")}>
            Register
          </Link>
          <Link to="/logout" className={isActive("/logout")}>
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Layout;
