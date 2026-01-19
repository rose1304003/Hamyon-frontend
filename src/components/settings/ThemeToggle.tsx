import { useState, useEffect } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

const THEME_KEY = "hamyon_theme";

export function ThemeToggle() {
  const { t } = useLanguage();
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_KEY);
    return (stored as Theme) || "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
    
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(e.matches ? "dark" : "light");
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const themes: { value: Theme; icon: typeof Sun; labelKey: string }[] = [
    { value: "light", icon: Sun, labelKey: "settings.lightMode" },
    { value: "dark", icon: Moon, labelKey: "settings.darkMode" },
    { value: "system", icon: Laptop, labelKey: "settings.systemMode" },
  ];

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {themes.map((item) => {
        const Icon = item.icon;
        const isActive = theme === item.value;
        
        return (
          <button
            key={item.value}
            onClick={() => setTheme(item.value)}
            className={cn(
              "w-full flex items-center justify-between p-4 border-b border-white/10 last:border-b-0 transition-colors",
              isActive && "bg-white/5"
            )}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-white/60" />
              <span className="font-medium text-white">{t(item.labelKey)}</span>
            </div>
            {isActive && <div className="w-2 h-2 rounded-full bg-amber-400" />}
          </button>
        );
      })}
    </div>
  );
}
