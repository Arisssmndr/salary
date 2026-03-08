"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck,   ArrowLeft, } from "lucide-react";
import Image from "next/image";
// 

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Email atau password salah nih min.");
      }

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dekorasi Background agar senada dengan Dashboard */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]" />

      <div className="w-full max-w-[1100px] grid lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 overflow-hidden border border-white relative z-10">
        {/* SISI KIRI: BRANDING & VISUAL */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#004a7c] to-[#002a45] p-12 text-white">
          {/* LOGO SECTION - Pastikan dibungkus div dengan flex items-center */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 flex-shrink-0">
              <Image
                src="/crown-logo.jpg"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-black tracking-tighter leading-none text-white italic">
                INDO<span className="text-blue-400">PAY</span>
              </h2>
              <p className="text-[9px] font-bold text-blue-200/50 tracking-[0.2em] mt-1 uppercase">
                Payroll System
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight mb-6">
              Manage your <br />
              <span className="text-blue-300">workforce</span> efficiently.
            </h2>
            <p className="text-blue-100/70 text-lg font-medium leading-relaxed">
              Sistem Payroll & Management Karyawan terpadu untuk efektivitas
              bisnis yang maksimal.
            </p>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-sm font-medium text-blue-200/50">
              © 2026 NUSAPAY Payroll System. All rights reserved.
            </p>
          </div>
        </div>

        {/* SISI KANAN: FORM LOGIN */}
        <div className="p-12 lg:p-16 flex flex-col justify-center">

          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-[#004a7c] font-bold text-xs uppercase tracking-widest mb-3 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back
          </button> 

          <div className="mb-10">
            <h3 className="text-3xl font-black text-[#1a2b3c] tracking-tight">
              Welcome Back!
            </h3>
            <p className="text-gray-400 mt-2 font-medium">
              Silakan login untuk masuk ke dashboard Nusapay.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-sm p-4 rounded-2xl mb-6 flex items-center gap-3 animate-shake">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
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
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium"
                />
                <Mail
                  className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#004a7c] transition-colors"
                  size={20}
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[11px] font-bold text-[#004a7c] hover:underline uppercase tracking-widest"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium"
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

            {/* Button Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#004a7c] hover:bg-[#003559] text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 group disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <>
                  Sign In to Account
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-400 font-medium text-sm">
              Belum punya akun?{" "}
              <span
                className="text-[#004a7c] font-bold hover:underline cursor-pointer"
                onClick={() => router.push("/sign-up")}
              >
                Hubungi Admin Utama.
              </span>{" "}
              {/* <-- Pastikan ada tutup span ini min! */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
