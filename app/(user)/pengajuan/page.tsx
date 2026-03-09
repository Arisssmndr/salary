"use client";

import React, { useState } from 'react';
import { 
  Calendar, 
  Heart, 
  AlertCircle, 
  Users, 
  Upload, 
  Send,
  Info
} from "lucide-react";

export default function PengajuanCutiPage() {
  const [jenisCuti, setJenisCuti] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalBerakhir, setTanggalBerakhir] = useState("");
  const [alasan, setAlasan] = useState("");

  const handleKirim = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pengajuan Cuti Berhasil Terkirim!");
    // Reset form
    setJenisCuti("");
    setTanggalMulai("");
    setTanggalBerakhir("");
    setAlasan("");
  };

  const types = [
    { id: 'tahunan', label: 'Cuti Tahunan', icon: Calendar, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'sakit', label: 'Cuti Sakit', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'penting', label: 'Alasan Penting', icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'bersama', label: 'Cuti Bersama', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  return (
    <div className="p-0">
      {/* HEADER: Identik dengan Dashboard */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Pengajuan
        </h1>
        <p className="text-gray-400 mt-0.5 font-medium text-sm">
          Silahkan lengkapi data di bawah ini untuk mengajukan cuti.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KIRI: FORM PENGAJUAN (Skala disesuaikan dengan Dashboard History) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[1.8rem] shadow-sm border border-gray-100">
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight italic leading-none">Form Pengajuan Cuti</h2>
            <div className="w-10 h-1 bg-[#00c2cb] rounded-full mt-3 shadow-[0_0_8px_rgba(0,194,203,0.4)]"></div>
          </div>

          <form onSubmit={handleKirim} className="space-y-8">
            {/* PILIH JENIS CUTI */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 ml-1">Pilih Jenis Cuti</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {types.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setJenisCuti(type.id)}
                    className={`flex flex-col items-center justify-center p-5 rounded-[1.5rem] border-2 transition-all gap-3 group
                      ${jenisCuti === type.id 
                        ? 'border-[#00c2cb] bg-cyan-50/20 shadow-sm' 
                        : 'border-gray-50 bg-gray-50/50 hover:border-gray-200 hover:bg-white'}`}
                  >
                    <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${type.bg} ${type.color}`}>
                      <type.icon size={22} />
                    </div>
                    <span className={`text-[11px] font-bold ${jenisCuti === type.id ? 'text-[#00c2cb]' : 'text-gray-500'}`}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* INPUT TANGGAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Tanggal Mulai</label>
                <input 
                  type="date" 
                  value={tanggalMulai}
                  onChange={(e) => setTanggalMulai(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#00c2cb]/20 focus:border-[#00c2cb] outline-none transition-all font-medium text-gray-700"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Tanggal Berakhir</label>
                <input 
                  type="date" 
                  value={tanggalBerakhir}
                  onChange={(e) => setTanggalBerakhir(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#00c2cb]/20 focus:border-[#00c2cb] outline-none transition-all font-medium text-gray-700"
                />
              </div>
            </div>

            {/* INPUT ALASAN */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Alasan Cuti</label>
              <textarea 
                rows={4}
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                placeholder="Berikan alasan yang jelas..."
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-2 focus:ring-[#00c2cb]/20 focus:border-[#00c2cb] outline-none transition-all resize-none font-medium text-gray-700"
              />
            </div>

            {/* UPLOAD: Skala identik dengan Pengumuman Dashboard */}
            <div className="border-2 border-dashed border-gray-100 rounded-[1.8rem] p-8 flex flex-col items-center justify-center bg-gray-50/30 group hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 text-gray-400 group-hover:text-[#00c2cb] transition-colors">
                <Upload size={20} />
              </div>
              <p className="text-sm font-bold text-gray-800 tracking-tight">Upload Dokumen Pendukung (Opsional)</p>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">PDF, JPG, atau PNG (Maks 2MB)</p>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-[#001e2f] text-white rounded-[1.2rem] font-bold flex items-center justify-center gap-3 hover:bg-[#002d45] transition-all shadow-lg shadow-blue-900/10 active:scale-[0.98]"
            >
              <Send size={18} />
              Kirim Pengajuan
            </button>
          </form>
        </div>

        {/* KANAN: KETENTUAN (Gaya disesuaikan dengan Sidebar/Card Dashboard) */}
        <div className="space-y-6">
          <div className="bg-[#001e2f] rounded-[1.8rem] p-8 text-white relative overflow-hidden shadow-xl min-h-[480px]">
             {/* Elemen Dekoratif sesuai Dashboard */}
             <div className="absolute -right-6 -top-6 opacity-10 rotate-12 text-cyan-400">
               <Info size={180} />
             </div>
             
             <div className="flex items-center gap-3 mb-10 relative z-10">
               <div className="w-9 h-9 bg-cyan-400 rounded-xl flex items-center justify-center text-[#001e2f] shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                 <AlertCircle size={20} fill="currentColor" />
               </div>
               <h3 className="font-bold text-lg tracking-tight">Ketentuan Cuti</h3>
             </div>

             <ul className="space-y-8 relative z-10">
               {[
                 "Pengajuan cuti dilakukan minimal 3 hari sebelum tanggal mulai.",
                 "Cuti sakit wajib melampirkan surat keterangan dokter.",
                 "Persetujuan cuti bergantung pada kebijakan manajer divisi."
               ].map((text, i) => (
                 <li key={i} className="flex gap-4 items-start group">
                   <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black border border-white/5 group-hover:bg-cyan-400 group-hover:text-[#001e2f] transition-colors">
                    {i+1}
                   </span>
                   <p className="text-xs text-white/70 leading-relaxed font-medium mt-1 group-hover:text-white transition-colors">{text}</p>
                 </li>
               ))}
             </ul>

             {/* Footer Info Box identik dengan History Section di Dashboard */}
             <div className="mt-16 p-6 bg-white/5 rounded-[1.5rem] border border-white/10 backdrop-blur-sm relative z-10">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Butuh Bantuan?</p>
                <p className="text-xs font-medium text-white/90 leading-relaxed">
                  Hubungi HRD melalui email resmi kami di:
                  <span className="text-cyan-400 font-bold block mt-1.5 text-sm underline decoration-cyan-400/30 underline-offset-4">hrd@company.com</span>
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}