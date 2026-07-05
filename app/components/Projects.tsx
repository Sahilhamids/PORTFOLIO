"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";
import { track } from "@vercel/analytics";

interface Project {
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  features?: string[];
  stack: string[];
  links: { github: string; live?: string };
  accent: string;
  badge: string | null;
  category: string;
  image?: string;
}

const projects: Project[] = [
  {
    name: "SafarHisab",
    tagline: "Travel expense & debt-settlement engine",
    description:
      "REST API for group travel expense tracking with a Max-Heap settlement algorithm that minimises total peer-to-peer transactions by 40%+. Built with FastAPI, SQLAlchemy ORM, Alembic migrations, JWT role-based auth, real-time multi-currency conversion via Frankfurter API, and an event-driven notification service.",
    longDescription: 
      "SafarHisab solves the classic group travel problem of 'who owes whom' by implementing a sophisticated max-heap algorithm. Instead of O(N^2) transactions, it optimizes settlements down to the bare minimum required to clear all debts. The API handles real-time currency conversion, ensuring international trips are accounted for seamlessly.",
    features: [
      "Max-Heap algorithm for optimal O(N) debt settlement.",
      "JWT-based role authentication for group admins.",
      "Real-time currency conversion via Frankfurter API.",
      "Alembic database migrations on PostgreSQL."
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "JWT", "Pydantic"],
    links: {
      live: "https://safar-hisab-v1.vercel.app/",
      github: "https://github.com/Sahilhamids/SafarHisab-v1",
    },
    image: "/images/projects/safarhisab-architecture.png",
    accent: "var(--purple)",
    badge: "LIVE",
    category: "Backend / Finance",
  },
  {
    name: "Career Intelligence Platform",
    tagline: "AI-powered resume SaaS — live on Render",
    description:
      "Backend-heavy SaaS that parses resumes against job descriptions using Google Gemini AI with a Groq/Llama-3.1 fallback. Architected a dual-LLM routing layer, JWT anonymous sessions, rate limiting, PDF/DOCX generation, AI cover letter creation, and a Kanban job tracker — all served from a single FastAPI + Postgres deployment on Render.",
    longDescription: 
      "Designed for high reliability, this platform ensures 99.9% uptime for AI generations by dynamically routing requests from Google Gemini to Groq if latency thresholds are exceeded. It generates bespoke cover letters and ATS-optimized resume PDFs on the fly.",
    features: [
      "Dual-LLM failover routing layer (Gemini -> Groq).",
      "Dynamic PDF/DOCX resume generation and export.",
      "Anonymous JWT sessions that can be linked to accounts later.",
      "Built-in Kanban board for job application tracking."
    ],
    stack: ["Python", "FastAPI", "Gemini AI", "Groq API", "PostgreSQL", "SQLAlchemy", "JWT"],
    links: {
      live: "https://ai-resume-tailor-v2.onrender.com",
      github: "https://github.com/Sahilhamids/ai-resume-tailor-v2",
    },
    image: "/images/projects/career-intelligence-architecture.png",
    accent: "var(--cyan)",
    badge: "LIVE",
    category: "Backend / AI",
  },
  {
    name: "Smart Automated Fertigation System",
    tagline: "Final-year capstone — Ranked 1st out of 6 teams",
    description:
      "Embedded C firmware on ESP32 for automated NPK fertilizer dosing. Sensor-driven rule-based logic reads soil data from NPK sensors and triggers valve relays in real time. Integrated IoT remote monitoring, Modbus communication, I2C sensor bus, and simulated the full circuit in Proteus Professional. Led a 5-member team.",
    longDescription: 
      "This capstone project won 1st place for its practical application in smart agriculture. By reading analog signals from NPK soil sensors, the ESP32 calculates precise fertilizer dosing requirements and triggers industrial relays over Modbus to automate watering and feeding cycles without human intervention.",
    features: [
      "ESP32 firmware written in C.",
      "I2C and Modbus protocol implementations.",
      "Sensor-driven automated relay control.",
      "Circuit validated heavily in Proteus Simulation."
    ],
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
    longDescription: 
      "A pure hardware and firmware play designed to protect expensive industrial motors. The circuit detects voltage drops on any single phase (single-phasing) and instantly triggers an emergency cut-off relay to prevent winding burnout.",
    features: [
      "Custom phase detection circuitry.",
      "Arduino-based switching logic.",
      "Extensive Proteus simulations for edge cases."
    ],
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
    longDescription: 
      "A legacy but robust project that uses GSM cellular networks to control home appliances. By parsing incoming SMS commands, the Arduino microcontroller toggles high-voltage relays. Perfect for remote areas without reliable WiFi.",
    features: [
      "SMS parsing engine built in C.",
      "Hardware relay control.",
      "AT Command set integration for GSM modules."
    ],
    stack: ["C", "Arduino", "GSM"],
    links: {
      github: "https://github.com/Sahilhamids",
    },
    accent: "var(--green)",
    badge: null,
    category: "Embedded",
  },
];

const badgeColors: Record<string, { bg: string; color: string }> = {
  LIVE:          { bg: "rgba(0,255,136,0.1)",   color: "var(--green)" },
  "IN PROGRESS": { bg: "rgba(168,85,247,0.1)",  color: "var(--purple)" },
  CAPSTONE:      { bg: "rgba(0,212,255,0.1)",   color: "var(--cyan)" },
  LEARNING:      { bg: "rgba(100,116,139,0.15)", color: "var(--muted)" },
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    if (selected) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selected]);

  return (
    <>
      <section id="projects" className="py-28 grid-bg brutal-border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="section-label mb-3">What I&apos;ve Built</p>
            <h2 className="section-title">
              Selected <span style={{ color: "var(--cyan)" }}>Projects</span>
            </h2>
          </div>

          <div className="space-y-5">
            {projects.map((p: Project, i: number) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.005 }}
                key={p.name}
                onClick={() => setSelected(p)}
                className="group card-glow brutal-border relative overflow-hidden backdrop-blur-md transition-all hover-lift cursor-pointer"
                style={{ background: "rgba(10, 10, 15, 0.7)" }}
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

                    <h3 className="text-xl font-bold text-[var(--text)] mb-0.5 group-hover:text-white transition-colors">{p.name}</h3>
                    <p className="text-sm mb-3" style={{ color: p.accent }}>{p.tagline}</p>

                    <p className="text-[var(--text)] opacity-80 text-sm mb-5 leading-relaxed line-clamp-2 md:line-clamp-none">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.stack.map((t) => (
                        <span key={t} className="tag" style={{ borderColor: `${p.accent}33`, color: p.accent }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ── image side (only rendered when image is set) ── */}
                  {"image" in p && p.image && (
                    <div
                      className="flex items-center justify-center flex-shrink-0 w-full md:w-[340px] border-t md:border-t-0 md:border-l border-[var(--border)]"
                      style={{ background: "rgba(0,0,0,0.3)" }}
                    >
                      <div className="relative w-full h-full min-h-[200px] md:min-h-full">
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
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="https://github.com/Sahilhamids" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              See all on GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* Deep Dive Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--surface)] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl brutal-border shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 bg-[var(--bg)] border border-[var(--border)] rounded-full hover:border-[var(--cyan)] text-white hover:text-[var(--cyan)] transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-5 pt-16 md:p-12">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    {selected.badge && (
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded"
                        style={{ background: badgeColors[selected.badge]?.bg, color: badgeColors[selected.badge]?.color, border: `1px solid ${badgeColors[selected.badge]?.color}44` }}
                      >
                        {selected.badge}
                      </span>
                    )}
                    <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "var(--muted)", border: "1px solid var(--border)" }}>
                      {selected.category}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-3">{selected.name}</h2>
                  <p className="text-lg md:text-xl" style={{ color: selected.accent }}>{selected.tagline}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h3 className="text-lg font-bold mb-3 text-white border-b border-[var(--border)] pb-2">Overview</h3>
                      <p className="text-[var(--muted)] leading-relaxed text-sm md:text-base">
                        {selected.longDescription || selected.description}
                      </p>
                    </div>

                    {selected.features && (
                      <div>
                        <h3 className="text-lg font-bold mb-3 text-white border-b border-[var(--border)] pb-2">Key Features</h3>
                        <ul className="space-y-2">
                          {selected.features.map((feature, idx) => (
                            <li key={idx} className="flex gap-2 text-[var(--muted)] text-sm md:text-base leading-relaxed">
                              <span style={{ color: selected.accent }}>▹</span> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="p-6 bg-[var(--bg)] border border-[var(--border)] rounded-lg flex items-center justify-center min-h-[200px]">
                      <p className="text-sm font-mono text-[var(--muted)] uppercase tracking-widest text-center">
                        [Architecture Diagram Placeholder]<br />
                        <span className="text-xs lowercase opacity-60 mt-2 block">Replace with actual image in the future</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-bold mb-3 text-white border-b border-[var(--border)] pb-2">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {selected.stack.map((t) => (
                          <span key={t} className="tag" style={{ borderColor: `${selected.accent}33`, color: selected.accent }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-3 text-white border-b border-[var(--border)] pb-2">Links</h3>
                      <div className="flex flex-col gap-3">
                        {"live" in selected.links && selected.links.live && (
                          <MagneticButton className="w-full">
                            <a href={selected.links.live as string} target="_blank" rel="noopener noreferrer" onClick={() => track("Visit Live Site", { project: selected.name })} className="btn-primary text-sm w-full justify-center" style={{ background: `${selected.accent}15`, borderColor: selected.accent, color: selected.accent }}>
                              Visit Live Site <ArrowUpRight className="w-4 h-4" />
                            </a>
                          </MagneticButton>
                        )}
                        <MagneticButton className="w-full">
                          <a href={selected.links.github} target="_blank" rel="noopener noreferrer" onClick={() => track("View Source", { project: selected.name })} className="group flex items-center justify-center gap-2 py-3 rounded text-sm font-bold uppercase tracking-wider text-white bg-[var(--bg)] border border-[var(--border)] hover:border-white transition-all">
                            View Source <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
