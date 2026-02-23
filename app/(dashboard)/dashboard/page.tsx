"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Database, 
  ChevronDown, 
  ChevronUp, 
  CalendarCheck, 
  Palmtree, 
  Banknote,
  Building2,
  Briefcase,
  Users,
  UserCog,
  Settings,
  LogOut
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMasterOpen, setIsMasterOpen] = useState(true);

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

  return (
    <div className="flex min-h-screen bg-[#141414] text-white font-sans">
      {/* SIDEBAR - NETFLIX DARK RED CONCEPT */}
      <aside className="w-72 bg-black border-r border-white/10 flex flex-col shadow-2xl">
        
        {/* Logo Section - Identik dengan Foto (Tosca) */}
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00c2cb] rounded-lg flex items-center justify-center shadow-lg transform hover:scale-105 transition">
            <span className="text-white font-bold text-2xl italic">S</span>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tighter uppercase">
            Salary<span className="text-[#00c2cb]">App</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {/* Dashboard Menu - Active State ala Netflix */}
          <div className="flex items-center gap-4 px-4 py-3 rounded-md bg-[#E50914] cursor-pointer transition-all hover:brightness-110 text-white shadow-lg shadow-red-900/20">
            <LayoutDashboard size={20} />
            <span className="font-bold text-base uppercase tracking-wider">Dashboard</span>
          </div>

          {/* Master Menu - White Border identik dengan Foto */}
          <div className="space-y-1">
            <div 
              onClick={() => setIsMasterOpen(!isMasterOpen)}
              className="flex items-center justify-between px-4 py-3 rounded-md border-2 border-white cursor-pointer transition hover:bg-white/5 text-white"
            >
              <div className="flex items-center gap-4">
                <Database size={20} />
                <span className="font-bold text-base uppercase tracking-wider">Master</span>
              </div>
              {isMasterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {/* Submenu Master */}
            {isMasterOpen && (
              <div className="ml-6 mt-2 space-y-1 py-1 border-l-2 border-[#E50914]">
                {[
                  { name: 'Divisi', icon: Building2 },
                  { name: 'Jabatan', icon: Briefcase },
                  { name: 'Karyawan', icon: Users },
                  { name: 'User', icon: UserCog },
                  { name: 'Konfigurasi', icon: Settings },
                ].map((item) => (
                  <div key={item.name} className="pl-6 py-2.5 flex items-center gap-3 text-gray-400 hover:text-[#E50914] cursor-pointer transition-colors group">
                    <item.icon size={18} className="group-hover:scale-110 transition-transform" /> 
                    <span className="font-medium text-sm uppercase tracking-tight">{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Menu Lainnya */}
          <div className="px-4 py-3 rounded-md hover:bg-white/5 cursor-pointer transition-all flex items-center gap-4 text-gray-400 hover:text-white group">
            <CalendarCheck size={20} className="group-hover:text-[#E50914] transition-colors" />
            <span className="font-bold text-base uppercase tracking-wider">Presensi</span>
          </div>
          <div className="px-4 py-3 rounded-md hover:bg-white/5 cursor-pointer transition-all flex items-center gap-4 text-gray-400 hover:text-white group">
            <Palmtree size={20} className="group-hover:text-[#E50914] transition-colors" />
            <span className="font-bold text-base uppercase tracking-wider">Cuti</span>
          </div>
          <div className="px-4 py-3 rounded-md hover:bg-white/5 cursor-pointer transition-all flex items-center gap-4 text-gray-400 hover:text-white group">
            <Banknote size={20} className="group-hover:text-[#E50914] transition-colors" />
            <span className="font-bold text-base uppercase tracking-wider">Gaji</span>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT - MODERN DARK */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-8 w-1.5 bg-[#E50914]"></div>
            <h2 className="text-4xl font-black uppercase tracking-tighter italic">
              Welcome back, <span className="text-[#E50914]">{user?.name || "Admin"}</span>!
            </h2>
          </div>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest ml-5">
            Dashboard System • Master Data Management
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card Info ala Netflix Card */}
          <div className="relative overflow-hidden bg-[#181818] p-8 rounded-md border-b-4 border-[#E50914] shadow-xl group hover:-translate-y-2 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                <Users size={80} />
            </div>
            <h3 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-4">Total Customers</h3>
            <p className="text-6xl font-black text-white italic group-hover:text-[#E50914] transition-colors">1</p>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Updated Just Now
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}