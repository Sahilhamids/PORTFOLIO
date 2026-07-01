export default function Footer() {
  return (
    <footer className="py-6 text-center" style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <p className="text-xs" style={{ color: "var(--muted)" }}>
        Designed &amp; built by{" "}
        <span style={{ color: "var(--cyan)" }}>Sahil Hamid Shaikh</span>
        {" "}· {new Date().getFullYear()}
      </p>
    </footer>
  );
}
