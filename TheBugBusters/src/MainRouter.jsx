import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import Mainpage from "./components/Mainpage";
import ExploreProducts from "./components/ExploreProducts";
import Login from "./components/auth/Login";
import Logout from "./components/Logout";
import Register from "./components/auth/Register";
import AboutUs from "./components/AboutUs";
import Checkout from "./components/Checkout";
import AccountSettings from "./components/AccountSettings";
import AdminDashboard from "./components/AdminDashboard";

// Layout (Navbar + Footer)
import Layout from "./components/Layout";

function MainRouter() {
  const location = useLocation();

  // Only main page gets special layout style
  const isMainPage = location.pathname === "/";

  return (
    <div className={isMainPage ? "main-page-wrapper" : "other-pages-wrapper"}>
      {/* GLOBAL LAYOUT (Navbar + Footer wrapper) */}
      <Layout />

      {/* PAGE ROUTING */}
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/explore" element={<ExploreProducts />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        {/* ABOUT / TEAM PAGE */}
        <Route path="/about" element={<AboutUs />} />

        {/* CHECKOUT PAGE */}
        <Route path="/checkout" element={<Checkout />} />

        {/* ACCOUNT SETTINGS PAGE */}
        <Route path="/account" element={<AccountSettings />} />

        {/* ADMIN DASHBOARD */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Optional: 404 page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default MainRouter;
