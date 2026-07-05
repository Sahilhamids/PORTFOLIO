"use client";
import { useState, useEffect } from "react";

const themes = [
  {
    id: "dark-cyan",
    label: "Cyan",
    vars: {
      "--bg": "#0a0a0f", "--surface": "#111118", "--border": "#1e1e2e",
      "--cyan": "#00d4ff", "--purple": "#a855f7", "--green": "#00ff88",
      "--text": "#e2e8f0", "--muted": "#64748b",
      "--cursor-color": "#00d4ff", "--cursor-glow": "rgba(0,212,255,0.06)",
    },
  },
  {
    id: "dark-purple",
    label: "Purple",
    vars: {
      "--bg": "#0c0a14", "--surface": "#13111e", "--border": "#221e33",
      "--cyan": "#c084fc", "--purple": "#818cf8", "--green": "#34d399",
      "--text": "#e2e8f0", "--muted": "#64748b",
      "--cursor-color": "#c084fc", "--cursor-glow": "rgba(192,132,252,0.06)",
    },
  },
  {
    id: "dark-green",
    label: "Green",
    vars: {
      "--bg": "#070f0a", "--surface": "#0d1610", "--border": "#162414",
      "--cyan": "#00ff88", "--purple": "#00d4ff", "--green": "#fbbf24",
      "--text": "#e2e8f0", "--muted": "#64748b",
      "--cursor-color": "#00ff88", "--cursor-glow": "rgba(0,255,136,0.06)",
    },
  },
  {
    id: "light",
    label: "Light",
    vars: {
      "--bg": "#f8fafc", "--surface": "#ffffff", "--border": "#e2e8f0",
      "--cyan": "#0891b2", "--purple": "#7c3aed", "--green": "#059669",
      "--text": "#0f172a", "--muted": "#94a3b8",
      "--cursor-color": "#0891b2", "--cursor-glow": "rgba(8,145,178,0.06)",
    },
  },
];

export default function ThemeToggle() {
  const [active, setActive] = useState("dark-cyan");
  const [open, setOpen] = useState(false);
  const [autoMode, setAutoMode] = useState(true);

  const applyTheme = (id: string, isManual = false) => {
    const theme = themes.find(t => t.id === id);
    if (!theme) return;
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.setAttribute("data-theme", id);
    setActive(id);
    localStorage.setItem("portfolio-theme", id);
    setOpen(false);
    
    if (isManual) {
      setAutoMode(false);
      localStorage.setItem("portfolio-theme-auto", "false");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") ?? "dark-cyan";
    const savedAuto = localStorage.getItem("portfolio-theme-auto");
    if (savedAuto === "false") {
      setAutoMode(false);
    }
    applyTheme(saved, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Automatic Color Cycling
  useEffect(() => {
    if (!autoMode) return;
    
    const darkThemes = themes.filter(t => t.id.startsWith("dark-"));
    const interval = setInterval(() => {
      setActive(prevActive => {
        const currentIndex = darkThemes.findIndex(t => t.id === prevActive);
        // If current is light theme, switch to first dark theme
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % darkThemes.length;
        const nextTheme = darkThemes[nextIndex];
        
        const root = document.documentElement;
        Object.entries(nextTheme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
        root.setAttribute("data-theme", nextTheme.id);
        localStorage.setItem("portfolio-theme", nextTheme.id);
        
        return nextTheme.id;
      });
    }, 6000); // Shift colors every 6 seconds
    
    return () => clearInterval(interval);
  }, [autoMode]);

  const current = themes.find(t => t.id === active)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-all"
        style={{
          border: "1px solid var(--border)",
          color: "var(--muted)",
          background: "transparent",
        }}
        aria-label="Change theme"
      >
        <span
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ background: current.vars["--cyan"] }}
        />
        {current.label} {autoMode && <span className="text-[10px] ml-1 opacity-60">(Auto)</span>}
        <span style={{ fontSize: "0.6rem" }}>▼</span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 rounded-lg overflow-hidden z-50"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", minWidth: 130 }}
        >
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => applyTheme(t.id, true)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs transition-colors text-left"
              style={{
                color: active === t.id ? "var(--cyan)" : "var(--muted)",
                background: active === t.id ? "rgba(255,255,255,0.04)" : "transparent",
              }}
            >
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: t.vars["--cyan"] }} />
              {t.label}
              {active === t.id && <span className="ml-auto" style={{ color: "var(--cyan)" }}>✓</span>}
            </button>
          ))}
          <button
            onClick={() => {
              setAutoMode(true);
              localStorage.setItem("portfolio-theme-auto", "true");
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs transition-colors text-left border-t border-[var(--border)]"
            style={{
              color: autoMode ? "var(--cyan)" : "var(--muted)",
              background: autoMode ? "rgba(255,255,255,0.04)" : "transparent",
            }}
          >
            <span className="w-3 h-3 rounded-full flex-shrink-0 flex items-center justify-center border border-[var(--cyan)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse" />
            </span>
            Auto Rotate
            {autoMode && <span className="ml-auto" style={{ color: "var(--cyan)" }}>✓</span>}
          </button>
        </div>
      )}
    </div>
  );
}
