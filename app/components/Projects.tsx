"use client";
// To add a screenshot: drop an image in public/images/projects/ and add image: "/images/projects/filename.png" to the project entry
const projects = [
  {
    name: "SafarHisab",
    tagline: "Travel expense & debt-settlement engine",
    description:
      "REST API for group travel expense tracking with a Max-Heap settlement algorithm that minimises total peer-to-peer transactions by 40%+. Built with FastAPI, SQLAlchemy ORM, Alembic migrations, JWT role-based auth, real-time multi-currency conversion via Frankfurter API, and an event-driven notification service.",
    stack: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "JWT", "Pydantic"],
    links: {
      live: "https://safar-hisab-v1.vercel.app/",
      github: "https://github.com/Sahilhamids/SafarHisab-v1",
    },
    accent: "var(--purple)",
    badge: "LIVE",
    category: "Backend / Finance",
  },
  {
    name: "Career Intelligence Platform",
    tagline: "AI-powered resume SaaS — live on Render",
    description:
      "Backend-heavy SaaS that parses resumes against job descriptions using Google Gemini AI with a Groq/Llama-3.1 fallback. Architected a dual-LLM routing layer, JWT anonymous sessions, rate limiting, PDF/DOCX generation, AI cover letter creation, and a Kanban job tracker — all served from a single FastAPI + Postgres deployment on Render.",
    stack: ["Python", "FastAPI", "Gemini AI", "Groq API", "PostgreSQL", "SQLAlchemy", "JWT"],
    links: {
      live: "https://ai-resume-tailor-v2.onrender.com",
      github: "https://github.com/Sahilhamids/ai-resume-tailor-v2",
    },
    accent: "var(--cyan)",
    badge: "LIVE",
    category: "Backend / AI",
  },
  {
    name: "Smart Automated Fertigation System",
    tagline: "Final-year capstone — Ranked 1st out of 6 teams",
    description:
      "Embedded C firmware on ESP32 for automated NPK fertilizer dosing. Sensor-driven rule-based logic reads soil data from NPK sensors and triggers valve relays in real time. Integrated IoT remote monitoring, Modbus communication, I2C sensor bus, and simulated the full circuit in Proteus Professional. Led a 5-member team.",
    stack: ["C", "ESP32", "Proteus", "Modbus", "I2C", "IoT", "Arduino"],
    links: {
      github: "https://github.com/Sahilhamids",
    },
    accent: "var(--green)",
    badge: "CAPSTONE",
    category: "Embedded / IoT",
  },
  {
    name: "Phase Switching Protection Circuit",
    tagline: "Academic hardware project",
    description:
      "Designed and tested a protection circuit for single-phase and three-phase motors that detects single-phasing conditions and triggers a relay to disconnect the motor before winding damage occurs. Full circuit designed and simulated in Proteus Professional, Arduino used for switching logic.",
    stack: ["C", "Arduino", "Proteus", "Circuit Design"],
    links: {
      github: "https://github.com/Sahilhamids",
    },
    accent: "var(--cyan)",
    badge: null,
    category: "Embedded / Hardware",
  },
  {
    name: "GSM-Based Home Automation",
    tagline: "Academic embedded project",
    description:
      "Remote appliance control system using GSM communication. Built command-based switching logic in C on Arduino to parse incoming SMS commands and toggle relays for connected appliances reliably.",
    stack: ["C", "Arduino", "GSM"],
    links: {
      github: "https://github.com/Sahilhamids",
    },
    accent: "var(--green)",
    badge: null,
    category: "Embedded",
  },
];

import Image from "next/image";

const badgeColors: Record<string, { bg: string; color: string }> = {
  LIVE:          { bg: "rgba(0,255,136,0.1)",   color: "var(--green)" },
  "IN PROGRESS": { bg: "rgba(168,85,247,0.1)",  color: "var(--purple)" },
  CAPSTONE:      { bg: "rgba(0,212,255,0.1)",   color: "var(--cyan)" },
  LEARNING:      { bg: "rgba(100,116,139,0.15)", color: "var(--muted)" },
};

export default function Projects() {
  return (
    <section id="projects" className="py-28 grid-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="section-label mb-3">What I&apos;ve Built</p>
          <h2 className="section-title">
            Selected <span style={{ color: "var(--cyan)" }}>Projects</span>
          </h2>
        </div>

        <div className="space-y-5">
          {projects.map((p, i) => (
            <div
              key={p.name}
              className="card-glow rounded-lg relative overflow-hidden"
              style={{ background: "var(--surface)" }}
            >
              {/* accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: p.accent }} />

              <div className="flex flex-col md:flex-row">
                {/* ── text side ── */}
                <div className="flex-1 p-6 md:p-8 pl-8">
                  {/* badges + number */}
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {p.badge && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded"
                        style={{ background: badgeColors[p.badge]?.bg, color: badgeColors[p.badge]?.color, border: `1px solid ${badgeColors[p.badge]?.color}44` }}
                      >
                        {p.badge}
                      </span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "var(--muted)", border: "1px solid var(--border)" }}>
                      {p.category}
                    </span>
                    <span className="text-xs" style={{ color: "var(--border)" }}>0{i + 1}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-0.5">{p.name}</h3>
                  <p className="text-sm mb-3" style={{ color: p.accent }}>{p.tagline}</p>

                  <p className="mb-4" style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "0.875rem" }}>
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.stack.map((t) => (
                      <span key={t} className="tag" style={{ borderColor: `${p.accent}33`, color: p.accent }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {"live" in p.links && p.links.live && (
                      <a href={p.links.live as string} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs">
                        Live ↗
                      </a>
                    )}
                    <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs">
                      GitHub
                    </a>
                  </div>
                </div>

                {/* ── image side (only rendered when image is set) ── */}
                {"image" in p && p.image && (
                  <div
                    className="hidden md:flex items-center justify-center flex-shrink-0"
                    style={{ width: 340, borderLeft: "1px solid var(--border)", background: "rgba(0,0,0,0.3)" }}
                  >
                    <div className="relative w-full h-full" style={{ minHeight: 200 }}>
                      <Image
                        src={p.image as string}
                        alt={`${p.name} screenshot`}
                        fill
                        className="object-cover"
                        style={{ opacity: 0.9 }}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="https://github.com/Sahilhamids" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            See all on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
