"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function JabatanPage() {
  const [jabatanList, setJabatanList] = useState<any[]>([]);
  const [divisiOptions, setDivisiOptions] = useState<any[]>([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  // State Form
  const [inputName, setInputName] = useState("");
  const [selectedDivisi, setSelectedDivisi] = useState("");
  const [inputGaji, setInputGaji] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) setToken(storedToken);
  }, []);

  // 1. Fetch Data Jabatan (READ)
  const fetchJabatan = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) setJabatanList(data.data || data);
    } catch (err) {
      console.error("Gagal mengambil data jabatan:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Data Divisi (Dropdown)
  const fetchDivisi = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) setDivisiOptions(data.data || data);
    } catch (err) {
      console.error("Gagal mengambil divisi:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchJabatan();
      fetchDivisi();
    }
  }, [token]);

  // 3. Handle Create & Update
  const handleSubmit = async () => {
    if (!inputName || !selectedDivisi || !inputGaji) return alert("Isi semua data!");

    const url = editId 
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${editId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan";
    
    const method = editId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          jabatan: inputName,
          divisi_id: selectedDivisi,
          gaji_pokok: inputGaji,
        }),
      });

      if (res.ok) {
        alert(editId ? "Jabatan diperbarui!" : "Jabatan ditambahkan!");
        resetForm();
        fetchJabatan();
      }
    } catch (err) {
      console.error("Error saving jabatan:", err);
    }
  };

  // 4. Handle Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus jabatan ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });
      if (res.ok) {
        alert("Jabatan dihapus!");
        fetchJabatan();
      }
    } catch (err) {
      console.error("Error deleting jabatan:", err);
    }
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setInputName(item.jabatan);
    setSelectedDivisi(item.divisi_id);
    setInputGaji(item.gaji_pokok);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditId(null);
    setInputName("");
    setSelectedDivisi("");
    setInputGaji("");
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1a2b3c] tracking-tight">Management Jabatan</h1>
        <p className="text-gray-400 mt-1 font-medium text-sm">Kelola data jabatan dan struktur gaji.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* FORM INPUT */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-2 rounded-lg ${editId ? "bg-orange-50 text-orange-500" : "bg-blue-50 text-blue-500"}`}>
              {editId ? <Pencil size={20} /> : <Plus size={20} />}
            </div>
            <h3 className="font-bold text-lg text-gray-800">{editId ? "Edit Jabatan" : "Tambah Jabatan"}</h3>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">Nama Jabatan</label>
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 focus:outline-blue-200"
                placeholder="Contoh: Manager"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">Pilih Divisi</label>
              <select
                value={selectedDivisi}
                onChange={(e) => setSelectedDivisi(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm text-gray-600 font-bold focus:outline-blue-200"
              >
                <option value="">Pilih Divisi</option>
                {divisiOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.divisi || opt.nama}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">Gaji Pokok</label>
              <input
                type="number"
                value={inputGaji}
                onChange={(e) => setInputGaji(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 focus:outline-blue-200"
                placeholder="8000000"
              />
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full bg-[#004a7c] text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              {editId ? "Update Data" : "Simpan Jabatan"}
            </button>
            
            {editId && (
              <button onClick={resetForm} className="w-full text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">
                Batal Edit
              </button>
            )}
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-xl text-gray-800">Data Jabatan</h3>
            <span className="bg-cyan-50 text-[#00c2cb] text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-100">
              {jabatanList.length} Roles
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold border-b border-gray-50">
                  <th className="px-8 py-5">No</th>
                  <th className="px-8 py-5">Jabatan</th>
                  <th className="px-8 py-5">Gaji Pokok</th>
                  <th className="px-8 py-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="text-center py-10 text-gray-400 italic">Memuat data...</td></tr>
                ) : (
                  jabatanList.map((item, index) => (
                    <tr key={item.id} className="group hover:bg-gray-50/50 border-b border-gray-50 last:border-0 transition-colors">
                      <td className="px-8 py-6 text-sm font-bold text-blue-400/60">{index + 1}</td>
                      <td className="px-8 py-6 font-bold text-gray-700 uppercase tracking-tight">{item.jabatan}</td>
                      <td className="px-8 py-6 font-black text-emerald-500 text-sm">
                        Rp {Number(item.gaji_pokok).toLocaleString("id-ID")}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="p-2 text-orange-400 hover:bg-orange-50 rounded-xl border border-transparent hover:border-orange-100 transition-all"
                          >
                            <Pencil size={16}/>
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-400 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 transition-all"
                          >
                            <Trash2 size={16}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}