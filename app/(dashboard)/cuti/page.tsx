"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Info, 
  X,
  Calendar,
  ChevronRight
} from "lucide-react";

export default function ReportCutiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKaryawan, setSelectedKaryawan] = useState<any>(null);

  // Data Mock sesuai gambar kamu
  const cutiData = [
    { id: 1, nik: "EMP001", nama: "Ahmad Fauzi", divisi: "IT", total: 12, terpakai: 4, sisa: 8, history: [
      { tanggal: "2024-02-15", jenis: "Tahunan", durasi: "3 Hari", alasan: "Acara Keluarga", status: "APPROVED" },
      { tanggal: "2024-01-10", jenis: "Sakit", durasi: "1 Hari", alasan: "Demam", status: "APPROVED" },
    ]},
    { id: 2, nik: "EMP002", nama: "Siti Aminah", divisi: "HR", total: 12, terpakai: 2, sisa: 10, history: [] },
    { id: 3, nik: "EMP003", nama: "Budi Santoso", divisi: "Finance", total: 12, terpakai: 12, sisa: 0, history: [] },
    { id: 4, nik: "EMP004", nama: "Rina Wijaya", divisi: "Marketing", total: 15, terpakai: 5, sisa: 10, history: [] },
  ];

  const filteredData = cutiData.filter(item => 
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* HEADER SECTION */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#1a2b3c] tracking-tight">Report Saldo Cuti</h1>
          <p className="text-gray-400 mt-1 font-medium text-sm">Monitor saldo dan penggunaan cuti seluruh karyawan.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-[#004a7c] hover:bg-[#003559] text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-900/10">
          <Download size={18} />
          Download Report
        </button>
      </div>

      <div className="space-y-6">
        {/* SEARCH & QUICK STATS */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <input 
              type="text" 
              placeholder="Cari nama karyawan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm font-medium transition-all"
            />
            <Search className="absolute left-4 top-4 text-gray-400" size={20} />
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            <div className="flex-1 lg:flex-none bg-emerald-50 border border-emerald-100 px-6 py-4 rounded-[1.5rem] flex items-center gap-4">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Total Saldo</span>
              <span className="text-xl font-bold text-emerald-700">450 Hari</span>
            </div>
            <div className="flex-1 lg:flex-none bg-red-50 border border-red-100 px-6 py-4 rounded-[1.5rem] flex items-center gap-4">
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Terpakai</span>
              <span className="text-xl font-bold text-red-600">124 Hari</span>
            </div>
          </div>
        </div>

        {/* TABLE DATA */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold border-b border-gray-50">
                  <th className="px-8 py-6">Karyawan</th>
                  <th className="px-8 py-6 text-center">Divisi</th>
                  <th className="px-8 py-6 text-center">Total</th>
                  <th className="px-8 py-6 text-center text-red-500">Terpakai</th>
                  <th className="px-8 py-6 text-center text-emerald-500">Sisa Saldo</th>
                  <th className="px-8 py-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredData.map((item) => (
                  <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-gray-700 uppercase tracking-tight">{item.nama}</p>
                      <p className="text-[11px] text-gray-400 font-bold uppercase">{item.nik}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase">
                        {item.divisi}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center text-sm font-bold text-gray-600">{item.total}</td>
                    <td className="px-8 py-6 text-center text-sm font-bold text-red-500">{item.terpakai}</td>
                    <td className="px-8 py-6 text-center text-[15px] font-bold text-emerald-500">{item.sisa}</td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => setSelectedKaryawan(item)}
                        className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#004a7c] hover:border-blue-200 transition-all shadow-sm hover:scale-110"
                      >
                        <Info size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL HISTORY - Foto ke-2 yang kamu maksud */}
      {selectedKaryawan && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#1a2b3c]/60 backdrop-blur-sm" onClick={() => setSelectedKaryawan(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-50 flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Detailed History</p>
                <h2 className="text-2xl font-bold text-[#1a2b3c] uppercase">{selectedKaryawan.nama}</h2>
                <p className="text-xs font-bold text-emerald-500 mt-1">Sisa Saldo Cuti: {selectedKaryawan.sisa} Hari</p>
              </div>
              <button onClick={() => setSelectedKaryawan(null)} className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Content - History Table */}
            <div className="p-0 max-h-[400px] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0">
                  <tr className="text-[10px] uppercase tracking-widest text-gray-400 font-bold border-b border-gray-100">
                    <th className="px-8 py-4 font-bold">Tanggal</th>
                    <th className="px-6 py-4">Jenis</th>
                    <th className="px-6 py-4 text-center">Durasi</th>
                    <th className="px-6 py-4">Alasan</th>
                    <th className="px-8 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {selectedKaryawan.history.length > 0 ? (
                    selectedKaryawan.history.map((h: any, idx: number) => (
                      <tr key={idx} className="text-sm">
                        <td className="px-8 py-5 font-bold text-gray-600">{h.tanggal}</td>
                        <td className="px-6 py-5">
                          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">{h.jenis}</span>
                        </td>
                        <td className="px-6 py-5 text-center font-bold text-[#004a7c]">{h.durasi}</td>
                        <td className="px-6 py-5 italic text-gray-400 text-xs">"{h.alasan}"</td>
                        <td className="px-8 py-5 text-right">
                          <span className="text-[9px] font-bold px-2 py-1 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-md">
                            {h.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-medium">
                        Belum ada riwayat pengambilan cuti.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-gray-50/50 text-right">
              <button 
                onClick={() => setSelectedKaryawan(null)}
                className="bg-white border border-gray-200 text-gray-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-all text-sm shadow-sm"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}