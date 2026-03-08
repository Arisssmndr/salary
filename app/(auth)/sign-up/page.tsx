"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  UserPlus,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://payroll.politekniklp3i-tasikmalaya.ac.id/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            role: "admin",
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registrasi gagal, coba lagi min.");
      }

      alert("Akun berhasil dibuat! Silakan login.");
      router.push("/sign-in");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dekorasi Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]" />

      <div className="w-full max-w-[1100px] grid lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 overflow-hidden border border-white relative z-10">
        {/* SISI KIRI: BRANDING (Identik dengan Sign In) */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#004a7c] to-[#002a45] p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 flex-shrink-0">
              <Image
                src="/crown-logo.jpg"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter italic text-white">
                INDO<span className="text-blue-400">PAY</span>
              </h1>
              <p className="text-[9px] font-bold text-blue-200/50 tracking-[0.2em] mt-1 uppercase">
                Payroll System
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight mb-6">
              Start your <br />
              <span className="text-blue-300">journey</span> with us.
            </h2>
            <p className="text-blue-100/70 text-lg font-medium leading-relaxed">
              Daftarkan akun administrator Anda untuk mulai mengelola sistem
              payroll dan data karyawan secara modern.
            </p>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-sm font-medium text-blue-200/50">
              © 2026 NUSAPAY Payroll System.
            </p>
          </div>
        </div>

        {/* SISI KANAN: FORM REGISTER */}
        <div className="p-12 lg:p-16 flex flex-col justify-center">
          <button
            onClick={() => router.push("/sign-in")}
            className="flex items-center gap-2 text-gray-400 hover:text-[#004a7c] font-bold text-xs uppercase tracking-widest mb-3 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Login
          </button> 

          <div className="mb-10">
            <h3 className="text-3xl font-black text-[#1a2b3c] tracking-tight">
              Create Account
            </h3>
            <p className="text-gray-400 mt-2 font-medium">
              Lengkapi data di bawah untuk mendaftar sebagai Admin.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-sm p-4 rounded-2xl mb-6 flex items-center gap-3 animate-shake">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Input Full Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium text-gray-700"
                />
                <User
                  className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#004a7c] transition-colors"
                  size={20}
                />
              </div>
            </div>

            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium text-gray-700"
                />
                <Mail
                  className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#004a7c] transition-colors"
                  size={20}
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium text-gray-700"
                />
                <Lock
                  className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#004a7c] transition-colors"
                  size={20}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Button Register */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#004a7c] hover:bg-[#003559] text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 group disabled:bg-gray-300 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                <>
                  Register Admin Account
                  <UserPlus
                    size={18}
                    className="group-hover:rotate-12 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-400 font-medium text-sm">
              Sudah punya akun?{" "}
              <span
                className="text-[#004a7c] font-bold hover:underline cursor-pointer"
                onClick={() => router.push("/sign-in")}
              >
                Sign In Sekarang.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
