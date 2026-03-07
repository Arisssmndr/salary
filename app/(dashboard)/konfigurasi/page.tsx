"use client";

import React, { useState } from 'react';
import { Pencil, Info, Settings, ChevronDown } from "lucide-react";

export default function KonfigurasiPage() {
  // 1. Data Mock (Hanya 1 Data saja sesuai aturan)
  const [konfigList, setKonfigList] = useState([
    { 
      id: 1, 
      tahun: "2024", 
      jatahCuti: 12, 
      nilaiUang: 150000, 
      status: "AKTIF" 
    }
  ]);

  // 2. State Form
  const [formData, setFormData] = useState({
    tahun: "2024", jatahCuti: 12, nilaiUang: 150000, status: "AKTIF"
  });
  const [editId, setEditId] = useState<number | null>(null);

  const handleSave = () => {
    // Logika Edit
    if (editId) {
      setKonfigList(konfigList.map(item => 
        item.id === editId ? { ...formData, id: editId } : item
      ));
      setEditId(null);
      alert("Konfigurasi berhasil diperbarui!");
    } else {
      // Logika Tambah (Hanya jika list kosong)
      if (konfigList.length >= 1) {
        alert("Data sudah ada min! Silakan edit data yang tersedia.");
        return;
      }
      setKonfigList([...konfigList, { ...formData, id: Date.now() }]);
    }
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setFormData({ ...item });
  };

  return (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a2b3c] tracking-tight">Konfigurasi Tahun</h1>
        <p className="text-gray-400 mt-1 font-medium text-sm">Setup annual leave and compensation parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* KOTAK KIRI: FORM INPUT */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${editId ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'}`}>
              <Settings size={20} />
            </div>
            <h3 className="font-bold text-lg text-gray-800">{editId ? 'Edit Konfigurasi' : 'Tambah Konfigurasi'}</h3>
          </div>

          {/* ALERT BOX SESUAI FOTO */}
          {!editId && konfigList.length >= 1 && (
            <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
              <Info className="text-amber-500 shrink-0" size={18} />
              <p className="text-[11px] font-bold text-amber-700 leading-relaxed">
                Jika sudah terdapat satu data maka tidak dapat menambah data lagi.
              </p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Tahun</label>
              <input type="text" value={formData.tahun} onChange={(e) => setFormData({...formData, tahun: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200 font-bold text-gray-600" />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Jatah Cuti Tahunan</label>
              <div className="relative">
                <input type="number" value={formData.jatahCuti} onChange={(e) => setFormData({...formData, jatahCuti: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200 font-bold text-gray-600" />
                <span className="absolute right-4 top-3 text-[10px] font-black text-gray-300 uppercase">HARI</span>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Nilai Uang Per Cuti</label>
              <div className="relative">
                <input type="number" value={formData.nilaiUang} onChange={(e) => setFormData({...formData, nilaiUang: parseInt(e.target.value)})} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200 font-bold text-gray-600" />
                <span className="absolute left-4 top-3.5 text-[10px] font-black text-gray-400">Rp</span>
              </div>
            </div>

            <div className="relative">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Status</label>
              <div className="relative">
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm appearance-none cursor-pointer font-bold text-gray-600">
                  <option value="AKTIF">Aktif</option>
                  <option value="NON-AKTIF">Non-Aktif</option>
                </select>
                <ChevronDown className="absolute right-4 top-4 text-gray-400" size={16} />
              </div>
            </div>

            <button 
              onClick={handleSave} 
              disabled={!editId && konfigList.length >= 1}
              className={`w-full mt-4 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 text-sm shadow-sm ${
                !editId && konfigList.length >= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#004a7c] hover:bg-[#003559]'
              }`}
            >
              {editId ? 'Update Data' : 'Simpan'}
            </button>
          </div>
        </div>

        {/* KOTAK GEDE: TABEL DATA (TANPA TOMBOL DELETE) */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-xl text-gray-800 tracking-tight">Data Konfigurasi</h3>
            <span className="bg-blue-50 text-blue-500 text-[11px] font-bold px-3 py-1 rounded-full border border-blue-100">{konfigList.length} Items Total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold border-b border-gray-50">
                  <th className="px-8 py-5">No</th>
                  <th className="px-8 py-5">Tahun</th>
                  <th className="px-8 py-5">Jatah Cuti</th>
                  <th className="px-8 py-5">Nilai Uang</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {konfigList.map((item, index) => (
                  <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                    <td className="px-8 py-6 text-sm font-bold text-gray-400">{index + 1}</td>
                    <td className="px-8 py-6 text-sm font-black text-gray-700 tracking-tighter">{item.tahun}</td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-gray-600">{item.jatahCuti} <span className="text-[10px] text-gray-400 font-black ml-1">HARI</span></div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-emerald-500">Rp {item.nilaiUang.toLocaleString('id-ID')}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-emerald-50 text-emerald-500 text-[10px] font-black px-2.5 py-1 rounded-md border border-emerald-100">AKTIF</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => handleEdit(item)} 
                        className="p-2 bg-white border border-gray-100 rounded-xl text-orange-400 hover:bg-orange-50 transition-all shadow-sm"
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
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