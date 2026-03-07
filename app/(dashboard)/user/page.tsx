"use client";

import React, { useState } from 'react';
import { 
  Plus, Pencil, Trash2, ChevronDown, 
  User, Lock, Mail, ShieldCheck, Fingerprint
} from "lucide-react";

export default function UserPage() {
  // 1. Data Mock (Role & Initial List)
  const [roleOptions] = useState(["ADMIN", "HRD", "MANAGER", "STAFF"]);
  const [userList, setUserList] = useState([
    { 
      id: 1, nama: "SUPRIADI", email: "supriadi@company.com", 
      role: "ADMIN", status: "AKTIF", lastLogin: "2024-03-15 08:30"
    },
    { 
      id: 2, nama: "SITI AMINAH", email: "siti.aminah@company.com", 
      role: "HRD", status: "AKTIF", lastLogin: "2024-03-14 10:45"
    }
  ]);

  // 2. State Form (Username Dihapus)
  const [formData, setFormData] = useState({
    nama: "", email: "", password: "", role: "", status: "AKTIF"
  });
  const [editId, setEditId] = useState<number | null>(null);

 const handleSave = () => {
    if (!formData.nama || !formData.email || !formData.role) {
      alert("Tolong lengkapi Nama, Email, dan Role ya!");
      return;
    }

    if (editId) {
      // Tambahkan item.lastLogin supaya TypeScript nggak protes datanya kurang
      setUserList(userList.map(item => 
        item.id === editId ? { ...formData, id: editId, nama: formData.nama.toUpperCase(), lastLogin: item.lastLogin } : item
      ));
    } else {
      setUserList([...userList, { 
        ...formData, 
        id: Date.now(), 
        nama: formData.nama.toUpperCase(), 
        lastLogin: "-" 
      }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({ nama: "", email: "", password: "", role: "", status: "AKTIF" });
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setFormData({ ...item, password: "" }); // Password tetap kosong saat edit demi keamanan
  };

  const handleDelete = (id: number) => {
    if (confirm("Hapus akun user ini?")) {
      setUserList(userList.filter(item => item.id !== id));
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a2b3c] tracking-tight">Management User</h1>
        <p className="text-gray-400 mt-1 font-medium text-sm">Monitor and manage application access rights.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* KOTAK KIRI: FORM INPUT */}
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
              <input type="text" placeholder="Masukkan Nama..." value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-blue-200" />
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
                  {roleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
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

        {/* KOTAK GEDE: TABEL DATA (SEMUA TAMPIL DISINI) */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-xl text-gray-800 tracking-tight">System User Accounts</h3>
            <span className="bg-blue-50 text-blue-500 text-[11px] font-bold px-3 py-1 rounded-full border border-blue-100">{userList.length} User Aktif</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold border-b border-gray-50">
                  <th className="px-8 py-5">Info Personal</th>
                  <th className="px-8 py-5">Role Akses</th>
                  <th className="px-8 py-5">Last Login</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((item) => (
                  <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-gray-700 tracking-tight uppercase">{item.nama}</p>
                          <p className="text-[12px] text-gray-400 font-medium">{item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className={item.role === 'ADMIN' ? 'text-purple-500' : 'text-gray-400'} />
                        <span className={`text-[10px] font-black px-2 py-1 rounded-md tracking-wide ${
                          item.role === 'ADMIN' ? 'bg-purple-50 text-purple-500' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {item.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[11px] font-semibold text-gray-400">
                      {item.lastLogin}
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-emerald-50 text-emerald-500 text-[10px] font-black px-2.5 py-1 rounded-md border border-emerald-100">AKTIF</span>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}