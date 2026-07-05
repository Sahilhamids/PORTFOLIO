"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Eye } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { track } from "@vercel/analytics";

export default function Resume() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section id="resume" className="py-24 border-t border-[var(--border)] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent opacity-20" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center justify-between mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            >
              Resume<span className="text-[var(--cyan)]">.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[var(--muted)] text-lg max-w-xl"
            >
              Check out my full professional background, education, and technical skills in detail.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton>
              <button 
                onClick={() => setShowPreview(!showPreview)}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-[var(--surface)] hover:bg-[var(--cyan)]/10 border border-[var(--border)] hover:border-[var(--cyan)]/30 text-[var(--text)] hover:text-[var(--cyan)] rounded-xl transition-all brutal-border hover:-translate-y-1 shadow-lg"
              >
                <Eye className="w-5 h-5" />
                <span className="font-bold tracking-wider uppercase text-sm">{showPreview ? "Hide Preview" : "View Preview"}</span>
              </button>
            </MagneticButton>
            <MagneticButton>
              <a 
                href="/resume/Sahil_Hamid_Shaikh_Resume.pdf?v=2" 
                download="Sahil_Hamid_Shaikh_Resume.pdf"
                onClick={() => track("Downloaded Resume")}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-[var(--cyan)]/10 hover:bg-[var(--cyan)]/20 border border-[var(--cyan)]/30 text-[var(--cyan)] rounded-xl transition-all brutal-border hover:-translate-y-1 shadow-lg"
              >
                <FileText className="w-5 h-5" />
                <span className="font-bold tracking-wider uppercase text-sm">Download PDF</span>
                <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        <AnimatePresence>
          {showPreview && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 600 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full brutal-border rounded-2xl overflow-hidden shadow-2xl relative bg-[var(--surface)] md:!h-[800px]"
            >
              {/* Subtle loading skeleton background */}
              <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                <span className="text-[var(--muted)] tracking-widest text-sm uppercase">Loading PDF...</span>
              </div>
              <iframe 
                src="/resume/Sahil_Hamid_Shaikh_Resume.pdf?v=2#toolbar=0" 
                className="w-full h-full relative z-10 border-0"
                title="Sahil Hamid Resume"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
