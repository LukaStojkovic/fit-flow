import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [isMonted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <button
      className="flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all mt-auto"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {isMonted ? (
        theme === "dark" ? (
          <Sun size={20} />
        ) : (
          <Moon size={20} />
        )
      ) : (
        <Moon size={20} />
      )}
      <span className="text-sm font-medium">Theme</span>
    </button>
  );
}
