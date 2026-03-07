"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ChevronDown 
} from "lucide-react";

export default function JabatanPage() {
  // 1. Data Divisi (Dropdown Options)
  const [divisiOptions] = useState([
    { id: 1, name: "INFORMATION TECHNOLOGY" },
    { id: 2, name: "HRD" },
    { id: 3, name: "FINANCE" }
  ]);

  // 2. Data Jabatan
  const [jabatanList, setJabatanList] = useState([
    { id: 1, name: "FRONTEND DEVELOPER", divisi: "INFORMATION TECHNOLOGY", gaji: "8000000" },
    { id: 2, name: "HR STAFF", divisi: "HRD", gaji: "5000000" }
  ]);

  // 3. State Form
  const [inputName, setInputName] = useState("");
  const [selectedDivisi, setSelectedDivisi] = useState("");
  const [inputGaji, setInputGaji] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleSave = () => {
    if (!inputName || !selectedDivisi || !inputGaji) {
      alert("Tolong isi semua field ya!");
      return;
    }

    if (editId) {
      setJabatanList(jabatanList.map(item => 
        item.id === editId ? { 
          ...item, 
          name: inputName.toUpperCase(), 
          divisi: selectedDivisi, 
          gaji: inputGaji 
        } : item
      ));
    } else {
      const newData = {
        id: Date.now(),
        name: inputName.toUpperCase(),
        divisi: selectedDivisi,
        gaji: inputGaji
      };
      setJabatanList([...jabatanList, newData]);
    }
    resetForm();
  };

  const resetForm = () => {
    setEditId(null);
    setInputName("");
    setSelectedDivisi("");
    setInputGaji("");
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setInputName(item.name);
    setSelectedDivisi(item.divisi);
    setInputGaji(item.gaji);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus jabatan ini?")) {
      setJabatanList(jabatanList.filter(item => item.id !== id));
      if (editId === id) resetForm();
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1a2b3c] tracking-tight">Management Jabatan</h1>
        <p className="text-gray-400 mt-1 font-medium text-sm">Configure job roles and salary structures.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* KOTAK KECIL: FORM INPUT */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 transition-all">
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-2 rounded-lg transition-colors ${editId ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'}`}>
              {editId ? <Pencil size={20} /> : <Plus size={20} />}
            </div>
            <h3 className="font-bold text-lg text-gray-800">{editId ? 'Edit Jabatan' : 'Tambah Jabatan'}</h3>
          </div>

          <div className="space-y-5">
            {/* Input Nama Jabatan */}
            <div>
              <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">Nama Jabatan</label>
              <input 
                type="text"
                placeholder="Contoh: Manager"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-gray-700 font-medium text-sm"
              />
            </div>

            {/* SELECT DIVISI: Pakai Logo Panah Bawah Dosen */}
            <div className="relative">
              <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">Pilih Divisi</label>
              <div className="relative">
                <select 
                  value={selectedDivisi}
                  onChange={(e) => setSelectedDivisi(e.target.value)}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-gray-700 font-medium text-sm appearance-none cursor-pointer"
                >
                  <option value="">Pilih Divisi</option>
                  {divisiOptions.map(opt => (
                    <option key={opt.id} value={opt.name}>{opt.name}</option>
                  ))}
                </select>
                {/* ICON PANAH BAWAH */}
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* Input Gaji */}
            <div>
              <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">Gaji Pokok</label>
              <input 
                type="number"
                placeholder="8000000"
                value={inputGaji}
                onChange={(e) => setInputGaji(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-gray-700 font-medium text-sm"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={handleSave}
                className={`flex-1 ${editId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#004a7c] hover:bg-[#003559]'} text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg active:scale-95 text-sm`}
              >
                {editId ? 'Update' : 'Simpan'}
              </button>
              
              {editId && (
                <button 
                  onClick={resetForm}
                  className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-3.5 rounded-2xl transition-all active:scale-95 text-sm"
                >
                  Batal
                </button>
              )}
            </div>
          </div>
        </div>

        {/* KOTAK GEDE: DATA JABATAN (KOLOM DIPISAH) */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-xl text-gray-800 tracking-tight">Data Jabatan</h3>
            <span className="bg-cyan-50 text-[#00c2cb] text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-100">
              {jabatanList.length} Roles
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                  <th className="px-8 py-5">No</th>
                  <th className="px-8 py-5">Jabatan</th>
                  <th className="px-8 py-5">Divisi</th>
                  <th className="px-8 py-5">Gaji Pokok</th>
                  <th className="px-8 py-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {jabatanList.map((item, index) => (
                  <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                    <td className="px-8 py-6 text-sm font-bold text-blue-400/60">{index + 1}</td>
                    <td className="px-8 py-6 text-[14px] font-bold text-gray-700 uppercase tracking-tight">
                      {item.name}
                    </td>
                    <td className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      {item.divisi}
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-gray-600">Rp {parseInt(item.gaji).toLocaleString('id-ID')}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <button onClick={() => handleEdit(item)} className="p-2 bg-white border border-gray-100 rounded-xl text-orange-400 hover:bg-orange-50 transition-all shadow-sm">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-white border border-gray-100 rounded-xl text-red-400 hover:bg-red-50 transition-all shadow-sm">
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
    </>
  );
}