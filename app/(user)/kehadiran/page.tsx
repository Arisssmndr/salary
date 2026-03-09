"use client";

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Clock, Calendar, MapPin, Info, Send
} from "lucide-react";

export default function PresensiUserPage() {
  // 1. State untuk Waktu Realtime
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 2. State Form Absensi
  const [status, setStatus] = useState("HADIR");
  const [keterangan, setKeterangan] = useState("");
  const [hasAbsen, setHasAbsen] = useState(false);

  // 3. Data Mock Riwayat (Sesuai skala tabel admin)
  const [historyAbsen] = useState([
    { id: 1, tanggal: "09 Mar 2026", masuk: "08:00", pulang: "17:00", status: "HADIR", ket: "-" },
    { id: 2, tanggal: "08 Mar 2026", masuk: "08:15", pulang: "17:05", status: "HADIR", ket: "-" },
    { id: 3, tanggal: "07 Mar 2026", masuk: "-", pulang: "-", status: "IZIN", ket: "Urusan Keluarga" },
  ]);

  // Update jam setiap detik
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    alert(`Berhasil Absen: ${status} pada pukul ${currentTime.toLocaleTimeString()}`);
    setHasAbsen(true);
  };

  return (
    <>
      {/* HEADER & REALTIME CLOCK */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#1a2b3c] tracking-tight">Presensi Kehadiran</h1>
          <p className="text-gray-400 mt-1 font-medium text-sm">Silahkan melakukan presensi harian Anda.</p>
        </div>
        
        {/* Widget Jam Realtime */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-800 tracking-tighter">
              {currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* KIRI: FORM PRESENSI */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Form Presensi</h3>
            </div>

            <div className="space-y-6">
              {/* Pilihan Status */}
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Status Kehadiran</label>
                <div className="grid grid-cols-3 gap-2">
                  {["HADIR", "IZIN", "SAKIT"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setStatus(opt)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all ${
                        status === opt 
                        ? 'bg-[#004a7c] text-white shadow-lg shadow-blue-100' 
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Keterangan */}
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Keterangan (Opsional)</label>
                <textarea 
                  placeholder="Contoh: Sakit flu, Izin urusan keluarga..." 
                  rows={4} 
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200 resize-none"
                ></textarea>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={hasAbsen}
                className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-2xl transition-all active:scale-95 text-sm ${
                  hasAbsen ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#004a7c] text-white shadow-xl shadow-blue-100'
                }`}
              >
                <Send size={18} />
                {hasAbsen ? 'Sudah Presensi Hari Ini' : 'Submit Kehadiran'}
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-[2rem] text-white shadow-lg">
            <div className="flex gap-4">
              <Info className="shrink-0 text-blue-200" size={20} />
              <div>
                <h4 className="font-bold text-sm mb-1">Info Penting</h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Batas waktu presensi masuk adalah pukul **08:30 WIB**. Keterlambatan akan dicatat secara otomatis oleh sistem.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KANAN: RIWAYAT KEHADIRAN */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-xl text-gray-800 tracking-tight">Riwayat Kehadiran</h3>
            <button className="text-[#00c2cb] text-[11px] font-bold hover:underline">Lihat Semua</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                  <th className="px-8 py-5">Tanggal</th>
                  <th className="px-8 py-5">Masuk</th>
                  <th className="px-8 py-5">Pulang</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Ket</th>
                </tr>
              </thead>
              <tbody>
                {historyAbsen.map((item) => (
                  <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                    <td className="px-8 py-6">
                      <p className="text-[14px] font-bold text-gray-700">{item.tanggal}</p>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-gray-500">{item.masuk}</td>
                    <td className="px-8 py-6 text-sm font-medium text-gray-500">{item.pulang}</td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-md ${
                        item.status === 'HADIR' ? 'bg-emerald-50 text-emerald-500' : 'bg-orange-50 text-orange-500'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-xs text-gray-400 italic">{item.ket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}