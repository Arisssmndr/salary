"use client";

import React from 'react';
import { 
  FileText
} from "lucide-react";

export default function DashboardPage({ user, activeMenu }: any) {
  // REVISI: Ukuran dikecilkan (Compact Scale) agar mirip punya dosen
  const InfoCard = ({ title, value, emoji, trend }: any) => (
    <div className="bg-white p-5 rounded-[1.8rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all h-[155px] group cursor-default">
      <div className="flex justify-between items-start">
        {/* EMOJI: Dikecilkan dari 6xl ke 4xl agar tidak mendominasi kotak */}
        <div className="text-4xl transition-all duration-300 filter grayscale group-hover:grayscale-0 select-none">
          {emoji}
        </div>
        
        {/* BADGE TREND: Lebih mungil */}
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
            trend === 'Stable' ? 'bg-blue-50 text-blue-400' : 
            trend.includes('+') ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
          }`}>
            {trend}
          </span>
        )}
      </div>

      <div className="mt-2">
        {/* Font label lebih kecil dan tipis */}
        <h3 className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-0.5">{title}</h3>
        {/* Angka diturunkan ke 2xl/3xl agar tidak terlalu 'berat' */}
        <p className="text-2xl font-extrabold text-gray-800 tracking-tight">{value}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* MAIN CONTENT HEADER: Ukuran teks dikurangi agar tidak makan tempat */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Welcome back, {user?.name || "Aris Munandar"}!</h1>
        <p className="text-gray-400 mt-0.5 font-medium text-sm">Here's what's happening with your payroll system today.</p>
      </div>

      {/* Grid 4 Kotak: Gap dikurangi dari 8 ke 5 untuk kesan compact */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <InfoCard title="Total Karyawan" value="124" emoji="👥" trend="+12%" />
        <InfoCard title="Divisi" value="8" emoji="🏢" trend="Stable" />
        <InfoCard title="Payroll Bulan Ini" value="Rp 450M" emoji="💰" trend="+5%" />
        <InfoCard title="Pending Approval" value="12" emoji="⏳" trend="-2" />
      </div>

      {/* Section Bawah juga dikurangi paddingnya agar sinkron */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="md:col-span-2 bg-white p-7 rounded-[1.8rem] shadow-sm border border-gray-100">
           <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-[#00c2cb] rounded-full shadow-[0_0_6px_rgba(0,194,203,0.5)]"></div>
              <h3 className="font-bold text-lg text-gray-800 tracking-tight">Recent Activities</h3>
           </div>
           
           <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors text-gray-300 group-hover:text-gray-500">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 italic leading-none tracking-tight">Updated Divisi "IT Support"</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1.5 tracking-widest">{item * 2} hours ago</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* New Reports Section */}
        <div className="bg-white p-7 rounded-[1.8rem] shadow-sm border border-gray-100 border-dashed flex flex-col items-center justify-center text-center">
           <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 opacity-70">
              <span className="text-2xl animate-pulse">🚀</span>
           </div>
           <h3 className="font-bold text-base text-gray-800">New Reports Coming Soon</h3>
           <p className="text-[11px] text-gray-400 mt-2 leading-relaxed max-w-[160px]">We're building advanced analytics for your payroll.</p>
        </div>
      </div>
    </>
  );
}