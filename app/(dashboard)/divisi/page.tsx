"use client";

import { useState } from "react";

interface Divisi {
  id: number;
  nama: string;
}

export default function DivisiPage() {
  const [namaDivisi, setNamaDivisi] = useState("");
  const [divisiList, setDivisiList] = useState<Divisi[]>([
    { id: 1, nama: "OB" },
    { id: 2, nama: "INFORMATION TECHNOLOGY" },
    { id: 3, nama: "EDUCATION" },
    { id: 4, nama: "HRD" },
  ]);

  const handleTambah = () => {
    if (!namaDivisi.trim()) return;

    const newDivisi: Divisi = {
      id: divisiList.length + 1,
      nama: namaDivisi.toUpperCase(),
    };

    setDivisiList([...divisiList, newDivisi]);
    setNamaDivisi("");
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Management Divisi
        </h1>
        <p className="text-gray-500">
          Configure and manage company departments.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-800">
            Tambah Divisi
          </h2>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Nama Divisi
            </label>
            <input
              type="text"
              value={namaDivisi}
              onChange={(e) => setNamaDivisi(e.target.value)}
              placeholder="Contoh: IT Support"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={handleTambah}
            className="w-full bg-[#0f4c75] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Simpan
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Data Divisi
            </h2>
            <span className="text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
              {divisiList.length} Items Total
            </span>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">No</th>
                <th className="py-2">Nama Divisi</th>
              </tr>
            </thead>
            <tbody>
              {divisiList.map((divisi, index) => (
                <tr
                  key={divisi.id}
                  className="border-b last:border-none"
                >
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3 font-medium text-gray-800">
                    {divisi.nama}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}