"use client";
import React from 'react';

export default function Navbar({ activeMenu, user }: any) {
  return (
    <header className="fixed top-0 right-0 left-72 h-18 bg-white px-10 flex justify-between items-center border-b border-gray-100 z-10 shadow-sm">
      <h2 className="text-xl font-bold text-[#004d73] uppercase tracking-wide">
        {activeMenu}
      </h2>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-bold text-gray-800">{user?.name || "Administrator"}</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Payroll Management</p>
        </div>
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-[#004d73] border border-gray-200 shadow-inner">
          {user?.name?.charAt(0) || "A"}
        </div>
      </div>
    </header>
  );
}