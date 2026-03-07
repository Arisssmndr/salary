"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  LayoutGrid
} from "lucide-react";

export default function DivisiPage() {
  // State untuk data divisi (Dummy data awal)
  const [divisiList, setDivisiList] = useState([
    { id: 1, name: "INFORMATION TECHNOLOGY" },
    { id: 2, name: "HRD" }
  ]);

  // State untuk form
  const [inputName, setInputName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Fungsi Simpan / Update
  const handleSave = () => {
    if (!inputName.trim()) return;

    if (editId) {
      // Logic Update
      setDivisiList(divisiList.map(item => 
        item.id === editId ? { ...item, name: inputName.toUpperCase() } : item
      ));
      setEditId(null);
    } else {
      // Logic Tambah Baru
      const newData = {
        id: Date.now(),
        name: inputName.toUpperCase()
      };
      setDivisiList([...divisiList, newData]);
    }
    setInputName("");
  };

  // Fungsi Edit (Naikkan data ke form)
  const handleEdit = (item: any) => {
    setEditId(item.id);
    setInputName(item.name);
  };

  // Fungsi Hapus dengan Alert Browser
  const handleDelete = (id: number) => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus divisi ini?");
    if (confirmDelete) {
      setDivisiList(divisiList.filter(item => item.id !== id));
      if (editId === id) {
        setEditId(null);
        setInputName("");
      }
    }
  };

  return (
    <>
      {/* HEADER - Samakan skala dengan Dashboard */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1a2b3c] tracking-tight">Management Divisi</h1>
        <p className="text-gray-400 mt-1 font-medium text-sm">Configure and manage company departments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* KOTAK KECIL: FORM INPUT (4 Kolom) */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 transition-all">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
              {editId ? <Pencil size={20} /> : <Plus size={20} />}
            </div>
            <h3 className="font-bold text-lg text-gray-800">{editId ? 'Edit Divisi' : 'Tambah Divisi'}</h3>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Nama Divisi</label>
              <input 
                type="text"
                placeholder="Contoh: IT Support"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-gray-700 font-medium"
              />
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="flex-1 bg-[#004a7c] hover:bg-[#003559] text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-900/10 active:scale-95"
              >
                {editId ? 'Update' : 'Simpan'}
              </button>
              
              {editId && (
                <button 
                  onClick={() => { setEditId(null); setInputName(""); }}
                  className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-3.5 rounded-2xl transition-all active:scale-95"
                >
                  Batal
                </button>
              )}
            </div>
          </div>
        </div>

        {/* KOTAK GEDE: DATA DIVISI (8 Kolom) */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-xl text-gray-800 tracking-tight">Data Divisi</h3>
            <span className="bg-cyan-50 text-[#00c2cb] text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-100">
              {divisiList.length} Items Total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                  <th className="px-8 py-5 font-bold">No</th>
                  <th className="px-8 py-5 font-bold text-center lg:text-left">Nama Divisi</th>
                  <th className="px-8 py-5 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {divisiList.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <td className="px-8 py-6 text-sm font-bold text-blue-400/70">{index + 1}</td>
                    <td className="px-8 py-6 text-[15px] font-bold text-gray-700 tracking-tight uppercase">
                      {item.name}
                    </td>
                    <td className="px-8 py-6 text-right">
                      {/* ACTION BUTTONS: Muncul saat hover (group-hover) */}
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-2.5 bg-white border border-gray-100 rounded-xl text-orange-400 hover:bg-orange-50 hover:border-orange-100 transition-all shadow-sm"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 bg-white border border-gray-100 rounded-xl text-red-400 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
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