import { Routes, Route, useLocation } from "react-router-dom";
import ExploreProducts from "./components/ExploreProducts";

import Mainpage from "./components/Mainpage";
import Login from "./components/auth/Login";
import Logout from "./components/Logout";
import Register from "./components/auth/Register";
import Layout from "./components/Layout";
import AboutUs from "./components/AboutUs";

function MainRouter() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <div className={isMainPage ? "main-page-wrapper" : "other-pages-wrapper"}>
      <Layout />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<ExploreProducts />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
