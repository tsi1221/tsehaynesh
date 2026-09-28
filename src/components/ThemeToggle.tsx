import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "light"
          ? "Switch to dark mode"
          : "Switch to light mode"
      }
      title={
        theme === "light"
          ? "Switch to dark mode"
          : "Switch to light mode"
      }
      className="flex h-10 w-10 items-center justify-center rounded-full border transition-all"
      style={{
        borderColor: "var(--border)",
        color: "var(--foreground)",
        background: "transparent",
      }}
    >
      {theme === "light" ? (
        <Moon size={18} strokeWidth={1.8} />
      ) : (
        <Sun size={18} strokeWidth={1.8} />
      )}
    </button>
  );
}