"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();
      setDashboardData(data);
      setIsAuthenticated(true);
    } catch (err) {
      setError(true);
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated || !dashboardData) {
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
              disabled={isLoading}
              className="w-full py-3 rounded text-sm font-semibold transition-all hover:opacity-80 disabled:opacity-50"
              style={{ background: "#00d4ff", color: "#000" }}
            >
              {isLoading ? "Unlocking..." : "Unlock Dashboard"}
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
  const isMock = dashboardData?.mockData;
  // Use real data if available, otherwise use provided stats/charts
  const stats = dashboardData?.stats || [
    { label: "Total Views", value: dashboardData?.data?.pageviews || "0", trend: "0%" },
    { label: "Unique Visitors", value: dashboardData?.data?.visitors || "0", trend: "0%" },
    { label: "Avg. Session", value: "N/A", trend: "0%" },
    { label: "Bounce Rate", value: "N/A", trend: "0%" },
  ];
  
  const chartData = dashboardData?.chartData || [40, 70, 45, 90, 65, 85, 120, 95, 110, 80, 130, 100];
  const topSources = dashboardData?.topSources || [];

  return (
    <main className="min-h-screen p-6 md:p-12" style={{ background: "#0a0a0f", color: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-6" style={{ borderColor: "#ffffff1a" }}>
          <div>
            <p className="text-[10px] tracking-widest uppercase font-mono mb-2" style={{ color: "#00d4ff" }}>
              📊 Analytics
            </p>
            <h1 className="text-3xl font-black tracking-tight">Dashboard Overview</h1>
            {isMock && (
              <p className="text-xs text-red-400 mt-1">
                ⚠️ Tokens missing: Showing mock data. Configure VERCEL_ACCESS_TOKEN and VERCEL_PROJECT_ID.
              </p>
            )}
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
            <p className="text-zinc-500 text-sm mb-4">Traffic Chart {isMock ? "(Mocked)" : ""}</p>
            <div className="w-full flex items-end justify-between gap-2 h-40 opacity-70">
              {chartData.map((h: number, j: number) => (
                <div key={j} className="w-full rounded-t-sm transition-all hover:opacity-80 cursor-crosshair" style={{ height: `${h}px`, background: "linear-gradient(to top, rgba(0,212,255,0.1), rgba(0,212,255,1))" }} />
              ))}
            </div>
          </div>
          <div className="p-6 rounded-xl border bg-black/20" style={{ borderColor: "#ffffff1a" }}>
            <h3 className="text-sm font-semibold mb-6">Top Sources</h3>
            <ul className="space-y-6">
              {topSources.length > 0 ? topSources.map((s: any, i: number) => (
                <li key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">{s.source}</span>
                    <span className="font-mono text-zinc-300">{s.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: `${s.percent}%` }} />
                  </div>
                </li>
              )) : (
                <li className="text-xs text-zinc-500">No source data available.</li>
              )}
            </ul>
          </div>
        </div>

      </div>
    </main>
  );
}
