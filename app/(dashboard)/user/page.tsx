"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, Pencil, Trash2, ChevronDown, 
  User, Lock, Mail, ShieldCheck, Fingerprint
} from "lucide-react";

export default function UserPage() {
  // 1. State Management
  const [userList, setUserList] = useState<any[]>([]);
  const [roleOptions] = useState(["admin", "user"]); // Sesuaikan dengan enum di API/Database
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "", email: "", password: "", role: "", status: "AKTIF"
  });
  const [editId, setEditId] = useState<number | null>(null);

  // 2. Ambil Token & Fetch Data
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const fetchUsers = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUserList(data.data || data);
      }
    } catch (err) {
      console.error("Gagal mengambil data user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  // 3. Logika CRUD (Handle Save / Update)
  const handleSave = async () => {
    if (!formData.name || !formData.email || (!editId && !formData.password) || !formData.role) {
      alert("Tolong lengkapi Nama, Email, Password, dan Role ya!");
      return;
    }

    const url = editId 
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user/${editId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user";
    
    const method = editId ? "PATCH" : "POST";

    // Susun Body (Jika edit dan password kosong, jangan kirim password)
    const body: any = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };
    if (formData.password) body.password = formData.password;

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (res.ok) {
        resetForm();
        fetchUsers();
      } else {
        alert(result.message || "Terjadi kesalahan saat menyimpan data.");
      }
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  // 4. Logika Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus akun user ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error("Gagal menghapus user:", err);
    }
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setFormData({
      name: item.name,
      email: item.email,
      role: item.role,
      password: "", // Kosongkan password saat edit
      status: "AKTIF"
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({ name: "", email: "", password: "", role: "", status: "AKTIF" });
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a2b3c] tracking-tight">Management User</h1>
        <p className="text-gray-400 mt-1 font-medium text-sm">Monitor and manage application access rights.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FORM INPUT */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-2 rounded-lg ${editId ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'}`}>
              {editId ? <Lock size={20} /> : <Plus size={20} />}
            </div>
            <h3 className="font-bold text-lg text-gray-800">{editId ? 'Edit User' : 'Tambah User'}</h3>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Nama Lengkap</label>
              <input type="text" placeholder="Masukkan Nama..." value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200" />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email Login</label>
              <input type="email" placeholder="email@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200" />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">{editId ? 'Password Baru (Isi jika ganti)' : 'Password'}</label>
              <div className="relative">
                <input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200" />
                <Lock className="absolute right-4 top-3.5 text-gray-300" size={16} />
              </div>
            </div>

            <div className="relative">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Role System</label>
              <div className="relative">
                <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm appearance-none cursor-pointer">
                  <option value="">-- Pilih Role --</option>
                  {roleOptions.map(opt => <option key={opt} value={opt}>{opt.toUpperCase()}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-4 text-gray-400" size={16} />
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <button onClick={handleSave} className={`flex-1 ${editId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#004a7c] hover:bg-[#003559]'} text-white font-bold py-3.5 rounded-2xl transition-all active:scale-95 text-sm shadow-sm`}>
                {editId ? 'Update' : 'Simpan User'}
              </button>
              {editId && <button onClick={resetForm} className="px-5 bg-gray-100 text-gray-500 font-bold py-3.5 rounded-2xl text-sm hover:bg-gray-200 transition-colors">Batal</button>}
            </div>
          </div>
        </div>

        {/* TABEL DATA */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-xl text-gray-800 tracking-tight">System User Accounts</h3>
            <span className="bg-blue-50 text-blue-500 text-[11px] font-bold px-3 py-1 rounded-full border border-blue-100">{userList.length} User Terdaftar</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold border-b border-gray-50">
              <th className="px-8 py-5">Info Personal</th>
              <th className="px-8 py-5">Role Akses</th>
              <th className="px-8 py-5">Status</th>
              {/* 1. Tambahkan Header untuk Last Login agar sejajar */}
              <th className="px-8 py-5">Last Login</th>
              <th className="px-8 py-5 text-right">Aksi</th>
            </tr>
          </thead>
  <tbody>
    {loading ? (
      <tr>
        {/* 2. Sesuaikan colSpan menjadi 5 karena kolom bertambah satu */}
        <td colSpan={5} className="px-8 py-10 text-center text-gray-400">
          Memuat data...
        </td>
      </tr>
    ) : (
      userList.map((item) => (
        <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
          <td className="px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                <User size={18} />
              </div>
              <div>
                <p className="text-[14px] font-bold text-gray-700 tracking-tight uppercase">{item.name}</p>
                <p className="text-[12px] text-gray-400 font-medium">{item.email}</p>
              </div>
            </div>
          </td>
          <td className="px-8 py-6">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className={item.role === 'admin' ? 'text-purple-500' : 'text-gray-400'} />
              <span className={`text-[10px] font-black px-2 py-1 rounded-md tracking-wide uppercase ${
                item.role === 'admin' ? 'bg-purple-50 text-purple-500' : 'bg-gray-100 text-gray-500'
              }`}>
                {item.role}
              </span>
            </div>
          </td>
          <td className="px-8 py-6">
            <span className="bg-emerald-50 text-emerald-500 text-[10px] font-black px-2.5 py-1 rounded-md border border-emerald-100">
              AKTIF
            </span>
          </td>
          
          {/* 3. Tampilkan Data Last Login di Body */}
          <td className="px-8 py-6 text-[11px] font-semibold text-gray-400">
            {item.last_login || "-"}
          </td>

          <td className="px-8 py-6 text-right">
            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
              <button onClick={() => handleEdit(item)} className="p-2 bg-white border border-gray-100 rounded-xl text-orange-400 hover:bg-orange-50 transition-all shadow-sm" title="Edit User">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 bg-white border border-gray-100 rounded-xl text-red-400 hover:bg-red-50 transition-all shadow-sm" title="Hapus User">
                <Trash2 size={16} />
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