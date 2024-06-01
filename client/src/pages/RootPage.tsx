import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../components";
import { useScreenSize } from "../providers";

export const RootPage = () => {
  const { size, width } = useScreenSize();

  return (
    <div className="page bg-secondary">
      <Outlet />

      <Footer />
    </div>
  );

  // return (
  //   <div className="bg-accent ">

  //     <Outlet />

  //     <Footer />
  //   </div>
  // );
};
