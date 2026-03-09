"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from "next/navigation";
import SideUser from '@/components/sideuser'; // Menggunakan Sidebar khusus User
import NavUser from '@/components/navuser';   // Menggunakan Navbar khusus User

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const userRole = localStorage.getItem("userRole"); // Cek role dari storage

    // Proteksi Halaman: Jika tidak ada user atau role bukan 'user', balikkan ke sign-in
    if (!savedUser || userRole !== "user") {
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
      {/* Sidebar khusus User dengan menu: Dashboard, Kehadiran, Cuti, Gaji */}
      <SideUser 
        isActive={isActive} 
        setActiveMenu={setActiveMenu} 
        handleLogout={handleLogout} 
      />
      
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        {/* Navbar khusus User yang menampilkan nama Karyawan */}
        <NavUser activeMenu={activeMenu} user={user} />
        
        {/* Main Content: Tempat page.tsx user muncul */}
        <main className="p-8 mt-18">
          {children}    
        </main>
      </div>
    </div>
  );
}