// Layout.jsx
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Layout() {
  const location = useLocation();
  const { loggedIn, isAdmin } = useContext(AuthContext);

  const isActive = (path) =>
    location.pathname === path ? "nav-link nav-link-active" : "nav-link";

  return (
    <header className="navbar-wrapper">
      <div className="navbar shell">

        <div className="navbar-left-group">
          <div className="navbar-left">
            <Link to="/" className="brand-logo-wrapper">
              <img 
                src={logo} 
                alt="The Bug Busters Logo" 
                className="brand-logo"
              />

            <div>
              <div className="brand-name">The Bug Busters</div>
            </div>            
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="navbar-center">
            <Link to="/" className={isActive("/")}>
              Home
            </Link>
            <Link to="/explore" className={isActive("/explore")}>
              Products
            </Link>
            <Link to="/about" className={isActive("/about")}>
              About Us
            </Link>
            {isAdmin && (
              <Link to="/admin" className={isActive("/admin")}>
                Admin
              </Link>
            )}
          </nav>
        </div>

        {/* Auth Buttons */}
        <nav className="navbar-right">
          {loggedIn ? (
            <>
              <Link to="/account" className={`${isActive("/account")} nav-auth`}>
                Account
              </Link>
              <Link to="/logout" className={`${isActive("/logout")} nav-auth`}>
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className={`${isActive("/login")} nav-auth`}>
                Sign In
              </Link>
              <Link to="/register" className={`${isActive("/register")} nav-auth`}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Layout;
