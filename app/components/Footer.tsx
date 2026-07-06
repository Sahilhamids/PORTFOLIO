"use client";
import { useState, useEffect } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      setTimeStr(new Date().toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-10 px-6" style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <span className="font-bold tracking-widest text-sm text-[var(--text)]" style={{ letterSpacing: "0.2em" }}>
            SHS<span className="text-cyan-500">.</span>
          </span>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Designed &amp; built by <span style={{ color: "var(--cyan)" }}>Sahil Hamid Shaikh</span> · {year}
          </p>
          <div className="flex items-center gap-4 mt-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-[10px] font-semibold" style={{ color: "#00ff88" }}>Open to Work</span>
            </div>
            {timeStr && (
              <span className="text-[10px] font-mono tracking-wide" style={{ color: "var(--muted)" }}>
                {timeStr}
              </span>
            )}
          </div>
        </div>

        {/* Center: keyboard shortcut */}
        <div className="hidden md:flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded" style={{ color: "var(--muted)", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded-sm bg-white/10 border border-white/10 font-sans">⌘K</kbd>
          <span>or</span>
          <kbd className="px-1.5 py-0.5 rounded-sm bg-white/10 border border-white/10 font-sans">Ctrl+K</kbd>
          <span>to navigate</span>
        </div>

        {/* Right: social + easter egg */}
        <div className="flex items-center gap-4">
          {[
            { label: "GitHub", href: "https://github.com/Sahilhamids" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/sahil-h-shaikh/" },
            { label: "Email", href: "mailto:ssahil9635@gmail.com" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.label !== "Email" ? "_blank" : undefined}
              rel={l.label !== "Email" ? "noopener noreferrer" : undefined}
              className="text-xs hover:text-white transition-colors"
              style={{ color: "var(--muted)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/stats"
            className="text-[10px] px-2 py-0.5 rounded font-mono transition-colors hover:text-[var(--cyan)]"
            style={{ color: "var(--border)", border: "1px solid var(--border)" }}
            title="Easter egg 🥚"
          >
            /stats
          </a>
        </div>

      </div>
    </footer>
  );
}
