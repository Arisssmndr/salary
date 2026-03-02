"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  LogOut,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar({ handleLogout }: any) {
  const pathname = usePathname();
  const [isMasterOpen, setIsMasterOpen] = useState(true);

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="bg-[#004d73] fixed flex flex-col shadow-xl text-white min-h-screen top-0">

      {/* Logo */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#00c2cb] rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-2xl italic">S</span>
        </div>
        <h1 className="text-white text-2xl font-bold tracking-tight">
          Salary<span className="text-[#00c2cb]">App</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">

        {/* Dashboard */}
        <Link
          href="/dashboard"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
            isActive("/dashboard")
              ? "bg-white/10 border border-white/20"
              : "hover:bg-white/5"
          }`}
        >
          <LayoutDashboard size={20} className="text-[#00c2cb]" />
          <span className="font-medium">Dashboard</span>
        </Link>

        {/* Master */}
        <div className="space-y-1">
          <div
            onClick={() => setIsMasterOpen(!isMasterOpen)}
            className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5"
          >
            <div className="flex items-center gap-4">
              <Database size={20} className="text-[#00c2cb]" />
              <span className="font-medium">Master</span>
            </div>
            {isMasterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {isMasterOpen && (
            <div className="ml-10 space-y-1 py-1">

              <Link
                href="/divisi"
                className={`py-2.5 flex items-center gap-3 transition-colors ${
                  isActive("/divisi")
                    ? "text-white font-bold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Building2 size={18} />
                <span className="text-sm">Divisi</span>
              </Link>

              <Link
                href="/jabatan"
                className={`py-2.5 flex items-center gap-3 transition-colors ${
                  isActive("/jabatan")
                    ? "text-white font-bold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Briefcase size={18} />
                <span className="text-sm">Jabatan</span>
              </Link>

              <Link
                href="/karyawan"
                className={`py-2.5 flex items-center gap-3 transition-colors ${
                  isActive("/karyawan")
                    ? "text-white font-bold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Users size={18} />
                <span className="text-sm">Karyawan</span>
              </Link>

              <Link
                href="/user"
                className={`py-2.5 flex items-center gap-3 transition-colors ${
                  isActive("/user")
                    ? "text-white font-bold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <UserCog size={18} />
                <span className="text-sm">User</span>
              </Link>

              <Link
                href="/konfigurasi"
                className={`py-2.5 flex items-center gap-3 transition-colors ${
                  isActive("/konfigurasi")
                    ? "text-white font-bold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Settings size={18} />
                <span className="text-sm">Konfigurasi</span>
              </Link>
            </div>
          )}
        </div>

        {/* Menu Lain */}
        <Link
          href="/presensi"
          className={`px-4 py-3 rounded-xl flex items-center gap-4 transition-all ${
            isActive("/presensi")
              ? "bg-white/10 text-white"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <CalendarCheck size={20} />
          <span className="font-medium">Presensi</span>
        </Link>

        <Link
          href="/cuti"
          className={`px-4 py-3 rounded-xl flex items-center gap-4 transition-all ${
            isActive("/cuti")
              ? "bg-white/10 text-white"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <Palmtree size={20} />
          <span className="font-medium">Cuti</span>
        </Link>

        <Link
          href="/gaji"
          className={`px-4 py-3 rounded-xl flex items-center gap-4 transition-all ${
            isActive("/gaji")
              ? "bg-white/10 text-white"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <Banknote size={20} />
          <span className="font-medium">Gaji</span>
        </Link>

      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-white/70 hover:text-red-400 transition-colors w-full"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}