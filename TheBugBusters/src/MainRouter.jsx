import { Routes, Route } from "react-router-dom";
import Mainpage from "./components/Mainpage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Layout from "./components/Layout";



function MainRouter() {
    return (
        <div>
            <Layout />
            <Routes>
                <Route path="/" element={<Mainpage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default MainRouter;