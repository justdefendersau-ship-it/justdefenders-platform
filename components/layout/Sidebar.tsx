// =====================================================
// JustDefenders ©
// File: /components/layout/Sidebar.tsx
// Timestamp: 28 March 2026 10:22 (Sydney)
// Purpose: Restore correct sidebar labels + styling
// =====================================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Wrench,
  Fuel,
  Network,
} from "lucide-react";

export default function Sidebar() {
  const path = usePathname();

  const item = (href: string, label: string, Icon: any) => {
    const active = path === href;

    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
          active
            ? "bg-blue-600 text-white"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`}
      >
        <Icon size={16} />
        {label}
      </Link>
    );
  };

  return (
    <div className="h-full flex flex-col justify-between p-5">

      <div>
        <div className="text-lg font-semibold mb-6">
          JustDefenders ©
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          {item("/dashboard", "Dashboard", LayoutDashboard)}
          {item("/vehicles", "Vehicles", Car)}
          {item("/parts", "Parts", Wrench)}
          {item("/fuel", "Fuel", Fuel)}
          {item("/network", "Network", Network)}
        </nav>
      </div>

      <div className="text-xs text-gray-500">
        Command Center
      </div>

    </div>
  );
}