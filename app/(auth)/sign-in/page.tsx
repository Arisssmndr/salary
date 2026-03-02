"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fungsi Login
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
        throw new Error(data.message || "Login gagal");
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
    <div className="relative min-h-screen bg-black w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-0746f37414a4/651c3041-d336-4039-8237-975c60216503/ID-en-20220502-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
          alt="background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      {/* Header Logo */}
      <nav className="relative z-10 px-8 py-6">
        <h1 className="text-red-600 text-4xl font-bold tracking-tighter">NETFLIX</h1>
      </nav>

      {/* Login Card */}
      <main className="relative z-10 flex justify-center items-center h-[80vh]">
        <div className="bg-black/75 p-16 rounded-md w-full max-w-[450px]">
          <h2 className="text-white text-3xl font-bold mb-8">Sign In</h2>
          
          {/* Tampilkan Error jika ada */}
          {error && (
            <div className="bg-[#e87c03] text-white text-[14px] p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Input Email */}
            <div className="relative group">
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-5 pt-6 pb-2 text-white bg-[#333] rounded border-none appearance-none focus:outline-none focus:ring-0 peer" 
                placeholder=" "
              />
              <label 
                htmlFor="email" 
                className="absolute text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Email or phone number
              </label>
            </div>

            {/* Input Password */}
            <div className="relative group">
              <input 
                type="password" 
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-5 pt-6 pb-2 text-white bg-[#333] rounded border-none appearance-none focus:outline-none focus:ring-0 peer" 
                placeholder=" " 
              />
              <label 
                htmlFor="password" 
                className="absolute text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Password
              </label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition disabled:bg-red-800 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="flex justify-between items-center text-gray-400 text-sm mt-2">
              <div className="flex items-center gap-1">
                <input type="checkbox" className="w-4 h-4 bg-gray-500 border-none" />
                <span>Remember me</span>
              </div>
              <a href="#" className="hover:underline">Need help?</a>
            </div>
          </form>

          <div className="mt-16">
            <p className="text-gray-500">
              New to Netflix? <span className="text-white hover:underline cursor-pointer" 
              onClick={() => router.push("/sign-up")}>Sign up now.</span>
            </p>
            <p className="text-gray-400 text-xs mt-4">
              This page is protected by Google reCAPTCHA...
              <span className="text-blue-600 hover:underline"> Learn more.</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}