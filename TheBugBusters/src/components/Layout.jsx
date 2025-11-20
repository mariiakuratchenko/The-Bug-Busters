import { Link, useLocation } from "react-router-dom";


function Layout() {

    return (
        <div>
            <nav className="navbar">

                <Link to="/">HOME</Link>
                <Link to="/login">LOGIN</Link>
                <Link to="/logout">LOGOUT</Link>
                <Link to="/register">REGISTER</Link>
            </nav>
            <br />
            <hr />
            <h1 className="title-font">Welcome To The Bug Busters</h1>
        </div>
    )
}

export default Layout;