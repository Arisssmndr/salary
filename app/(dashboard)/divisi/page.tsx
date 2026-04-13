"use client";

import React, { useState, useEffect } from 'react'; // 1. Tambahkan useEffect
import { 
  Plus, 
  Pencil, 
  Trash2, 
} from "lucide-react";

export default function DivisiPage() {
  // --- STATE ---
  const [divisiList, setDivisiList] = useState<any[]>([]); // Ubah jadi array kosong
  const [inputDivisi, setInputDivisi] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [token, setToken] = useState("");

  // 2. AMBIL TOKEN (Sesuaikan penyimpanan token kamu)
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) setToken(storedToken);
    console.log(storedToken);
    
  }, []);

  // 3. GET DATA (FETCH)
  const fetchDivisi = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi", 
        {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setDivisiList(data.data || data); // Sesuaikan dengan struktur API
      }
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  useEffect(() => {
    fetchDivisi();
  }, [token]);

  // 4. FUNGSI SIMPAN / UPDATE (API)
  const handleSave = async () => {
    if (!inputDivisi.trim()) return;

    const url = editId 
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi/${editId}` // URL Update
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi"; // URL Create

    try {
      const res = await fetch(url, {
        method: editId ? "PATCH" : "POST", // Method dinamis
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          divisi: inputDivisi.toUpperCase(), // Pastikan key 'nama' sesuai database
        }),
      });

      if (res.ok) {
        fetchDivisi(); // Refresh tabel
        setInputDivisi("");
        setEditId(null);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Terjadi kesalahan");
      }
    } catch (err) {
      console.error("Gagal menyimpan:", err);
    }
  };

  // 5. FUNGSI HAPUS (API)
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus divisi ini?")) return;

    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });

      if (res.ok) {
        fetchDivisi(); // Refresh tabel
      }
    } catch (err) {
      console.error("Gagal menghapus:", err);
    }
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    // Sesuaikan item.name dengan item.nama (biasanya API menggunakan nama Indonesia)
    setInputDivisi(item.divisi || item.divisi); 
  };

  return (
    <>
      {/* TAMPILAN TETAP SAMA SEPERTI KODE LAMA KAMU */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1a2b3c] tracking-tight">Management Divisi</h1>
        <p className="text-gray-400 mt-1 font-medium text-sm">Configure and manage company departments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                value={inputDivisi}
                onChange={(e) => setInputDivisi(e.target.value)}
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
                  onClick={() => { setEditId(null); setInputDivisi(""); }}
                  className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-3.5 rounded-2xl transition-all active:scale-95"
                >
                  Batal
                </button>
              )}
            </div>
          </div>
        </div>

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
                  <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                    <td className="px-8 py-6 text-sm font-bold text-blue-400/70">{index + 1}</td>
                    <td className="px-8 py-6 text-[15px] font-bold text-gray-700 tracking-tight uppercase">
                      {/* Sesuaikan item.nama dengan kolom dari API */}
                      {item.divisi || item.divisi} 
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-2.5 bg-white border border-gray-100 rounded-xl text-orange-400 hover:bg-orange-50 hover:border-orange-100 transition-all shadow-sm"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 bg-white border border-gray-100 rounded-xl text-red-400 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm"
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