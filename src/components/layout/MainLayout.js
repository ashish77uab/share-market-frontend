import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
