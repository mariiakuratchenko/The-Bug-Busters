import { Link, useLocation } from "react-router-dom";


function Layout() {
    const location = useLocation();

    return (
        <div>
            <nav className="navbar">
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>HOME</Link>
                <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>LOGIN</Link>
                <Link to="/logout" className={location.pathname === "/logout" ? "active" : ""}>LOGOUT</Link>
                <Link to="/register" className={location.pathname === "/register" ? "active" : ""}>REGISTER</Link>
            </nav>
        </div>
    )
}

export default Layout;