"use client";

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Calendar, 
  X, 
  Loader2,
  FileText
} from "lucide-react";

export default function ProsesGajiPage() {
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  
  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [payrollData] = useState([
    { id: 1, nik: "EMP001", nama: "Ahmad Fauzi", jabatan: "Manager IT", gapok: 15000000, cuti: 500000, potongan: 200000, total: 15300000 },
    { id: 2, nik: "EMP002", nama: "Siti Aminah", jabatan: "HR Specialist", gapok: 8000000, cuti: 0, potongan: 100000, total: 7900000 },
    { id: 3, nik: "EMP003", nama: "Budi Santoso", jabatan: "Frontend Developer", gapok: 10000000, cuti: 200000, potongan: 0, total: 10200000 },
  ]);

  const handleProcess = () => {
    setLoading(true);
    setShowData(false);
    setTimeout(() => {
      setLoading(false);
      setShowData(true);
    }, 1000);
  };

  useEffect(() => {
    handleProcess();
  }, []); 

  return (
    <>
      {/* HEADER SECTION - Disamakan text-4xl dan font-bold */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#1a2b3c] tracking-tight">Proses Gaji</h1>
          <p className="text-gray-400 mt-1 font-medium text-sm">Generate dan hitung gaji seluruh karyawan dalam satu klik.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="month" 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 shadow-sm rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <button 
            onClick={handleProcess}
            disabled={loading}
            className="flex items-center gap-2 bg-[#004a7c] hover:bg-[#003559] text-white px-6 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 disabled:bg-gray-400 shadow-lg"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} fill="currentColor" />}
            {loading ? "Processing..." : "Proses Gaji"}
          </button>
        </div>
      </div>

      {showData && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* STATS CARDS - Pakai p-6 dan rounded-[2rem] */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Total Pengeluaran Gaji", value: "Rp 33.400.000", color: "text-[#1a2b3c]" },
              { label: "Total Karyawan", value: "120 Orang", color: "text-[#1a2b3c]" },
              { label: "Status Periode", isStatus: true }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 relative overflow-hidden group transition-all hover:shadow-md">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 relative">
                  {stat.label}
                </p>
                {stat.isStatus ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-500 rounded-lg border border-orange-100 relative">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Draft</span>
                  </div>
                ) : (
                  <h3 className={`text-xl font-bold ${stat.color} relative`}>{stat.value}</h3>
                )}
              </div>
            ))}
          </div>

          {/* TABLE DATA - Pakai rounded-[2rem] dan font-sm */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50">
               <h3 className="font-bold text-xl text-gray-800 tracking-tight">Data Preview Gaji</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold border-b border-gray-50">
                    <th className="px-8 py-5">Karyawan</th>
                    <th className="px-8 py-5 text-center">Gaji Pokok</th>
                    <th className="px-8 py-5 text-center">Uang Cuti</th>
                    <th className="px-8 py-5 text-center">Potongan</th>
                    <th className="px-8 py-5 text-center">Total Netto</th>
                    <th className="px-8 py-5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {payrollData.map((item) => (
                    <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold text-gray-700 uppercase tracking-tight">{item.nama}</p>
                        <p className="text-[11px] text-gray-400 font-bold uppercase">{item.nik} • {item.jabatan}</p>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-500 text-center">Rp {item.gapok.toLocaleString('id-ID')}</td>
                      <td className="px-8 py-6 text-sm font-bold text-emerald-500 text-center">+{item.cuti > 0 ? `Rp ${item.cuti.toLocaleString('id-ID')}` : 'Rp 0'}</td>
                      <td className="px-8 py-6 text-sm font-bold text-red-400 text-center">-{item.potongan > 0 ? `Rp ${item.potongan.toLocaleString('id-ID')}` : 'Rp 0'}</td>
                      <td className="px-8 py-6 text-sm font-bold text-[#1a2b3c] text-center">Rp {item.total.toLocaleString('id-ID')}</td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => setSelectedUser(item)}
                          className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#004a7c] hover:border-blue-200 transition-all shadow-sm hover:scale-110"
                        >
                          <FileText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL - Pakai rounded-[2rem] biar sinkron */}
      {selectedUser && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#1a2b3c]/60 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
          <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
            <button onClick={() => setSelectedUser(null)} className="absolute top-6 right-6 p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
              <X size={20} />
            </button>
            <div className="mb-6">
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Calculation Breakdown</p>
              <h2 className="text-xl font-bold text-[#1a2b3c] uppercase">{selectedUser.nama}</h2>
              <p className="text-[11px] text-gray-400 font-bold uppercase mt-1">{selectedUser.nik} • {selectedUser.jabatan}</p>
            </div>
            <div className="space-y-3 mb-8">
              {[
                { label: "Gaji Pokok", val: selectedUser.gapok, color: "text-gray-700" },
                { label: "Uang Cuti (+)", val: selectedUser.cuti, color: "text-emerald-500", prefix: "+" },
                { label: "Potongan (-)", val: selectedUser.potongan, color: "text-red-500", prefix: "-" }
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-dashed border-gray-100 last:border-0">
                  <span className="text-gray-400 font-bold text-[11px] uppercase">{row.label}</span>
                  <span className={`text-sm font-bold ${row.color}`}>{row.prefix}Rp {row.val.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-5 rounded-2xl mb-6 flex justify-between items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gaji Netto</span>
              <span className="text-lg font-bold text-[#004a7c]">Rp {selectedUser.total.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex gap-2">
               <button onClick={() => setSelectedUser(null)} className="flex-1 bg-[#004a7c] text-white font-bold py-3.5 rounded-xl hover:bg-[#003559] transition-all active:scale-95 text-xs shadow-lg shadow-blue-900/10">
                Simpan
              </button>
              <button onClick={() => setSelectedUser(null)} className="px-6 bg-gray-100 text-gray-500 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-all active:scale-95 text-xs">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}