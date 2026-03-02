"use client";

import { usePathname } from "next/navigation";

interface NavbarProps {
  user?: {
    name?: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  const title =
    pathname.split("/")[1]?.charAt(0).toUpperCase() +
    pathname.split("/")[1]?.slice(1);

  return (
    <header className="bg-white px-10 py-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-40">
      <h2 className="text-xl font-bold text-[#004d73]">
        {title || "Dashboard"}
      </h2>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-bold text-gray-800">
            {user?.name || "Administrator"}
          </p>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
            Payroll Management
          </p>
        </div>

        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-[#004d73] border border-gray-200">
          {user?.name?.charAt(0) || "A"}
        </div>
      </div>
    </header>
  );
}