/* Bottom-left language switch (after the opening finishes) + bottom-right back-to-top with scroll-progress ring */
import React from "react";
import { EASE } from "./util.js";

const OLIVE = "#6f7a45", INK = "#3b4426";
const R = 18, CIRC = 2 * Math.PI * R;

export function FloatingDock({ sc, lang, setLang, opened }) {
  const [vis, setVis] = React.useState(false), ring = React.useRef(null);
  React.useEffect(() => {
    const el = sc.current; if (!el) return;
    let raf = 0, last = null;
    const tick = () => {
      raf = 0;
      const p = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
      if (ring.current) ring.current.style.strokeDashoffset = CIRC * (1 - p);
      const v = el.scrollTop > el.clientHeight * 0.6;
      if (v !== last) { last = v; setVis(v); }
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick(); el.addEventListener("scroll", on, { passive: true });
    return () => { el.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  const up = opened && vis;
  const shell = { position: "absolute", bottom: "calc(14px + env(safe-area-inset-bottom))", zIndex: 20, padding: 3, borderRadius: 999, willChange: "transform, opacity",
    background: "#ffffff", border: "1px solid rgba(111,122,69,.35)", boxShadow: "0 10px 24px -12px rgba(30,40,15,.45), 0 1px 3px rgba(30,40,15,.12)" };
  const btn = { position: "relative", width: 40, height: 40, padding: 0, border: "none", borderRadius: "50%", background: "transparent", color: INK, display: "grid", placeItems: "center", cursor: "pointer", flex: "none", WebkitTapHighlightColor: "transparent" };
  const langBtn = (k, label) => (
    <button key={k} type="button" aria-pressed={lang === k} aria-label={k === "en" ? "English" : "Tamil"} onClick={() => setLang(k)}
      style={{ ...btn, zIndex: 1, color: lang === k ? "#ffffff" : INK, fontFamily: k === "ta" ? "var(--font-tamil)" : "var(--font-serif)", fontSize: k === "ta" ? 16 : 12.5, fontWeight: 700, letterSpacing: k === "en" ? ".1em" : 0, transition: "color 300ms" }}>{label}</button>
  );
  return (
    <>
      {setLang && <div role="group" aria-label="Language" style={{ ...shell, left: 14, display: "flex", opacity: opened ? 1 : 0, transform: `translateY(${opened ? 0 : 12}px)`, pointerEvents: opened ? "auto" : "none", transition: `opacity 500ms 300ms, transform 600ms ${EASE} 300ms` }}>
        <div style={{ position: "relative", display: "flex" }}>
          <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: 40, height: 40, borderRadius: "50%", background: OLIVE, transform: `translateX(${lang === "ta" ? 40 : 0}px)`, transition: `transform 450ms ${EASE}` }} />
          {langBtn("en", "EN")}{langBtn("ta", "த")}
        </div>
      </div>}
      <button type="button" aria-label="Back to top" tabIndex={up ? 0 : -1} aria-hidden={!up} onClick={() => sc.current.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ ...btn, ...shell, position: "absolute", right: 14, width: 48, height: 48, padding: 0, color: OLIVE, opacity: up ? 1 : 0, transform: up ? "none" : "translateY(12px) scale(.9)", pointerEvents: up ? "auto" : "none", transition: `opacity 400ms, transform 500ms ${EASE}` }}>
        <svg width="42" height="42" viewBox="0 0 42 42" style={{ position: "absolute", left: 2, top: 2, transform: "rotate(-90deg)" }}>
          <circle cx="21" cy="21" r={R} fill="none" stroke="rgba(111,122,69,.15)" strokeWidth="1.5" />
          <circle ref={ring} cx="21" cy="21" r={R} fill="none" stroke={OLIVE} strokeWidth="2" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC} />
        </svg>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative" }}><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </button>
    </>
  );
}
