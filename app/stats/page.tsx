import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio Stats · Sahil Hamid Shaikh",
  description: "Behind the scenes — portfolio build stats.",
};

const stats = [
  { label: "Framework", value: "Next.js 15 (App Router)" },
  { label: "Language", value: "TypeScript" },
  { label: "Styling", value: "Tailwind CSS v4" },
  { label: "Animations", value: "Framer Motion" },
  { label: "OG Thumbnail", value: "Live screenshot via Microlink" },
  { label: "Analytics", value: "Vercel Analytics" },
  { label: "Contact Form", value: "Web3Forms" },
  { label: "Components", value: "17 custom components" },
  { label: "Deployed on", value: "Vercel" },
  { label: "LeetCode API", value: "alfa-leetcode-api (self-hosted)" },
  { label: "GitHub Calendar", value: "react-github-calendar" },
  { label: "Cursor", value: "Custom magnetic cursor" },
  { label: "Command palette", value: "⌘K / Ctrl+K" },
];

export default function StatsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20" style={{ background: "#0a0a0f", color: "#fff" }}>
      <div className="w-full max-w-xl">
        <p className="text-[10px] tracking-widest uppercase font-mono mb-4" style={{ color: "#00d4ff" }}>
          🥚 Easter Egg Unlocked
        </p>
        <h1 className="text-4xl font-black mb-2 tracking-tight">Portfolio <span style={{ color: "#00d4ff" }}>Stats</span></h1>
        <p className="text-sm mb-10" style={{ color: "#71717a" }}>
          You found it. Here's what's under the hood.
        </p>

        <div className="divide-y" style={{ borderTop: "1px solid #ffffff0f", borderBottom: "1px solid #ffffff0f" }}>
          {stats.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-3 gap-4">
              <span className="text-xs font-mono" style={{ color: "#71717a" }}>{label}</span>
              <span className="text-sm font-medium text-right" style={{ color: "#e4e4e7" }}>{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4">
          <Link href="/" className="text-xs font-mono px-4 py-2 rounded" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)", color: "#00d4ff" }}>
            ← Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
