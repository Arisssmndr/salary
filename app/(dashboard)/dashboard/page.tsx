"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Database, 
  ChevronDown, 
  ChevronUp, 
  CalendarCheck, 
  Palmtree, 
  Banknote,
  Building2,
  Briefcase,
  Users,
  UserCog,
  Settings,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle2
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeMenu, setActiveMenu] = useState("Dashboard"); // State untuk judul dinamis
  const [isMasterOpen, setIsMasterOpen] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      router.push("/sign-in");
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/sign-in");
  };

  // Komponen Reusable untuk Card Info (Sesuai Foto)
  const InfoCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4 relative overflow-hidden group hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-gray-700`}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-gray-800 font-sans">

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">

        <div className="p-10">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name || "Admin"}!</h2>
            <p className="text-gray-400 mt-1 font-medium text-sm">Here&apos;s what&apos;s happening with your payroll system today.</p>
          </div>

          {/* Stats Grid (Identik Foto) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <InfoCard title="Total Karyawan" value="124" icon={Users} color="bg-blue-500" trend="+12%" />
            <InfoCard title="Divisi" value="8" icon={Building2} color="bg-purple-500" trend="Stable" />
            <InfoCard title="Payroll Bulan Ini" value="Rp 450M" icon={Banknote} color="bg-green-500" trend="+5%" />
            <InfoCard title="Pending Approval" value="12" icon={Clock} color="bg-orange-500" trend="-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <h3 className="font-bold text-gray-800">Recent Activities</h3>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                      <Settings size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 italic">Updated Divisi &quot;IT Support&quot;</p>
                      <p className="text-xs text-gray-400 font-medium">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Empty State / Next Reports */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 border-dashed flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="text-blue-500" />
              </div>
              <h3 className="font-bold text-gray-800">New Reports Coming Soon</h3>
              <p className="text-sm text-gray-400 mt-1 max-w-[200px]">We&apos;re building advanced analytics for your payroll.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}