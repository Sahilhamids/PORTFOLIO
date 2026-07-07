"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "sahil") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "#0a0a0f", color: "#fff" }}>
        <div className="w-full max-w-sm">
          <p className="text-[10px] tracking-widest uppercase font-mono mb-4 text-center" style={{ color: "#00d4ff" }}>
            🔒 Access Restricted
          </p>
          <h1 className="text-2xl font-black mb-8 tracking-tight text-center">Enter Password</h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border px-4 py-3 rounded text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              style={{ borderColor: error ? "#ef4444" : "#ffffff1a" }}
              placeholder="Enter password..."
              autoFocus
            />
            {error && <p className="text-xs text-red-500 text-center">Incorrect password.</p>}
            <button 
              type="submit"
              className="w-full py-3 rounded text-sm font-semibold transition-all hover:opacity-80"
              style={{ background: "#00d4ff", color: "#000" }}
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-xs font-mono text-zinc-500 hover:text-white transition-colors">
              ← Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Dashboard View
  const stats = [
    { label: "Total Views", value: "24,592", trend: "+12%" },
    { label: "Unique Visitors", value: "8,941", trend: "+5%" },
    { label: "Avg. Session", value: "2m 14s", trend: "-1%" },
    { label: "Bounce Rate", value: "32%", trend: "-4%" },
  ];

  return (
    <main className="min-h-screen p-6 md:p-12" style={{ background: "#0a0a0f", color: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-6" style={{ borderColor: "#ffffff1a" }}>
          <div>
            <p className="text-[10px] tracking-widest uppercase font-mono mb-2" style={{ color: "#00d4ff" }}>
              📊 Analytics
            </p>
            <h1 className="text-3xl font-black tracking-tight">Dashboard Overview</h1>
          </div>
          <Link href="/" className="text-xs font-mono px-4 py-2 rounded border hover:bg-white/5 transition-colors" style={{ borderColor: "#ffffff1a" }}>
            ← Exit Dashboard
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 rounded-xl border bg-black/20" style={{ borderColor: "#ffffff1a" }}>
              <p className="text-xs font-mono text-zinc-400 mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className={`text-xs font-medium ${stat.trend.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-xl border bg-black/20 min-h-[300px] flex flex-col justify-end" style={{ borderColor: "#ffffff1a" }}>
            <p className="text-zinc-500 text-sm mb-4">Traffic Chart (Mocked)</p>
            <div className="w-full flex items-end justify-between gap-2 h-40 opacity-70">
              {[40, 70, 45, 90, 65, 85, 120, 95, 110, 80, 130, 100].map((h, j) => (
                <div key={j} className="w-full rounded-t-sm transition-all hover:opacity-80 cursor-crosshair" style={{ height: `${h}px`, background: "linear-gradient(to top, rgba(0,212,255,0.1), rgba(0,212,255,1))" }} />
              ))}
            </div>
          </div>
          <div className="p-6 rounded-xl border bg-black/20" style={{ borderColor: "#ffffff1a" }}>
            <h3 className="text-sm font-semibold mb-6">Top Sources</h3>
            <ul className="space-y-6">
              {[
                { source: "Direct", percent: 45 },
                { source: "LinkedIn", percent: 30 },
                { source: "Twitter / X", percent: 15 },
                { source: "GitHub", percent: 10 },
              ].map((s, i) => (
                <li key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">{s.source}</span>
                    <span className="font-mono text-zinc-300">{s.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: `${s.percent}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </main>
  );
}
