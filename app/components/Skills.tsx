"use client";
import { useRef, useEffect, useState } from "react";
import LiveLeetcodeCount from "./LiveLeetcodeCount";

const categories = [
  {
    label: "Languages",
    color: "var(--cyan)",
    skills: [
      { name: "Python", level: 85, note: "DSA, FastAPI, scripting" },
      { name: "C", level: 80, note: "Embedded firmware, microcontrollers" },
      { name: "SQL / PL/SQL", level: 70, note: "SQLite, Oracle, plant DB queries" },
      { name: "Groovy", level: 55, note: "SAP workflow scripts" },
    ],
  },
  {
    label: "Backend & APIs",
    color: "var(--purple)",
    skills: [
      { name: "FastAPI", level: 75, note: "2 production-grade projects" },
      { name: "REST API Design", level: 72, note: "Auth, CRUD, validation" },
      { name: "SQLAlchemy / Alembic", level: 68, note: "ORM & migrations" },
      { name: "LLM API (Gemini, Groq)", level: 72, note: "Dual-fallback integration" },
      { name: "JWT Authentication", level: 70, note: "Anonymous + linked sessions" },
    ],
  },
  {
    label: "Tools & Concepts",
    color: "var(--green)",
    skills: [
      { name: "DSA", level: 78, note: <><LiveLeetcodeCount fallback="140" />+ LeetCode problems</> },
      { name: "OOP", level: 72, note: "Coursework + project design" },
      { name: "Git / GitHub", level: 65, note: "Version control, daily use" },
      { name: "Linux", level: 50, note: "File ops, navigation" },
    ],
  },
];

const aiTools = [
  { name: "Claude Code", desc: "Agentic coding, test generation, project-wide edits" },
  { name: "Google Antigravity IDE", desc: "Multi-agent orchestration, end-to-end task delegation" },
  { name: "Gemini Agent", desc: "Code planning, context-aware suggestions" },
];

function AnimatedBar({ level, color }: { level: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(level); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="h-0.5 rounded" style={{ background: "var(--border)" }}>
      <div
        className="h-0.5 rounded"
        style={{
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          transition: "width 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-28" style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="section-label mb-3">What I Know</p>
          <h2 className="section-title">
            Tech <span style={{ color: "var(--cyan)" }}>Stack</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.label} className="card-glow rounded-lg p-6" style={{ background: "var(--bg)" }}>
              <h3 className="font-semibold text-sm tracking-widest uppercase mb-6" style={{ color: cat.color }}>
                {cat.label}
              </h3>
              <div className="space-y-5">
                {cat.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white">{s.name}</span>
                      <span className="text-xs" style={{ color: cat.color }}>{s.level}%</span>
                    </div>
                    <p className="text-xs mb-1.5" style={{ color: "var(--muted)" }}>{s.note}</p>
                    <AnimatedBar level={s.level} color={cat.color} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI Tools differentiator */}
        <div className="mt-12 card-glow rounded-lg p-6" style={{ background: "var(--bg)" }}>
          <div className="flex items-center gap-3 mb-6">
            <span style={{ color: "var(--cyan)", fontSize: "1.2rem" }}>⚡</span>
            <h3 className="font-semibold text-sm tracking-widest uppercase" style={{ color: "var(--cyan)" }}>
              AI-Augmented Development
            </h3>
          </div>
          <p className="text-sm mb-6 max-w-2xl" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            I use agentic AI tools not just to write code, but to generate test cases, review edge cases,
            plan architecture, and ship faster — while I stay in control of design decisions.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {aiTools.map((t) => (
              <div key={t.name} className="p-4 rounded" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <p className="text-sm font-semibold text-white mb-1">{t.name}</p>
                <p className="text-xs" style={{ color: "var(--muted)", lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Familiar with */}
        <div className="mt-8">
          <p className="text-xs tracking-widest text-center mb-4" style={{ color: "var(--muted)" }}>ALSO FAMILIAR WITH</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["C (Embedded)", "Proteus", "ESP32", "Arduino", "AWS Lambda", "AWS S3", "Pydantic", "OOP", "Linux CLI"].map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
