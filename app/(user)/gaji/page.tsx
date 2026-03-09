"use client";

import React, { useState } from 'react';
import { 
  Eye, 
  X, 
  Calendar,
  ClipboardList
} from "lucide-react";

// --- KOMPONEN MODAL DETAIL (Ukuran & Warna Sama dengan Gaji) ---
const DetailCutiModal = ({ isOpen, onClose, data }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* HEADER MODAL - Dark Blue Style */}
        <div className="bg-[#1a2b3c] p-8 text-white relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">
                LEAVE<span className="text-[#00c2cb]">APP</span>
              </h2>
              <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mt-1">Leave Request Detail</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Jenis Cuti</p>
              <p className="text-xl font-bold uppercase">{data?.jenis}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Durasi</p>
              <p className="text-sm font-bold">{data?.durasi}</p>
            </div>
          </div>
        </div>

        {/* ISI MODAL */}
        <div className="p-8 space-y-8">
          <div>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Informasi Tanggal</h4>
            <div className="space-y-3 font-bold text-gray-800">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rentang Tanggal</span>
                <span className="text-sm">{data?.tanggal}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Alasan Pengajuan</h4>
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-sm font-medium text-gray-600">
              {data?.alasan}
            </div>
          </div>

          <div className="pt-6 border-t border-dashed border-gray-200">
            <div className="bg-gray-50 p-6 rounded-2xl flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Status Pengajuan</span>
              <span className={`text-base font-black tracking-tighter uppercase ${data?.status === 'APPROVED' ? 'text-green-500' : 'text-orange-500'}`}>
                {data?.status}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 bg-[#1a2b3c] text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-[#25394d] transition-colors shadow-lg shadow-[#1a2b3c]/20">
              Tutup Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HALAMAN UTAMA ---
export default function RiwayatCutiPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCuti, setSelectedCuti] = useState(null);

  const dataRiwayat = [
    { jenis: "Tahunan", tanggal: "15 Feb - 17 Feb 2024", durasi: "3 Hari", alasan: "Acara keluarga di luar kota", status: "APPROVED" },
    { jenis: "Sakit", tanggal: "10 Jan 2024", durasi: "1 Hari", alasan: "Kondisi badan kurang fit (Flu)", status: "APPROVED" },
    { jenis: "Tahunan", tanggal: "20 Mar 2024", durasi: "1 Hari", alasan: "Keperluan mendadak", status: "PENDING" },
  ];

  const handleViewDetails = (cuti: any) => {
    setSelectedCuti(cuti);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto min-h-screen font-sans">
      {/* HEADER PAGE - Ukuran 3xl sama dengan Gaji */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a2b3c] tracking-tight">
          Riwayat & Saldo Cuti
        </h1>
        <p className="text-gray-500 mt-1 text-sm font-medium">
          Lihat riwayat dan status pengajuan cuti Anda secara mendetail.
        </p>
      </div>

      {/* TABEL LIST RIWAYAT - Ukuran rounded-3xl & padding p-8 sama dengan Gaji */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                <th className="px-8 py-6">Jenis Cuti</th>
                <th className="px-8 py-6">Rentang Tanggal</th>
                <th className="px-8 py-6">Durasi</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {dataRiwayat.map((cuti, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 text-base font-bold text-gray-800">
                    {cuti.jenis}
                  </td>
                  <td className="px-8 py-6 text-sm font-semibold text-gray-500">
                    {cuti.tanggal}
                  </td>
                  <td className="px-8 py-6 text-base font-black text-[#1a2b3c]">
                    {cuti.durasi}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border ${
                        cuti.status === 'APPROVED' 
                        ? 'bg-green-50 text-green-600 border-green-100' 
                        : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                      {cuti.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleViewDetails(cuti)}
                        className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-[#1a2b3c] hover:text-white transition-all shadow-sm"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL OVERLAY */}
      <DetailCutiModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedCuti} 
      />
    </div>
  ); 
}