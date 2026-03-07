"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from "next/navigation";
import Sidebar from '@/components/sidebar'; // Sesuaikan path importnya
import Navbar from '@/components/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isMasterOpen, setIsMasterOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      router.push("/sign-in");
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/sign-in");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-gray-800 font-sans">
      <Sidebar 
        isMasterOpen={isMasterOpen} 
        setIsMasterOpen={setIsMasterOpen} 
        isActive={isActive} 
        setActiveMenu={setActiveMenu} 
        handleLogout={handleLogout} 
      />
      
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        <Navbar activeMenu={activeMenu} user={user} />
        
        {/* CHILDREN adalah isi dari page.tsx masing-masing menu */}
        <main className="p-8 mt-18">
          {children}    
        </main>
      </div>
    </div>
  );
}