import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Component/Header";

function Layout() {
  return (
    <>
      <Header />

      <div className="col-span-10">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
