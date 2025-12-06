import { Routes, Route, useLocation } from "react-router-dom";
import ExploreProducts from "./components/ExploreProducts";

import Mainpage from "./components/Mainpage";
import Login from "./components/auth/Login";
import Logout from "./components/Logout";
import Register from "./components/auth/Register";
import Layout from "./components/Layout";

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

        {/*New: Page of Explore Products */}
        <Route path="/explore" element={<ExploreProducts />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
