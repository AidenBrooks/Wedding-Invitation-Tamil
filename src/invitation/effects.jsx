/* Kit-level effects: gate doors, scroll reveal, sparkle burst (from ui_kits/invitation/Effects.jsx) */
import React from "react";
import { asset, reduceMotion } from "./util.js";

/* Embossed leaf doors (artwork incl. the "Tap to open" plaque). Tap → shine, then the doors swing outward. */
const BOX_W = "max(100cqw, calc(100cqh * 0.5628))", BOX_H = "max(100cqh, calc(100cqw * 1.7768))";
const DOORS = asset("assets/gate-doors.webp");
const IDLE_TWINKLES = [[29, 33, 0], [71, 37, 1.1], [33, 60, 2.2], [68, 58, 0.6], [50, 29.5, 1.7]];
const GLINTS = [[50, 46, 0, 26], [36, 40, 120, 14], [64, 52, 200, 18], [44, 58, 300, 12], [58, 36, 380, 16], [30, 60, 460, 10], [70, 42, 520, 12]];

export function GateDoors({ lang = "en", onOpen }) {
  const [phase, setPhase] = React.useState("idle");
  const timers = React.useRef([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const tap = () => {
    if (phase !== "idle") return;
    try { navigator.vibrate && navigator.vibrate(20); } catch (e) {}
    if (reduceMotion()) { onOpen && onOpen(); setPhase("gone"); return; }
    setPhase("shine");
    timers.current.push(
      setTimeout(() => setPhase("doors"), 750),
      setTimeout(() => { onOpen && onOpen(); }, 850),
      setTimeout(() => setPhase("gone"), 3350),
    );
  };
  if (phase === "gone") return null;
  const swing = phase === "doors";
  const box = (left) => ({ position: "absolute", top: `calc(50cqh - ${BOX_H} / 2)`, left, width: BOX_W, height: BOX_H, backgroundImage: `url(${DOORS})`, backgroundSize: "100% 100%" });
  const ease = "cubic-bezier(.45,0,.2,1)";
  const door = (side) => ({
    position: "absolute", top: 0, bottom: 0, width: "50%", [side]: 0, overflow: "hidden",
    transformOrigin: side === "left" ? "left center" : "right center",
    transform: swing ? `rotateY(${side === "left" ? -88 : 88}deg)` : "rotateY(0deg)",
    transition: `transform 2400ms ${ease}, filter 2400ms ${ease}`, filter: swing ? "brightness(.75)" : "none", willChange: "transform",
  });
  const shade = (side) => ({ position: "absolute", inset: 0, pointerEvents: "none", opacity: swing ? 1 : 0, transition: `opacity 2000ms ${ease}`,
    background: side === "left" ? "linear-gradient(90deg, rgba(0,0,0,.05), rgba(0,0,0,.45))" : "linear-gradient(270deg, rgba(0,0,0,.05), rgba(0,0,0,.45))" });
  const ta = lang === "ta", lit = phase !== "idle";
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 60, containerType: "size", perspective: 1300, perspectiveOrigin: "50% 50%", pointerEvents: swing ? "none" : "auto" }}>
      <div style={door("left")}><div style={box(`calc(50cqw - ${BOX_W} / 2)`)}></div><div style={shade("left")}></div></div>
      <div style={door("right")}><div style={box(`calc(${BOX_W} / -2)`)}></div><div style={shade("right")}></div></div>
      <div style={{ ...box(`calc(50cqw - ${BOX_W} / 2)`), backgroundImage: "none", pointerEvents: "none" }}>
        <button type="button" onClick={tap} aria-label={ta ? "திறக்க தட்டவும்" : "Tap to open"}
          style={{ position: "absolute", left: "26.57%", top: "30.26%", width: "47.18%", height: "32.54%", padding: 0, border: "none", background: "transparent", cursor: "pointer", pointerEvents: lit ? "none" : "auto", WebkitTapHighlightColor: "transparent" }}></button>
      </div>
      {/* Idle: breathing glow + twinkles on the plaque, inviting the tap */}
      <div aria-hidden="true" style={{ ...box(`calc(50cqw - ${BOX_W} / 2)`), backgroundImage: "none", pointerEvents: "none", opacity: lit ? 0 : 1, transition: "opacity 300ms" }}>
        <span className="nk-anim" style={{ position: "absolute", left: "50%", top: "46.5%", width: "70%", height: "44%", transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,242,205,.55), rgba(255,236,190,.18) 55%, rgba(255,236,190,0))", mixBlendMode: "screen", animation: "fxBreath 3.2s ease-in-out infinite" }}></span>
        {IDLE_TWINKLES.map(([x, y, d], i) => (
          <svg key={i} className="nk-anim" width="18" height="18" viewBox="-10 -10 20 20" style={{ position: "absolute", left: x + "%", top: y + "%", opacity: 0, animation: `fxTwinkle 3.2s ease-in-out ${d}s infinite`, filter: "drop-shadow(0 0 3px rgba(255,230,170,.95))" }}>
            <path d="M0-10 Q0 0 10 0 Q0 0 0 10 Q0 0 -10 0 Q0 0 0-10Z" fill="#fff8e4" />
          </svg>
        ))}
      </div>
      {/* On tap: light sweep, central flash, star glints */}
      {lit ? <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 2 }}>
        <span style={{ position: "absolute", top: "-10%", bottom: "-10%", left: 0, width: "45%", background: "linear-gradient(90deg, transparent, rgba(255,240,200,.0) 20%, rgba(255,246,220,.75) 50%, rgba(255,240,200,0) 80%, transparent)", animation: "fxSweep 1100ms cubic-bezier(.4,0,.2,1) both", mixBlendMode: "screen" }}></span>
        <span style={{ position: "absolute", left: "50%", top: "46%", width: "120cqw", height: "120cqw", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,244,210,.9) 0%, rgba(240,205,130,.45) 22%, rgba(240,205,130,0) 55%)", animation: "fxFlash 1300ms ease-out both", mixBlendMode: "screen" }}></span>
        {GLINTS.map(([x, y, d, sz], i) => (
          <svg key={i} width={sz * 2} height={sz * 2} viewBox="-10 -10 20 20" style={{ position: "absolute", left: x + "%", top: y + "%", animation: `fxGlint 900ms ease-out ${d}ms both`, filter: "drop-shadow(0 0 4px rgba(255,230,170,.9))" }}>
            <path d="M0-10 L1.6-1.6 L10 0 L1.6 1.6 L0 10 L-1.6 1.6 L-10 0 L-1.6-1.6Z" fill="#fff6dc" />
          </svg>
        ))}
      </div> : null}
    </div>
  );
}

/* Fade/rise/un-blur when scrolled into view (4s fallback so nothing stays hidden) */
export function Reveal({ children, delay = 0, root, y = 18 }) {
  const ref = React.useRef(null);
  const [on, setOn] = React.useState(reduceMotion);
  React.useEffect(() => {
    if (on) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { root: root && root.current, threshold: 0.2 });
    io.observe(ref.current);
    const fb = setTimeout(() => setOn(true), 4000 + delay);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, []);
  return <div ref={ref} style={{ width: "100%", opacity: on ? 1 : 0, transform: on ? "none" : `translateY(${y}px)`, filter: on ? "none" : "blur(4px)",
    transition: `opacity 900ms var(--ease-out) ${delay}ms, transform 900ms var(--ease-out) ${delay}ms, filter 900ms var(--ease-out) ${delay}ms` }}>{children}</div>;
}

/* Canvas sparkle burst — foil, rose and cream flecks with gravity */
export const Sparkles = React.forwardRef(function Sparkles(_, ref) {
  const cv = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    burst(x, y) {
      if (reduceMotion()) return;
      const c = cv.current, dpr = window.devicePixelRatio || 1, W = c.offsetWidth, H = c.offsetHeight;
      c.width = W * dpr; c.height = H * dpr; const ctx = c.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = ["#b98a6a", "#e3c4ab", "#a86b6b", "#fbf3ec", "#7a3b3f", "#d9b79c"];
      const ps = Array.from({ length: 140 }, () => {
        const a = Math.random() * Math.PI * 2, v = 2 + Math.random() * 6.5;
        return { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 3, r: 1 + Math.random() * 3.2, c: cols[(Math.random() * cols.length) | 0], rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, shape: Math.random() < 0.45 ? 1 : 0, life: 1 };
      });
      let t0 = performance.now();
      const step = (t) => {
        const dt = Math.min(2, (t - t0) / 16.7); t0 = t;
        ctx.clearRect(0, 0, W, H); let alive = 0;
        ps.forEach((p) => {
          p.vy += 0.16 * dt; p.vx *= 0.985; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt; p.life -= 0.0075 * dt;
          if (p.life <= 0) return; alive++;
          ctx.globalAlpha = Math.min(1, p.life * 1.6); ctx.fillStyle = p.c;
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          if (p.shape) { ctx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r); } else { ctx.beginPath(); ctx.moveTo(0, -p.r * 1.6); ctx.lineTo(p.r, 0); ctx.lineTo(0, p.r * 1.6); ctx.lineTo(-p.r, 0); ctx.closePath(); ctx.fill(); }
          ctx.restore();
        });
        ctx.globalAlpha = 1;
        if (alive) requestAnimationFrame(step); else ctx.clearRect(0, 0, W, H);
      };
      requestAnimationFrame(step);
    },
  }));
  return <canvas ref={cv} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3 }}></canvas>;
});
