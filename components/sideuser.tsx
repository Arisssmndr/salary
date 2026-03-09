"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, ChevronDown, ChevronUp, CalendarCheck, 
  Palmtree, Banknote, ClipboardList, History, FileText, LogOut 
} from "lucide-react";

export default function SideUser({ isActive, setActiveMenu, handleLogout }: any) {
  // Kontrol dropdown khusus menu User sesuai soal
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    presensi: false,
    cuti: false,
    gaji: false,
  });

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  return (
    <aside className="w-72 bg-[#004d73] flex flex-col shadow-xl text-white h-screen fixed left-0 top-0 z-20">
      {/* SECTION LOGO - Identik dengan Admin */}
      <div className="p-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
          <Image 
            src="/crown-logo.jpg" 
            alt="Logo"
            width={30}
            height={30}
            className="object-contain"
          />
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tighter leading-none italic">INDO<span className="text-blue-400">PAY</span></h2>
          <p className="text-[9px] font-bold text-gray-400 tracking-[0.2em] mt-1 uppercase">Employee Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {/* DASHBOARD USER */}
        <Link 
          href="/home"
          onClick={() => setActiveMenu("Dashboard")}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive('/user/dashboard') ? 'bg-white/10 border border-white/20 text-[#00c2cb]' : 'hover:bg-white/5'}`}
        >
          <LayoutDashboard size={20} />
          <span className="font-medium text-white">Dashboard</span>
        </Link>

        {/* MENU PRESENSI - Sesuai Soal */}
        <div className="space-y-1">
          <div onClick={() => toggleMenu('presensi')} className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 transition border border-transparent">
            <div className="flex items-center gap-4 text-[#00c2cb]">
              <CalendarCheck size={20} />
              <span className="font-medium text-white">Presensi</span>
            </div>
            {openMenus.presensi ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          {openMenus.presensi && (
            <div className="ml-10 space-y-1 py-1">
              <Link href="/kehadiran" onClick={() => setActiveMenu("Kehadiran")}
                className={`py-2.5 flex items-center gap-3 transition-colors ${isActive('/user/presensi') ? 'text-[#00c2cb] font-bold' : 'text-white/60 hover:text-white'}`}>
                <CalendarCheck size={18} /> 
                <span className="text-sm">Kehadiran</span>
              </Link>
            </div>
          )}
        </div>

        {/* MENU CUTI - Sesuai Soal */}
        <div className="space-y-1">
          <div onClick={() => toggleMenu('cuti')} className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 transition border border-transparent">
            <div className="flex items-center gap-4 text-[#00c2cb]">
              <Palmtree size={20} />
              <span className="font-medium text-white">Cuti</span>
            </div>
            {openMenus.cuti ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          {openMenus.cuti && (
            <div className="ml-10 space-y-1 py-1">
              {[
                { name: 'Form Pengajuan', icon: ClipboardList, href: '/pengajuan' },
                { name: 'Riwayat & Saldo Cuti', icon: History, href: '/riwayat' },
              ].map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setActiveMenu(item.name)}
                  className={`py-2.5 flex items-center gap-3 transition-colors ${isActive(item.href) ? 'text-[#00c2cb] font-bold' : 'text-white/60 hover:text-white'}`}>
                  <item.icon size={18} /> 
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* MENU GAJI - Sesuai Soal */}
        <div className="space-y-1">
          <div onClick={() => toggleMenu('gaji')} className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 transition border border-transparent">
            <div className="flex items-center gap-4 text-[#00c2cb]">
              <Banknote size={20} />
              <span className="font-medium text-white">Gaji</span>
            </div>
            {openMenus.gaji ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          {openMenus.gaji && (
            <div className="ml-10 space-y-1 py-1">
              <Link href="/gaji" onClick={() => setActiveMenu("Slip Gaji")}
                className={`py-2.5 flex items-center gap-3 transition-colors ${isActive('/user/gaji') ? 'text-[#00c2cb] font-bold' : 'text-white/60 hover:text-white'}`}>
                <FileText size={18} /> 
                <span className="text-sm">Slip Gaji</span>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* FOOTER LOGOUT */}
      <div className="p-6 border-t border-white/10 bg-[#004d73]">
        <button onClick={handleLogout} className="flex items-center gap-3 text-white/70 hover:text-red-400 transition-colors w-full px-4 py-2">
          <LogOut size={20} />
          <span className="font-medium">Keluar Aplikasi</span>
        </button>
      </div>
    </aside>
  );
}