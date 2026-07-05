"use client";
import { motion } from "framer-motion";

interface ComingSoonProps {
  id: string;
  label: string;
  title: string;
  accent: string;
  description: string;
  eta?: string;
}

export default function ComingSoon({ id, label, title, accent, description, eta }: ComingSoonProps) {
  return (
    <section id={id} className="py-20 brutal-border-b" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <p className="section-label mb-3">{label}</p>
          <h2 className="section-title">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span style={{ color: accent }}>{title.split(" ").at(-1)}</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl p-10 flex flex-col items-center justify-center text-center min-h-[220px]"
          style={{ background: "var(--surface)", border: `1px solid ${accent}22` }}
        >
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${accent}08 0%, transparent 70%)` }} />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <span className="text-3xl">🚧</span>
            <p className="font-mono text-xs tracking-widest uppercase" style={{ color: accent }}>Coming Soon</p>
            <p className="text-[var(--muted)] max-w-md text-sm leading-relaxed">{description}</p>
            {eta && (
              <span className="text-[10px] font-mono px-3 py-1 rounded-full" style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}30` }}>
                ETA: {eta}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
