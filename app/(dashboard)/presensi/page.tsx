"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  FileText, 
  Printer, 
  Eye, 
  Calendar,
  ChevronDown,
  X,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";

export default function ReportPresensiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("2026-03-07"); // Default hari ini
  const [selectedDivisi, setSelectedDivisi] = useState("Semua Divisi");
  const [selectedDetail, setSelectedDetail] = useState<any>(null);

  // Data Mock sesuai foto kamu
  const presensiData = [
    { id: 1, nik: "EMP001", nama: "Ahmad Fauzi", divisi: "IT", jamMasuk: "08:00", jamKeluar: "17:05", status: "HADIR", lokasi: "Kantor Pusat" },
    { id: 2, nik: "EMP002", nama: "Siti Aminah", divisi: "HR", jamMasuk: "08:15", jamKeluar: "17:10", status: "HADIR", lokasi: "Kantor Pusat" },
    { id: 3, nik: "EMP003", nama: "Budi Santoso", divisi: "Finance", jamMasuk: "-", jamKeluar: "-", status: "IZIN", alasan: "Urusan Keluarga" },
    { id: 4, nik: "EMP004", nama: "Rina Wijaya", divisi: "Marketing", jamMasuk: "08:30", jamKeluar: "17:00", status: "HADIR", lokasi: "Remote (WFH)" },
  ];

  const filteredData = presensiData.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || item.nik.includes(searchTerm);
    const matchDivisi = selectedDivisi === "Semua Divisi" || item.divisi === selectedDivisi;
    return matchSearch && matchDivisi;
  });

  return (
    <>
      {/* HEADER SECTION */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#1a2b3c] tracking-tight">Report Presensi</h1>
          <p className="text-gray-400 mt-1 font-medium text-sm">Monitoring kehadiran seluruh karyawan secara real-time.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-100 text-gray-600 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all hover:bg-gray-50 shadow-sm">
            <FileText size={18} className="text-red-500" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 bg-[#004a7c] hover:bg-[#003559] text-white px-6 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-900/10">
            <Printer size={18} />
            Cetak Laporan
          </button>
        </div>
      </div>

      {/* FILTER BAR - Sesuai Alur Foto Kamu */}
      <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-50 flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-[2]">
          <input 
            type="text" 
            placeholder="Cari nama karyawan atau NIK..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
        </div>

        <div className="relative flex-1">
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 focus:outline-none"
          />
        </div>

        <div className="relative flex-1">
          <select 
            value={selectedDivisi}
            onChange={(e) => setSelectedDivisi(e.target.value)}
            className="w-full appearance-none px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 focus:outline-none cursor-pointer"
          >
            <option>Semua Divisi</option>
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Marketing</option>
          </select>
          <ChevronDown className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={18} />
        </div>
      </div>

      {/* TABLE DATA PRESENSI */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-xl text-[#1a2b3c]">Data Kehadiran Hari Ini</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hadir: 120</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Izin: 5</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold border-b border-gray-50">
                <th className="px-8 py-5">No</th>
                <th className="px-8 py-5">Karyawan</th>
                <th className="px-8 py-5 text-center">Divisi</th>
                <th className="px-8 py-5 text-center">Jam Masuk</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item, index) => (
                <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 text-sm font-bold text-gray-400">{index + 1}</td>
                  <td className="px-8 py-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#004a7c] font-bold text-xs shadow-inner">
                      {item.nama.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-700 uppercase tracking-tight">{item.nama}</p>
                      <p className="text-[11px] text-gray-400 font-bold uppercase">{item.nik}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {item.divisi}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center text-sm font-bold text-gray-600">{item.jamMasuk}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
                      item.status === 'HADIR' 
                      ? 'bg-emerald-50 text-emerald-500 border-emerald-100' 
                      : 'bg-orange-50 text-orange-500 border-orange-100'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => setSelectedDetail(item)}
                      className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#004a7c] hover:border-blue-200 transition-all shadow-sm hover:scale-110"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETAIL PRESENSI (Tombol Mata) */}
      {selectedDetail && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#1a2b3c]/60 backdrop-blur-sm" onClick={() => setSelectedDetail(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-50 flex justify-between items-start bg-gray-50/50">
              <div>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-1">Presensi Details</p>
                <h2 className="text-2xl font-bold text-[#1a2b3c] uppercase">{selectedDetail.nama}</h2>
                <p className="text-xs font-bold text-gray-400 mt-1 uppercase">{selectedDetail.nik} • {selectedDetail.divisi}</p>
              </div>
              <button onClick={() => setSelectedDetail(null)} className="p-2 text-gray-400 hover:bg-white rounded-full transition-colors shadow-sm">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={12} /> Jam Masuk
                </p>
                <p className="text-lg font-bold text-gray-700">{selectedDetail.jamMasuk}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={12} /> Jam Pulang
                </p>
                <p className="text-lg font-bold text-gray-700">{selectedDetail.jamKeluar || "-"}</p>
              </div>
              <div className="col-span-2 space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={12} /> Lokasi Presensi
                </p>
                <p className="text-sm font-bold text-gray-600">{selectedDetail.lokasi || selectedDetail.alasan || "Tidak Terdeteksi"}</p>
              </div>
            </div>

            <div className="p-8 bg-gray-50/50 text-right">
              <button 
                onClick={() => setSelectedDetail(null)}
                className="w-full bg-[#004a7c] text-white font-bold py-4 rounded-2xl hover:bg-[#003559] transition-all active:scale-95 text-sm shadow-lg shadow-blue-900/10"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}