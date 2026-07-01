export default function Contact() {
  return (
    <section id="contact" className="py-28" style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-label mb-3">Get In Touch</p>
          <h2 className="section-title mb-4">
            Let&apos;s <span style={{ color: "var(--cyan)" }}>Connect</span>
          </h2>
          <p className="mb-10" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
            I&apos;m actively looking for new opportunities. Whether you have a project in mind,
            a question, or just want to say hi — my inbox is always open.
          </p>

          <a
            href="mailto:ssahil9635@gmail.com"
            className="btn-primary text-base px-8 py-3 mb-12 inline-flex"
            style={{ fontSize: "0.95rem" }}
          >
            Say Hello ✉
          </a>

          {/* Social links */}
          <div className="flex justify-center gap-6 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
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
      </div>
    </section>
  );
}
