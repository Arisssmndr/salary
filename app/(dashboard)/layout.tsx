"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [isMasterOpen, setIsMasterOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className="flex">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isMasterOpen={isMasterOpen}
        setIsMasterOpen={setIsMasterOpen}
        handleLogout={handleLogout}
      />
      <div className="flex flex-col flex-1 pl-64">
        {/* Navbar di atas */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}