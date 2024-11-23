import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const UserLayout = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-primary-darkBlue text-white text-sm user-layout">
      <UserNavbar />
      <div className="flex-grow px-2 lg:px-6 py-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
