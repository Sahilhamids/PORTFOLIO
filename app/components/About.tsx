export default function About() {
  return (
    <section id="about" className="py-28" style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Photo placeholder */}
          <div className="flex justify-center">
            <div
              className="relative animate-float"
              style={{ width: 280, height: 280 }}
            >
              {/* Decorative rings */}
              <div
                className="absolute inset-0 rounded-full"
                style={{ border: "1px solid rgba(0,212,255,0.2)", transform: "scale(1.15)" }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{ border: "1px solid rgba(168,85,247,0.1)", transform: "scale(1.3)" }}
              />
              {/* Photo or placeholder */}
              <div
                id="profile-photo"
                className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(168,85,247,0.1))",
                  border: "2px solid rgba(0,212,255,0.3)",
                }}
              >
                {/* Replace this div with an <img> tag once you have a photo */}
                <span className="text-6xl select-none">👨‍💻</span>
              </div>
              {/* Corner accent */}
              <div
                className="absolute"
                style={{
                  width: 40, height: 40, bottom: 10, right: 10,
                  borderRight: "2px solid var(--cyan)",
                  borderBottom: "2px solid var(--cyan)",
                }}
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="section-label mb-3">About Me</p>
            <h2 className="section-title mb-6">
              Building things that<br />
              <span style={{ color: "var(--cyan)" }}>actually matter</span>
            </h2>
            <div className="space-y-4" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
              <p>
                I&apos;m Sahil — a backend-focused software engineer with an Electronics &amp; Telecom
                engineering background. I spent a year in industrial automation at Ambuja Cements (Adani Group),
                where I wrote Groovy scripts for SAP workflow automation. Now I&apos;m fully focused on backend and software development.
              </p>
              <p>
                I build with Python and FastAPI — from AI-powered SaaS platforms to financial settlement engines.
                I leverage agentic AI tools (Claude Code, Google Antigravity IDE) not as a crutch but as a
                force multiplier: faster test coverage, faster iteration, staying in control of every design
                decision.
              </p>
              <p>
                140+ LeetCode problems solved and ranked 1st out of 6 teams in the final-year capstone evaluation.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Python", "FastAPI", "DSA", "SQL", "LLM APIs", "C (Embedded)", "Git"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
