"use client";

import React from 'react';
import { 
  FileText, 
  CalendarCheck, 
  CreditCard, 
  BellRing 
} from "lucide-react";

export default function UserDashboardPage({ user }: any) {
  // Komponen Card yang ukurannya disamakan persis dengan Admin [Compact Scale]
  const InfoCard = ({ title, value, emoji, trend }: any) => (
    <div className="bg-white p-5 rounded-[1.8rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all h-[155px] group cursor-default">
      <div className="flex justify-between items-start">
        <div className="text-4xl transition-all duration-300 filter grayscale group-hover:grayscale-0 select-none">
          {emoji}
        </div>
        
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
            trend === 'Stable' ? 'bg-blue-50 text-blue-400' : 
            trend === 'On Track' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
          }`}>
            {trend}
          </span>
        )}
      </div>

      <div className="mt-2">
        <h3 className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-0.5">{title}</h3>
        <p className="text-2xl font-extrabold text-gray-800 tracking-tight">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-0"> {/* Padding dikontrol oleh layout */}
      {/* HEADER: Disamakan dengan Admin */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Welcome back, {user?.name || "Aris Munandar"}!
        </h1>
        <p className="text-gray-400 mt-0.5 font-medium text-sm">
          Here's your overview for this month.
        </p>
      </div>

      {/* GRID 4 KOTAK: Isi sesuai Role User (Karyawan) di Soal UTS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <InfoCard title="Kehadiran Bulan Ini" value="22/24" emoji="📅" trend="On Track" />
        <InfoCard title="Sisa Cuti" value="8 Hari" emoji="🏖️" trend="Stable" />
        <InfoCard title="Gaji Terakhir" value="Rp 5.5M" emoji="💵" trend="Paid" />
        <InfoCard title="Tugas Pending" value="3" emoji="📝" trend="Action Required" />
      </div>

      {/* SECTION BAWAH */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Your Recent History (Riwayat Gaji/Aktivitas) */}
        <div className="md:col-span-2 bg-white p-7 rounded-[1.8rem] shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#00c2cb] rounded-full shadow-[0_0_6px_rgba(0,194,203,0.5)]"></div>
            <h3 className="font-bold text-lg text-gray-800 tracking-tight">Your Recent History</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors text-blue-400">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 italic leading-none tracking-tight">Gaji Bulan Februari Telah Dibayar</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1.5 tracking-widest">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors text-green-400">
                <CalendarCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 italic leading-none tracking-tight">Pengajuan Cuti Tahunan Disetujui</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1.5 tracking-widest">Yesterday</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pengumuman Kantor Section */}
        <div className="bg-[#f8fafc] p-7 rounded-[1.8rem] border border-gray-100 border-dashed flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
             <BellRing className="text-red-400 animate-bounce" size={24} />
          </div>
          <h3 className="font-bold text-base text-gray-800 tracking-tight">Pengumuman Kantor</h3>
          <p className="text-[11px] text-gray-400 mt-2 leading-relaxed max-w-[180px]">
            Libur nasional jatuh pada tanggal 25 Maret. Selamat beristirahat!
          </p>
        </div>
      </div>
    </div>
  );
}