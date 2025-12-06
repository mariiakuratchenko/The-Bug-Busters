// Layout.jsx
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Layout() {
  const location = useLocation();
  const { loggedIn } = useContext(AuthContext);

  const isActive = (path) =>
    location.pathname === path ? "nav-link nav-link-active" : "nav-link";

  return (
    <header className="navbar-wrapper">
      <div className="navbar shell">
        {/* Logo / Brand */}
        <div className="navbar-left">
          <div className="brand-logo-wrapper">
            <img 
              src={logo} 
              alt="The Bug Busters Logo" 
              className="brand-logo"
            />
          </div>
          <div>
            <div className="brand-name">The Bug Busters</div>
            <div className="brand-tagline">Reliable Protection</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="navbar-right">
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          {loggedIn ? (
            <Link to="/logout" className={`${isActive("/logout")} nav-auth`}>
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login" className={`${isActive("/login")} nav-auth`}>
                Login
              </Link>
              <Link to="/register" className={`${isActive("/register")} nav-auth`}>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Layout;
