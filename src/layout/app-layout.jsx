import GridBackground from "@/components/grid-background";
import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <GridBackground/>
      <main className="min-h-screen container mx-auto">
        <Header />
        <Outlet />
      </main>
      <footer className="p-10 text-center bg-gray-800 mt-10">Made with 🩵 by Amrita Gupta</footer>
    </div>
  );
};

export default AppLayout;
