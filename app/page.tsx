"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Zap,
  Users,
  BarChart3,
  ArrowRight,
  ChevronRight,
  Globe,
  Layout,
  Smartphone,
  Lock,
  MousePointer2,
  Sparkles,
  Star,
} from "lucide-react";

export default function PremiumLandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 overflow-x-hidden">
      {/* GLASSMORPHIC NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] transform group-hover:rotate-12 transition-transform duration-500">
              <Image
                src="/crown-logo.jpg"
                alt="Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter leading-none text-white italic">
                INDO<span className="text-blue-400">PAY</span>
              </h1>
              <span className="text-[8px] font-bold text-blue-400/60 tracking-[0.3em] uppercase">
                Enterprise
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-sm font-bold tracking-wide text-slate-400">
            {["Features", "Solutions", "Pricing", "Resources"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/sign-in"
              className="hidden sm:block text-sm font-bold text-slate-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="relative group overflow-hidden bg-blue-600 px-7 py-3 rounded-full text-sm font-black text-white transition-all hover:pr-10"
            >
              <span className="relative z-10">Get Access</span>
              <ChevronRight
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION WITH ANIMATED GRADIENT */}
      <section className="relative pt-44 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent -z-10" />

        <div className="max-w-7xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
            <Sparkles size={12} /> Powered by Next-Gen Infrastructure
          </div>

          <h2 className="text-6xl lg:text-8xl font-black leading-tight lg:leading-[1.15] tracking-tighter text-white pb-2 px-2">
            Payroll{" "}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 italic pr-4">
              Reimagined
            </span>
            <br /> for Modern Teams.
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-slate-400 font-medium leading-relaxed">
            Otomatisasi seluruh alur kerja penggajian, pajak, dan manajemen
            karyawan Anda dengan platform yang dirancang untuk presisi dan
            kecepatan tinggi.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
            <Link
              href="/sign-up"
              className="bg-white text-[#020617] px-10 py-5 rounded-2xl font-black text-lg shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:scale-105 transition-all"
            >
              Start Free Trial
            </Link>
            <button className="px-10 py-5 rounded-2xl font-black text-lg border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-3">
              Book a Demo <MousePointer2 size={20} />
            </button>
          </div>

          {/* DASHBOARD PREVIEW MOCKUP */}
          <div className="relative mt-24 max-w-5xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
            <div className="relative bg-[#0f172a] rounded-[2rem] border border-white/10 p-4 shadow-2xl overflow-hidden">
              <Image
                src="/dashboard-preview.jpg" // Ganti dengan screenshot dashboard INDOPAY kamu
                alt="Dashboard Preview"
                width={1200}
                height={800}
                className="rounded-xl border border-white/5 opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID FEATURES */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Feature 1 - Large Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 rounded-[3rem] relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <BarChart3 size={28} className="text-white" />
                </div>
                <h3 className="text-4xl font-black text-white leading-tight">
                  Analitik Real-time <br /> Tanpa Batas.
                </h3>
                <p className="text-blue-100/70 max-w-md font-medium">
                  Pantau pengeluaran gaji dan tren SDM Anda melalui grafik
                  interaktif yang diperbarui setiap detik.
                </p>
              </div>
              <div className="absolute right-[-10%] bottom-[-10%] opacity-20 group-hover:scale-110 transition-transform duration-700">
                <BarChart3 size={400} />
              </div>
            </div>

            {/* Feature 2 - Small Card */}
            <div className="bg-[#0f172a] p-12 rounded-[3rem] border border-white/5 hover:border-blue-500/50 transition-all group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Lock size={28} />
              </div>
              <h4 className="text-2xl font-black text-white mb-4">
                Security First
              </h4>
              <p className="text-slate-500 font-medium">
                Enkripsi AES-256 untuk semua data pribadi dan dokumen keuangan
                perusahaan.
              </p>
            </div>

            {/* Feature 3 - Small Card */}
            <div className="bg-[#0f172a] p-12 rounded-[3rem] border border-white/5 hover:border-blue-500/50 transition-all group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Smartphone size={28} />
              </div>
              <h4 className="text-2xl font-black text-white mb-4">
                Mobile Ready
              </h4>
              <p className="text-slate-500 font-medium">
                Kelola persetujuan cuti dan gaji langsung dari smartphone Anda.
              </p>
            </div>

            {/* Feature 4 - Medium Card */}
            <div className="lg:col-span-2 bg-[#1e293b] p-12 rounded-[3rem] border border-white/5 relative group overflow-hidden">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="space-y-6 flex-1">
                  <h3 className="text-3xl font-black text-white">
                    Integrasi Global.
                  </h3>
                  <p className="text-slate-400 font-medium">
                    Terhubung dengan bank-bank besar di Indonesia dan sistem
                    PPOB secara otomatis.
                  </p>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs font-bold uppercase">
                      Midtrans
                    </div>
                    <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs font-bold uppercase">
                      Digiflazz
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <Globe
                    size={200}
                    className="text-blue-500/20 animate-spin-slow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 border-t border-white/5 bg-[#020617]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Image
                  src="/crown-logo.jpg"
                  alt="Logo"
                  width={18}
                  height={18}
                  className="object-contain"
                />
              </div>
              <h2 className="text-lg font-black italic text-white">
                INDO<span className="text-blue-400">PAY</span>
              </h2>
            </div>
            <p className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase">
              The Art of Modern Payroll System
            </p>
          </div>

          <div className="flex gap-10 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              API Docs
            </a>
          </div>

          <p className="text-slate-600 text-[10px] font-black uppercase">
            © 2026 NUSAPAY ENTERPRISE GROUP.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
