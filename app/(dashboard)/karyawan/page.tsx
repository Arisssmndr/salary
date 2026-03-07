"use client";

import React, { useState } from 'react';
import { 
  Plus, Pencil, Trash2, ChevronDown, Info, X, Mail, MapPin, Calendar, Briefcase, User
} from "lucide-react";

export default function KaryawanPage() {
  // 1. Data Mock (Dropdown & Initial List)
  const [jabatanOptions] = useState(["MANAGER IT", "FRONTEND DEVELOPER", "HR SPECIALIST", "FINANCE"]);
  const [karyawanList, setKaryawanList] = useState([
    { 
      id: 1, nik: "EMP001", nama: "Ahmad Fauzi", email: "ahmad.fauzi@company.com", 
      tempatLahir: "Bandung", tanggalLahir: "1990-05-15", alamat: "Jl. Merdeka No. 123", 
      jabatan: "MANAGER IT", status: "AKTIF" 
    },
    { 
      id: 2, nik: "EMP002", nama: "Siti Aminah", email: "siti.aminah@company.com", 
      tempatLahir: "Jakarta", tanggalLahir: "1995-08-20", alamat: "Jl. Sudirman No. 45", 
      jabatan: "HR SPECIALIST", status: "AKTIF" 
    }
  ]);

  // 2. State Form
  const [formData, setFormData] = useState({
    nik: "", nama: "", email: "", tempatLahir: "", tanggalLahir: "", alamat: "", jabatan: "", status: "AKTIF"
  });
  const [editId, setEditId] = useState<number | null>(null);
  
  // 3. State Modal Detail
  const [showDetail, setShowDetail] = useState<any>(null);

  const handleSave = () => {
    if (!formData.nik || !formData.nama || !formData.jabatan) {
      alert("Minimal isi NIK, Nama, dan Jabatan ya!");
      return;
    }

    if (editId) {
      setKaryawanList(karyawanList.map(item => item.id === editId ? { ...formData, id: editId } : item));
    } else {
      setKaryawanList([...karyawanList, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({ nik: "", nama: "", email: "", tempatLahir: "", tanggalLahir: "", alamat: "", jabatan: "", status: "AKTIF" });
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setFormData(item);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data karyawan ini?")) {
      setKaryawanList(karyawanList.filter(item => item.id !== id));
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1a2b3c] tracking-tight">Management Karyawan</h1>
        <p className="text-gray-400 mt-1 font-medium text-sm">Manage employee records and information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* KOTAK KIRI: INPUT FORM (PROFIL LENGKAP) */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-2 rounded-lg ${editId ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'}`}>
              {editId ? <Pencil size={20} /> : <Plus size={20} />}
            </div>
            <h3 className="font-bold text-lg text-gray-800">{editId ? 'Edit Karyawan' : 'Tambah Karyawan'}</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">NIK</label>
                <input type="text" placeholder="NIK" value={formData.nik} onChange={(e) => setFormData({...formData, nik: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Nama</label>
                <input type="text" placeholder="Nama Lengkap" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email</label>
              <input type="email" placeholder="email@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Tempat Lahir</label>
                <input type="text" placeholder="Kota" value={formData.tempatLahir} onChange={(e) => setFormData({...formData, tempatLahir: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Tanggal Lahir</label>
                <input type="date" value={formData.tanggalLahir} onChange={(e) => setFormData({...formData, tanggalLahir: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Alamat</label>
              <textarea placeholder="Alamat Lengkap" rows={2} value={formData.alamat} onChange={(e) => setFormData({...formData, alamat: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200 resize-none"></textarea>
            </div>

            <div className="relative">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Jabatan</label>
              <select value={formData.jabatan} onChange={(e) => setFormData({...formData, jabatan: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm appearance-none cursor-pointer">
                <option value="">Pilih Jabatan</option>
                {jabatanOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-[38px] text-gray-400" size={16} />
            </div>

            <div className="pt-4 flex gap-2">
              <button onClick={handleSave} className={`flex-1 ${editId ? 'bg-orange-500' : 'bg-[#004a7c]'} text-white font-bold py-3 rounded-xl transition-all active:scale-95 text-sm`}>
                {editId ? 'Update' : 'Simpan'}
              </button>
              {editId && <button onClick={resetForm} className="px-5 bg-gray-100 text-gray-500 font-bold py-3 rounded-xl text-sm">Batal</button>}
            </div>
          </div>
        </div>

        {/* KOTAK KANAN: TABEL DATA (VIEW KERJAAN) */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-xl text-gray-800 tracking-tight">Data Karyawan</h3>
            <span className="bg-cyan-50 text-[#00c2cb] text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-100">{karyawanList.length} Items Total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                  <th className="px-8 py-5">No</th>
                  <th className="px-8 py-5">Nama</th>
                  <th className="px-8 py-5">Jabatan</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {karyawanList.map((item, index) => (
                  <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                    <td className="px-8 py-6 text-sm font-bold text-blue-400/60">{index + 1}</td>
                    <td className="px-8 py-6">
                      <p className="text-[14px] font-bold text-gray-700">{item.nama}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[11px] font-bold bg-gray-100 text-gray-500 px-3 py-1 rounded-lg uppercase tracking-tight">{item.jabatan}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-emerald-50 text-emerald-500 text-[10px] font-black px-2.5 py-1 rounded-md">AKTIF</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={() => setShowDetail(item)} className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition-colors">
                          <Info size={16} />
                        </button>
                        <button onClick={() => handleEdit(item)} className="p-2 bg-orange-50 text-orange-400 rounded-lg hover:bg-orange-100 transition-colors">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-400 rounded-lg hover:bg-red-100 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* MODAL DETAIL KARYAWAN (POP-UP) */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2b3c]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-[#004a7c] to-[#003559] p-8 text-white relative">
              <button onClick={() => setShowDetail(null)} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-1">{showDetail.nama}</h2>
              <p className="text-blue-200 text-sm font-medium tracking-wide uppercase">{showDetail.jabatan}</p>
            </div>

            {/* Body Modal */}
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2 block">NIK</label>
                  <p className="font-bold text-gray-800 text-lg tracking-tight">{showDetail.nik}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2 block">Status</label>
                  <span className="bg-emerald-50 text-emerald-500 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-100 inline-block mt-1">AKTIF</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Email Address</label>
                    <p className="text-sm font-semibold text-gray-600">{showDetail.email || '-'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Birth Information</label>
                    <p className="text-sm font-semibold text-gray-600">{showDetail.tempatLahir}, {showDetail.tanggalLahir}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Home Address</label>
                    <p className="text-sm font-semibold text-gray-600 leading-relaxed max-w-[250px]">{showDetail.alamat || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Footer Modal */}
              <button 
                onClick={() => setShowDetail(null)}
                className="w-full bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold py-4 rounded-2xl transition-all border border-gray-100 mt-4"
              >
                Close Detailed View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Custom for Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
      `}</style>
    </>
  );
}