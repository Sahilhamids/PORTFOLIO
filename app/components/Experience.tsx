"use client";

// Drop logos in public/images/experience/ and public/images/education/
// Recommended: square PNG with transparent background, ~80×80px
const workExp = [
  {
    title: "Assistant Manager — Automation & Instrumentation",
    org: "Ambuja Cements Ltd. (Adani Group)",
    logo: "/images/experience/ambuja.png",
    period: "Apr 2026 – May 2026",
    accent: "var(--cyan)",
    bullets: [
      "Developed automation workflows in SAP Advanced Workflow for SAP Incentive Management — wrote Groovy scripts to handle manual payment dispute resolution and custom approval routing.",
      "Led centralized HMI upgrade for a 16-spout packing machine, converting distributed architecture to a single control system — achieved ~30% reduction in machine downtime.",
      "Worked with ABB Distributed Control System (DCS) for signal monitoring and fault diagnostics.",
    ],
  },
  {
    title: "Graduate Engineer Trainee — Automation & Instrumentation",
    org: "Ambuja Cements Ltd. (Adani Group)",
    logo: "/images/experience/ambuja.png",
    period: "Jul 2025 – Mar 2026",
    accent: "var(--purple)",
    bullets: [
      "Performed logic simulation in CodeSys, executed equipment wiring, and troubleshot industrial sensors.",
      "Structured PL/SQL queries to extract historical process parameters from plant Oracle databases for shift-wise efficiency reporting.",
      "Conducted sequence of operation studies for the Truck Tippler project.",
    ],
  },
];

const certifications = [
  { name: "Python (Basic)", issuer: "HackerRank" },
  { name: "Problem Solving in Python", issuer: "HackerRank" },
  { name: "Embedded Systems", issuer: "Internshala" },
  { name: "Industrial Automation Bootcamp", issuer: "Udemy" },
];

import Image from "next/image";

export default function Experience() {
  return (
    <section id="experience" className="py-28 grid-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="section-label mb-3">Background</p>
          <h2 className="section-title">
            Experience &amp; <span style={{ color: "var(--cyan)" }}>Education</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Work timeline */}
          <div className="md:col-span-2">
            <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "var(--muted)" }}>Work Experience</p>
            <div className="space-y-6">
              {workExp.map((e, i) => (
                <div key={i} className="relative pl-6" style={{ borderLeft: "1px solid var(--border)" }}>
                  <div
                    className="absolute left-0 -translate-x-1/2 w-2.5 h-2.5 rounded-full top-1.5"
                    style={{ background: e.accent, boxShadow: `0 0 8px ${e.accent}` }}
                  />
                  <div className="card-glow rounded-lg p-5" style={{ background: "var(--surface)" }}>
                    <div className="flex items-start gap-3 mb-1">
                      {e.logo && (
                        <div className="flex-shrink-0 w-10 h-10 rounded overflow-hidden" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)" }}>
                          <Image src={e.logo} alt={e.org} width={40} height={40} className="w-full h-full object-contain p-1"
                            onError={(ev) => { (ev.currentTarget as HTMLImageElement).style.display = "none"; }} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="font-semibold text-white text-sm">{e.title}</h3>
                          <span className="text-xs font-mono flex-shrink-0" style={{ color: e.accent }}>{e.period}</span>
                        </div>
                        <p className="text-xs" style={{ color: "var(--muted)" }}>{e.org}</p>
                      </div>
                    </div>
                    <div className="mb-3" />
                    <ul className="space-y-2">
                      {e.bullets.map((b, j) => (
                        <li key={j} className="text-sm flex gap-2" style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                          <span style={{ color: e.accent, flexShrink: 0 }}>▹</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education + Certs sidebar */}
          <div className="space-y-5">
            <p className="text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>Education</p>
            <div className="card-glow rounded-lg p-5" style={{ background: "var(--surface)" }}>
              <div className="flex items-start gap-3 mb-2">
                <div className="flex-shrink-0 w-10 h-10 rounded overflow-hidden" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)" }}>
                  <Image src="/images/education/gcoec.jpg" alt="GCOEC" width={40} height={40} className="w-full h-full object-contain p-1"
                    onError={(ev) => { (ev.currentTarget as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm leading-tight">
                    BE — Electronics &amp; Telecommunication Engineering
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: "var(--cyan)" }}>
                    Government College of Engineering, Chandrapur
                  </p>
                </div>
              </div>
              <p className="text-xs font-mono mb-3 ml-13" style={{ color: "var(--muted)" }}>Dec 2021 – Jun 2025</p>
              <div className="space-y-1.5 text-xs" style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                <p>▹ Ranked <strong className="text-white">1st out of 6 teams</strong> in final-year capstone evaluation</p>

                <p>▹ Coursework: DSA, OOP, DBMS (SQL), Python, C</p>
                <p>▹ Arduino Workshop — embedded systems practical</p>
              </div>
            </div>

            <p className="text-xs tracking-widest uppercase pt-2" style={{ color: "var(--muted)" }}>Certifications</p>
            <div className="card-glow rounded-lg p-5" style={{ background: "var(--surface)" }}>
              <ul className="space-y-2">
                {certifications.map((c) => (
                  <li key={c.name} className="flex justify-between text-xs">
                    <span className="text-white">{c.name}</span>
                    <span style={{ color: "var(--muted)" }}>{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-glow rounded-lg p-5 text-center" style={{ background: "var(--surface)" }}>
              <p className="text-sm text-white mb-3">Want the full picture?</p>
              <a
                href="/resume/Sahil_Hamid_Shaikh_Resume.pdf"
                download="Sahil_Hamid_Shaikh_Resume.pdf"
                className="btn-primary text-xs w-full justify-center"
              >
                Download Resume ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
