"use client";

import React from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2 
} from "lucide-react";

export default function RiwayatCutiPage() {
  // StatCard yang disesuaikan dengan desain visual gambar
  const StatCard = ({ title, value, unit, icon: Icon, colorClass, bgClass, dotColor }: any) => (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-all h-[140px] group">
      <div className={`w-16 h-16 rounded-2xl ${bgClass} flex items-center justify-center transition-transform group-hover:scale-105`}>
        <div className={`w-10 h-10 rounded-xl ${dotColor} shadow-lg shadow-current/20`}></div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-1">{title}</h3>
        <div className="flex items-baseline gap-1.5">
          <p className="text-3xl font-black text-gray-800 tracking-tighter">{value}</p>
          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{unit} / Tahun</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-0 max-w-[1200px]">
      {/* HEADER SECTION */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-[#1a2b3c] tracking-tighter uppercase italic flex items-center gap-3">
          RIWAYAT & SALDO CUTI
        </h1>
        <p className="text-gray-400 mt-1 font-medium text-sm">
          Informasi kuota dan riwayat pengajuan cuti Anda.
        </p>
      </div>

      {/* GRID STATS: Identik dengan visual bulet warna solid di gambar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          title="Total Cuti" 
          value="12" 
          unit="Hari" 
          dotColor="bg-blue-500" 
          bgClass="bg-blue-50/50" 
        />
        <StatCard 
          title="Cuti Diambil" 
          value="4" 
          unit="Hari" 
          dotColor="bg-red-500" 
          bgClass="bg-red-50/50" 
        />
        <StatCard 
          title="Sisa Cuti" 
          value="8" 
          unit="Hari" 
          dotColor="bg-emerald-500" 
          bgClass="bg-emerald-50/50" 
        />
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#00c2cb] rounded-full shadow-[0_0_10px_rgba(0,194,203,0.6)]"></div>
            <h3 className="font-black text-xl text-[#1a2b3c] tracking-tighter uppercase italic">Riwayat Pengajuan</h3>
          </div>
          
          <div className="flex bg-gray-50 p-1.5 rounded-2xl shadow-inner">
            {['Semua', 'Pending', 'Approved'].map((tab, i) => (
              <button 
                key={tab} 
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all ${
                  i === 0 ? 'bg-[#1a2b3c] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="pb-6 px-4">Jenis Cuti</th>
                <th className="pb-6 px-4">Tanggal</th>
                <th className="pb-6 px-4">Durasi</th>
                <th className="pb-6 px-4">Alasan</th>
                <th className="pb-6 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { jenis: 'Tahunan', tgl: '15 Feb - 17 Feb 2024', durasi: '3 Hari', alasan: '"Acara Keluarga"', status: 'Approved', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { jenis: 'Sakit', tgl: '10 Jan - 11 Jan 2024', durasi: '1 Hari', alasan: '"Flu & Demam"', status: 'Approved', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { jenis: 'Tahunan', tgl: '10 Mar - 12 Mar 2024', durasi: '3 Hari', alasan: '"Liburan Akhir Pekan"', status: 'Pending', color: 'text-orange-500', bg: 'bg-orange-50' },
              ].map((item, idx) => (
                <tr key={idx} className="group hover:bg-gray-50/80 transition-all">
                  <td className="py-6 px-4">
                    <span className="bg-gray-100 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider text-gray-500">
                      {item.jenis}
                    </span>
                  </td>
                  <td className="py-6 px-4 text-[13px] font-bold text-gray-500">{item.tgl}</td>
                  <td className="py-6 px-4 text-[13px] font-black text-gray-800 italic">{item.durasi}</td>
                  <td className="py-6 px-4 text-[13px] font-medium text-gray-400 italic font-serif">{item.alasan}</td>
                  <td className="py-6 px-4 text-center">
                    <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${item.color}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}