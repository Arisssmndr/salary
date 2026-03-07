"use client";

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Search, 
  Calendar
} from "lucide-react";

export default function ReportGajiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const now = new Date();
    setSelectedMonth(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
  }, []);

  const [reportData] = useState([
    { id: 1, nik: "EMP001", nama: "Ahmad Fauzi", jabatan: "Manager IT", gapok: 15000000, cuti: 500000, potongan: 200000, total: 15300000, status: "PAID" },
    { id: 2, nik: "EMP002", nama: "Siti Aminah", jabatan: "HR Specialist", gapok: 8000000, cuti: 0, potongan: 100000, total: 7900000, status: "PAID" },
    { id: 3, nik: "EMP003", nama: "Budi Santoso", jabatan: "Frontend Developer", gapok: 10000000, cuti: 200000, potongan: 0, total: 10200000, status: "PAID" },
    { id: 4, nik: "EMP004", nama: "Rina Wijaya", jabatan: "Marketing", gapok: 7500000, cuti: 100000, potongan: 50000, total: 7550000, status: "PAID" },
  ]);

  const filteredData = reportData.filter(item => 
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.nik.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const grandTotal = filteredData.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <>
      {/* HEADER - Ukuran Font disamakan (text-4xl) */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#1a2b3c] tracking-tight">Report Gaji Karyawan</h1>
          <p className="text-gray-400 mt-1 font-medium text-sm">Laporan rekapitulasi penggajian seluruh divisi.</p>
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
          <button className="flex items-center gap-2 bg-[#004a7c] hover:bg-[#003559] text-white px-6 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg">
            <Download size={18} />
            Export Excel
          </button>
        </div>
      </div>

      {/* STATS CARDS - Pakai rounded-[2rem] biar sama dengan Form Jabatan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Payroll", value: "Rp 40.950.000", color: "text-[#1a2b3c]" },
          { label: "Total Potongan", value: "Rp 350.000", color: "text-red-500" },
          { label: "Uang Cuti Dibayar", value: "Rp 800.000", color: "text-emerald-500" },
          { label: "Jumlah Karyawan", value: "120", color: "text-[#1a2b3c]" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 transition-all hover:shadow-md">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className={`text-xl font-bold ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* TABLE SECTION - Pakai p-8 dan rounded-[2rem] biar sama dengan Tabel Jabatan */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-xl text-gray-800 tracking-tight">Rincian Laporan Gaji</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-3 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Cari karyawan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
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
                <th className="px-8 py-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-gray-700 uppercase tracking-tight">{item.nama}</p>
                    <p className="text-[11px] text-gray-400 font-bold uppercase">{item.nik} • {item.jabatan}</p>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-500 text-center">Rp {item.gapok.toLocaleString('id-ID')}</td>
                  <td className="px-8 py-6 text-sm font-bold text-emerald-500 text-center">+{item.cuti > 0 ? `Rp ${item.cuti.toLocaleString('id-ID')}` : 'Rp 0'}</td>
                  <td className="px-8 py-6 text-sm font-bold text-red-400 text-center">-{item.potongan > 0 ? `Rp ${item.potongan.toLocaleString('id-ID')}` : 'Rp 0'}</td>
                  <td className="px-8 py-6 text-sm font-bold text-[#1a2b3c] text-center">Rp {item.total.toLocaleString('id-ID')}</td>
                  <td className="px-8 py-6 text-right">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GRAND TOTAL - Disesuaikan padding dan font-nya (text-2xl) */}
        <div className="bg-gray-50/50 p-8 border-t border-gray-100 flex justify-end">
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Grand Total</span>
            <span className="text-2xl font-bold text-[#004a7c]">Rp {grandTotal.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    </>
  );
}