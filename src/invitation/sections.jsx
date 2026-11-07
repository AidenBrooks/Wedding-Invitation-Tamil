/* Building blocks for the ivory/olive sections after the home video */
import React from "react";
import { Icon } from "../components/Icon.jsx";
import { Reveal } from "./effects.jsx";
import { PROGRAM, UNITS, EVENT_START } from "./copy.js";
import { EASE } from "./util.js";

const HEART_D = "M6 10.5S0 6.6 0 3.2A3 3 0 0 1 6 2a3 3 0 0 1 6 1.2C12 6.6 6 10.5 6 10.5Z";

export function ScriptTitle({ ta, children, size = 40 }) {
  return ta
    ? <h2 style={{ margin: 0, fontFamily: "var(--font-tamil)", fontWeight: 700, fontSize: 19, lineHeight: 1.5, color: "var(--text-ink)" }}>{children}</h2>
    : <h2 style={{ margin: 0, fontFamily: "var(--font-script)", fontWeight: 400, fontSize: size, lineHeight: 1.1, color: "var(--text-ink)", textShadow: "var(--text-script-shadow)" }}>{children}</h2>;
}

export function TinyHeart({ w = 70 }) {
  return (
    <div aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--decor-rose, #a86b6b)" }}>
      <span style={{ width: w / 2 - 10, height: 1, background: "var(--border-rule)" }}></span>
      <svg width="12" height="11" viewBox="0 0 12 11"><path d={HEART_D} fill="currentColor" /></svg>
      <span style={{ width: w / 2 - 10, height: 1, background: "var(--border-rule)" }}></span>
    </div>
  );
}

/** Small grey hairline with a tiny heart, under "Scratch to Reveal" */
export function GreyHeartRule() {
  return (
    <div aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "0 auto 6px" }}>
      <span style={{ width: 56, height: 1, background: "rgba(79,76,67,.35)" }}></span>
      <svg width="7" height="6" viewBox="0 0 12 11"><path d={HEART_D} fill="#6b675c" /></svg>
      <span style={{ width: 56, height: 1, background: "rgba(79,76,67,.35)" }}></span>
    </div>
  );
}

/** Centred section with side padding that tightens on narrow phones */
export function Block({ children, label, pad = "64px 30px", gap = 20 }) {
  const [t, x, b] = pad.split(" "), side = parseInt(x) || 30;
  return <section data-screen-label={label} style={{ position: "relative", padding: `${t} clamp(16px, ${(side / 3.9).toFixed(1)}vw, ${side}px) ${b || t}`, boxSizing: "border-box", maxWidth: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap, textAlign: "center" }}>{children}</section>;
}

/** Date details shown inside the heart once it's scratched */
export function HeartDate({ c, ta, shown }) {
  const f = ta ? "var(--font-tamil)" : "var(--font-serif)";
  const step = (i) => ({ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(6px)", transition: `opacity 600ms var(--ease-out) ${250 + i * 130}ms, transform 600ms var(--ease-out) ${250 + i * 130}ms` });
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, width: 190, textAlign: "center", lineHeight: 1.2, transform: "translateY(22px)", color: "var(--text-ink)" }}>
      <div style={{ ...step(0), fontFamily: f, fontStyle: ta ? "normal" : "italic", fontSize: ta ? 12 : 15, color: "var(--text-accent)" }}>{c.invited}</div>
      <div style={{ ...step(1), fontFamily: f, fontWeight: 600, fontSize: ta ? 17 : 21, lineHeight: 1.25, marginTop: 4 }}>{c.dateLong}</div>
      <div style={{ ...step(2), display: "flex", alignItems: "center", justifyContent: "center", gap: ta ? 6 : 8, fontFamily: f, fontSize: ta ? 12 : 15, marginTop: 2, whiteSpace: "nowrap" }}><span>{c.weekday}</span><span aria-hidden="true" style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--text-accent)" }}></span><span>{c.time}</span></div>
      <div style={{ ...step(3), fontFamily: f, fontStyle: ta ? "normal" : "italic", fontSize: ta ? 11 : 13, color: "var(--text-muted)", marginTop: 4 }}>{c.hijri}</div>
    </div>
  );
}

/* ---------- Flip-clock countdown ---------- */
function FlipDigit({ v }) {
  const card = { position: "relative", width: "clamp(48px, 15vw, 64px)", height: "clamp(58px, 18vw, 76px)", borderRadius: 10, overflow: "hidden", background: "linear-gradient(180deg, #62713f 0%, #56653a 50%, #4c5a32 50%, #46532d 100%)", boxShadow: "0 10px 22px rgba(60,72,38,.3), inset 0 1px 0 rgba(255,250,230,.18)", perspective: 300 };
  const notch = (side) => <span aria-hidden="true" style={{ position: "absolute", top: "50%", [side]: -3, width: 6, height: 10, marginTop: -5, borderRadius: 3, background: "#e9dcc4" }}></span>;
  return (
    <div style={card}>
      <span key={v} className="nk-anim" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontFamily: "var(--font-numeral)", fontWeight: 700, fontSize: "clamp(24px, 8vw, 34px)", lineHeight: 1, color: "#fbf3df", fontVariantNumeric: "tabular-nums", transformOrigin: "50% 50%", animation: "lxFlip 650ms cubic-bezier(.3,1.3,.5,1)", backfaceVisibility: "hidden" }}>{String(v).padStart(2, "0")}</span>
      <span aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "rgba(30,38,18,.45)", boxShadow: "0 1px 0 rgba(255,250,230,.12)" }}></span>
      {notch("left")}{notch("right")}
    </div>
  );
}

export function FlipCountdown({ lang, target = EVENT_START }) {
  const t = new Date(target).getTime();
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const s = Math.max(0, Math.floor((t - now) / 1000));
  const vals = [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
  const ta = lang === "ta";
  const dot = <i style={{ width: 4, height: 4, borderRadius: "50%", background: "#6f7a45" }}></i>;
  const colon = (i) => <span key={"c" + i} aria-hidden="true" className="nk-anim" style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: "clamp(22px, 7vw, 30px)", animation: "lxBlink 1s steps(1) infinite" }}>{dot}{dot}</span>;
  return (
    <div role="timer" aria-live="off" style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "clamp(3px, 1.4vw, 6px)", maxWidth: "100%" }}>
      {vals.map((v, i) => [i ? colon(i) : null,
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9 }}>
          <FlipDigit v={v} />
          <span lang={lang} style={{ fontFamily: ta ? "var(--font-tamil)" : "var(--font-serif)", fontSize: ta ? 11 : 12, fontWeight: 700, letterSpacing: ta ? 0 : ".14em", textTransform: "uppercase", color: "#4f5a2e" }}>{UNITS[lang][i]}</span>
        </div>])}
    </div>
  );
}

/* ---------- Program timeline: line draws down, a gold bead travels it and lights each event ---------- */
export function ProgramTimeline({ root, lang, ta, body }) {
  const wrap = React.useRef(null), bead = React.useRef(null), icons = React.useRef([]);
  const [on, setOn] = React.useState(false);
  const [act, setAct] = React.useState(-1);
  React.useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { root: root && root.current, threshold: 0.25 });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    if (!on) return;
    let raf, start = null, last = -1;
    const DUR = 2800, DELAY = 1600;
    const tick = (ts) => {
      if (start === null) start = ts + DELAY;
      const w = wrap.current, b = bead.current;
      if (w && b && ts >= start) {
        const top = 18, h = w.clientHeight - 36;
        const p = ((ts - start) % DUR) / DUR;
        const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const y = top + e * h;
        b.style.transform = `translate3d(-50%, ${y - 3.5}px, 0)`;
        b.style.opacity = p < .05 ? p / .05 : p > .95 ? (1 - p) / .05 : 1;
        let hit = -1;
        const wt = w.getBoundingClientRect().top;
        icons.current.forEach((el, i) => { if (el) { const cy = el.offsetParent ? el.getBoundingClientRect().top + 20 - wt : 0; if (Math.abs(cy - y) < 26) hit = i; } });
        if (hit !== last) { last = hit; setAct(hit); }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on]);
  return (
    <div ref={wrap} style={{ position: "relative", width: "100%", maxWidth: 350, display: "flex", flexDirection: "column", gap: 38, paddingTop: 4 }}>
      <span aria-hidden="true" style={{ position: "absolute", left: "50%", top: 18, bottom: 18, width: 1, transform: `translateX(-.5px) scaleY(${on ? 1 : 0})`, transformOrigin: "top", background: "linear-gradient(180deg, transparent, var(--border-rule) 10%, var(--text-accent) 50%, var(--border-rule) 90%, transparent)", transition: `transform 2200ms ${EASE} 200ms` }}></span>
      <span ref={bead} aria-hidden="true" style={{ position: "absolute", left: "50%", top: 0, zIndex: 2, width: 7, height: 7, borderRadius: "50%", background: "#c9a75e", boxShadow: "0 0 10px 3px rgba(230,205,148,.9), 0 0 2px 1px #fffaf0", opacity: 0, pointerEvents: "none" }}></span>
      {PROGRAM[lang].items.map(([time, what, icon], i) => {
        const hot = act === i, right = i % 2 === 1;
        return (
          <Reveal key={what} root={root} delay={120 + i * 140}>
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "minmax(0,1fr) 40px minmax(0,1fr)", alignItems: "center", columnGap: 10 }}>
              <div style={{ gridColumn: right ? 3 : 1, gridRow: 1, textAlign: right ? "left" : "right", display: "flex", flexDirection: "column", gap: 3, transform: hot ? `translateX(${right ? 4 : -4}px)` : "none", transition: `transform 500ms ${EASE}` }}>
                <span style={{ fontFamily: ta ? "var(--font-tamil)" : "'Great Vibes', var(--font-script)", fontWeight: ta ? 700 : 400, fontSize: ta ? 15 : 30, lineHeight: 1.1, color: "var(--text-ink)" }}>{what}</span>
                <span style={{ fontFamily: body, fontSize: ta ? 12.5 : 15.5, fontWeight: 700, whiteSpace: "nowrap", color: "#4f5a2e" }}>{time}</span>
              </div>
              <span ref={(el) => (icons.current[i] = el)} style={{ gridColumn: 2, gridRow: 1, position: "relative", zIndex: 3, width: 40, height: 40, borderRadius: "50%", display: "grid", placeItems: "center",
                background: hot ? "linear-gradient(135deg, #6f7a45, #56653a)" : "#f8f2e6", color: hot ? "#fbf6ea" : "var(--text-accent)",
                border: hot ? "1px solid #56653a" : "1px solid var(--border-rule)",
                boxShadow: hot ? "0 0 0 4px rgba(246,239,226,.9), 0 8px 20px rgba(70,83,45,.3)" : "0 0 0 4px rgba(246,239,226,.9), 0 4px 12px rgba(80,90,50,.15)",
                transform: hot ? "scale(1.14)" : "scale(1)", transition: "all 450ms cubic-bezier(.3,1.4,.5,1)" }}>
                {hot ? null : <span aria-hidden="true" className="nk-anim" style={{ position: "absolute", inset: -1, borderRadius: "50%", border: "1px solid var(--text-accent)", animation: `lxRing 2.4s ease-out ${i * 0.8}s infinite`, opacity: 0 }}></span>}
                <Icon name={icon} size={17} />
              </span>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
