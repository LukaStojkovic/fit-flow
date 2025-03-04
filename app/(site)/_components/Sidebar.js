"use client";

import {
  Home,
  BarChart,
  Dumbbell,
  User,
  LogOut,
  Sun,
  Moon,
  Menu,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";

const menuItems = [
  { name: "Dashboard", icon: <Home size={20} />, path: "/" },
  { name: "Workouts", icon: <Dumbbell size={20} />, path: "/workouts" },
  { name: "Stats", icon: <BarChart size={20} />, path: "/stats" },
  { name: "Profile", icon: <User size={20} />, path: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 dark:bg-gray-800 bg-gray-200 text-black dark:text-white rounded-md"
      >
        <Menu size={24} />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm flex flex-col p-4 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 `}
      >
        <h1 className="text-xl font-semibold tracking-wide text-gray-900 dark:text-white mb-6">
          Fit Flow
        </h1>

        <nav className="flex flex-col space-y-2">
          {menuItems.map(({ name, icon, path }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={name}
                href={path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            );
          })}
        </nav>

        <ThemeToggleButton />

        <button
          className="flex items-center space-x-3 p-3 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg transition-all"
          onClick={() => signOut()}
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </aside>
    </>
  );
}
