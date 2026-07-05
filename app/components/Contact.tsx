"use client";
import { useState } from "react";
import { Send, CheckCircle, XCircle, Loader2 } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "5c94ac58-edc8-4421-ba57-7a3eb9e316bc");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok || response.status === 200) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
        setErrorMessage("Rate limited or something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }

    // Reset status after a few seconds if success or error
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  return (
    <section id="contact" className="py-28" style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
          {/* Left Column: Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="section-label mb-3">Get In Touch</p>
            <h2 className="section-title mb-4">
              Let&apos;s <span style={{ color: "var(--cyan)" }}>Connect</span>
            </h2>
            <p className="mb-10 text-lg" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
              I&apos;m actively looking for new opportunities. Whether you have a project in mind,
              a question, or just want to say hi — my inbox is always open!
            </p>

            {/* Social links */}
            <div className="flex justify-center md:justify-start gap-6 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
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
                  className="nav-link text-sm font-medium hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="flex-1 bg-[var(--bg)] p-8 brutal-border rounded-xl shadow-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">
              <input type="hidden" name="subject" value="New Message from Portfolio Site" />
              {/* Honeypot — bots fill this, humans don't */}
              <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-mono tracking-widest text-[var(--muted)] uppercase">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--cyan)] rounded-md px-4 py-3 text-white outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-mono tracking-widest text-[var(--muted)] uppercase">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--cyan)] rounded-md px-4 py-3 text-white outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-mono tracking-widest text-[var(--muted)] uppercase">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--cyan)] rounded-md px-4 py-3 text-white outline-none transition-colors resize-none"
                  placeholder="Hi Sahil, I'd like to talk about..."
                />
              </div>

              <MagneticButton className="w-full">
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-md font-bold tracking-wider uppercase text-sm transition-all shadow-lg ${status === "success" ? "bg-[var(--green)] text-black" :
                      status === "error" ? "bg-red-500 text-white" :
                        "bg-[var(--cyan)]/10 hover:bg-[var(--cyan)]/20 border border-[var(--cyan)]/50 text-[var(--cyan)] brutal-border hover:-translate-y-1"
                    }`}
                >
                  {status === "idle" && <><Send className="w-4 h-4" /> Send Message</>}
                  {status === "loading" && <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>}
                  {status === "success" && <><CheckCircle className="w-4 h-4" /> Message Sent!</>}
                  {status === "error" && <><XCircle className="w-4 h-4" /> Failed</>}
                </button>
              </MagneticButton>

              {status === "error" && (
                <p className="text-red-400 text-xs text-center mt-2">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
