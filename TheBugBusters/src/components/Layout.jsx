import { Link, useLocation } from "react-router-dom";


function Layout() {

    return (
        <div>
            <nav className="navbar">

                <Link to="/">Main</Link>
                <Link to="/login">Login</Link>
                <Link to="/logout">Logout</Link>
                <Link to="/register">Register</Link>

            </nav>
            <br />
            <hr />
            <h1>Welcome To The Bug Busters</h1>
        </div>
    )
}

export default Layout;