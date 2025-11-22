import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { loggedIn, logout } = useContext(AuthContext);

  return (
    <nav>
      <h2>My Site</h2>
      <div>
        <Link to="/">Home</Link>
        {loggedIn ? (
          <>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
