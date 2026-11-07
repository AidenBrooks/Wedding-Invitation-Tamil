/* 01 Home: green curtain clip → home video (plays once, freezes on last frame) → names in gold foil + twinkling sparkles */
import React from "react";
import { Bismillah } from "../components/Bismillah.jsx";
import { NAMES } from "./copy.js";
import { asset, EASE } from "./util.js";

const CURTAIN_SRC = asset("assets/curtain-intro.mp4");
const HOME_SRC = asset("assets/home-video.mp4");
const INTRO_END = 2.5; // seconds of the curtain clip to use, before any scenery shows
const HEART_D = "M6 10.5S0 6.6 0 3.2A3 3 0 0 1 6 2a3 3 0 0 1 6 1.2C12 6.6 6 10.5 6 10.5Z";

/* Names drift in from their side while settling */
function Ink({ on, delay = 0, dur = 1800, from = "left", style, children }) {
  return <div style={{ ...style, opacity: on ? 1 : 0, transform: on ? "translate3d(0,0,0) scale(1)" : `translate3d(${from === "left" ? -14 : 14}px,16px,0) scale(.96)`, transition: `opacity ${dur}ms ${EASE} ${delay}ms, transform ${dur + 400}ms ${EASE} ${delay}ms`, willChange: "opacity, transform" }}>{children}</div>;
}

/* Small caps that rise into place */
function Track({ on, delay = 0, style, children }) {
  return <div style={{ ...style, opacity: on ? 1 : 0, transform: on ? "translate3d(0,0,0)" : "translate3d(0,8px,0)", transition: `opacity 1400ms ${EASE} ${delay}ms, transform 1600ms ${EASE} ${delay}ms` }}>{children}</div>;
}

/* Gold divider that draws outward from the centre, then its heart pops in */
function Rule({ on, delay = 0, w = 120 }) {
  const line = (o) => <span style={{ width: w / 2 - 12, height: 1, background: o === "left" ? "linear-gradient(90deg, #e9cd96, transparent)" : "linear-gradient(90deg, transparent, #e9cd96)", transform: on ? "scaleX(1)" : "scaleX(0)", transformOrigin: o, transition: `transform 1200ms ${EASE} ${delay}ms` }}></span>;
  return (
    <div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {line("right")}
      <svg width="12" height="11" viewBox="0 0 12 11" style={{ opacity: on ? 1 : 0, transform: on ? "scale(1)" : "scale(.3)", transition: `opacity 600ms ${EASE} ${delay + 300}ms, transform 900ms cubic-bezier(.3,1.6,.5,1) ${delay + 300}ms` }}><path d={HEART_D} fill="#e9cd96" /></svg>
      {line("left")}
    </div>
  );
}

/* Twinkling gold dust + four-point stars over the video. Pauses when off-screen to keep scrolling smooth. */
function Sparkle() {
  const cv = React.useRef(null);
  React.useEffect(() => {
    const c = cv.current, ctx = c.getContext("2d"); let raf = 0, W = 0, H = 0, visible = true;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const size = () => { W = c.offsetWidth; H = c.offsetHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size();
    const rnd = (a, b) => a + Math.random() * (b - a);
    const dust = Array.from({ length: 36 }, () => ({ x: rnd(0, 1), y: rnd(0, 1), r: rnd(.5, 1.5), ph: rnd(0, 6.28), tw: rnd(.6, 2) }));
    const stars = Array.from({ length: 16 }, () => ({ x: rnd(.06, .94), y: rnd(.06, .94), s: rnd(4, 9), ph: rnd(0, 6.28), sp: rnd(.7, 1.5) }));
    const star = (x, y, s, a) => {
      ctx.globalAlpha = a; ctx.save(); ctx.translate(x, y);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 1.4); g.addColorStop(0, "rgba(255,246,220,.9)"); g.addColorStop(1, "rgba(255,220,150,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, s * 1.4, 0, 6.28); ctx.fill();
      ctx.fillStyle = "#fffaf0"; ctx.beginPath();
      ctx.moveTo(0, -s); ctx.quadraticCurveTo(0, 0, s, 0); ctx.quadraticCurveTo(0, 0, 0, s); ctx.quadraticCurveTo(0, 0, -s, 0); ctx.quadraticCurveTo(0, 0, 0, -s); ctx.fill();
      ctx.restore();
    };
    const step = (t) => {
      raf = 0;
      const k = t / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      dust.forEach((p) => {
        ctx.globalAlpha = .15 + .6 * Math.pow(0.5 + 0.5 * Math.sin(k * p.tw * 1.6 + p.ph), 3);
        ctx.fillStyle = "#ffe7b3"; ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, 6.28); ctx.fill();
      });
      stars.forEach((st) => {
        const v = Math.sin(k * st.sp + st.ph);
        if (v > .6) star(st.x * W, st.y * H, st.s * (v - .45), (v - .6) / .4);
        else if (v < -.98) { st.x = rnd(.08, .92); st.y = rnd(.08, .92); }
      });
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      if (visible) raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(step); });
    io.observe(c);
    raf = requestAnimationFrame(step);
    window.addEventListener("resize", size);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", size); };
  }, []);
  return <canvas ref={cv} aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 3, width: "100%", height: "100%", pointerEvents: "none" }}></canvas>;
}

/* Green curtain clip: two synced halves play while the drapes cover the frame, then pause and slide off to the sides.
   If the clip can't play, it just fades out; a hard timeout guarantees it never blocks the home screen. */
function CurtainIntro({ opened, start = 300 }) {
  const vl = React.useRef(null), vr = React.useRef(null);
  const [st, setSt] = React.useState(0); // 0 playing · 1 split · 2 fade (no video) · 3 gone
  React.useEffect(() => { [vl, vr].forEach((r) => { try { r.current.load(); } catch (e) {} }); }, []);
  React.useEffect(() => {
    if (!opened) return;
    const L = vl.current, Rv = vr.current; let raf, done = false;
    const open = () => { if (done) return; done = true; cancelAnimationFrame(raf); L.pause(); Rv.pause(); setSt(L.readyState >= 2 ? 1 : 2); };
    const go = setTimeout(() => {
      [L, Rv].forEach((el) => { el.currentTime = 0; const p = el.play(); p && p.catch(open); });
      const tick = () => {
        if (Math.abs(Rv.currentTime - L.currentTime) > 0.08) Rv.currentTime = L.currentTime;
        if (L.currentTime >= INTRO_END || L.ended) { open(); return; }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, start);
    const hard = setTimeout(open, start + INTRO_END * 1000 + 2000);
    return () => { clearTimeout(go); clearTimeout(hard); cancelAnimationFrame(raf); };
  }, [opened]);
  React.useEffect(() => { if (!st) return; const id = setTimeout(() => setSt(3), st === 1 ? 1700 : 800); return () => clearTimeout(id); }, [st]);
  if (st === 3) return null;
  const ease = "cubic-bezier(.65,0,.25,1)";
  const half = (k) => ({ position: "absolute", top: 0, bottom: 0, [k]: 0, width: "50%", overflow: "hidden", background: "#6b7a4a",
    transform: st === 1 ? `translate3d(${k === "left" ? -102 : 102}%,0,0)` : "none", transition: `transform 1600ms ${ease}`,
    boxShadow: k === "left" ? "8px 0 24px rgba(30,40,15,.3)" : "-8px 0 24px rgba(30,40,15,.3)" });
  const vid = (k) => ({ position: "absolute", top: 0, [k]: 0, width: "200%", height: "100%", objectFit: "cover" });
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 8, pointerEvents: "none", overflow: "hidden", opacity: st === 2 ? 0 : 1, transition: "opacity 800ms ease-out" }}>
      <div style={half("left")}><video ref={vl} src={CURTAIN_SRC} muted playsInline preload="auto" style={vid("left")}></video></div>
      <div style={half("right")}><video ref={vr} src={CURTAIN_SRC} muted playsInline preload="auto" style={vid("right")}></video></div>
    </div>
  );
}

export function VideoHome({ c, lang, ta, opened }) {
  const va = React.useRef(null);
  const [t, setT] = React.useState(false);
  React.useEffect(() => {
    if (!opened) return;
    const el = va.current;
    const go = setTimeout(() => { if (el) { el.currentTime = 0; const p = el.play(); p && p.catch(() => {}); } }, 3400);
    const id = setTimeout(() => setT(true), 4700);
    return () => { clearTimeout(go); clearTimeout(id); };
  }, [opened]);
  const n = NAMES[lang];
  const ink = "#fffaf0", gold = "#f6dca6", glow = "0 1px 2px rgba(20,8,2,.9), 0 2px 14px rgba(20,8,2,.7)";
  const serif = ta ? "var(--font-tamil)" : "var(--font-serif)";
  const name = ta ? { fontFamily: "var(--font-tamil)", fontWeight: 700, fontSize: 22, lineHeight: 1.4 } : { fontFamily: "var(--font-script)", fontSize: "clamp(28px, min(6dvh, 11vw), 46px)", lineHeight: 1.12, whiteSpace: "nowrap" };
  const qual = { fontFamily: serif, fontSize: 12, fontWeight: 600, color: ink, whiteSpace: "nowrap", textTransform: "uppercase" };
  const parent = { fontFamily: serif, fontStyle: ta ? "normal" : "italic", fontSize: ta ? 12 : 15, lineHeight: 1.35, color: ink, marginTop: 4, maxWidth: 300 };
  const fade = (d, y = 12) => ({ opacity: t ? 1 : 0, transform: t ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`, transition: `opacity 1400ms ${EASE} ${d}ms, transform 1600ms ${EASE} ${d}ms` });
  /* Gold foil text with a light shimmer that sweeps across once; a separate shadow layer keeps it legible cheaply */
  const foil = (d) => ({ backgroundImage: "linear-gradient(105deg, #f4d89c 0%, #fff1d2 30%, #ffffff 45%, #fff1d2 52%, #ecc77e 70%, #fbe5b6 100%)", backgroundSize: "300% 100%", backgroundPosition: t ? "0% 0" : "100% 0", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", textShadow: "none", transition: `background-position 2600ms ${EASE} ${d}ms`, padding: "0 6px", gridArea: "1/1", position: "relative" });
  const foilName = (d, children) => (
    <span lang={lang} style={{ display: "grid" }}>
      <span aria-hidden="true" style={{ ...name, gridArea: "1/1", padding: "0 6px", color: "transparent", textShadow: "0 1px 2px rgba(20,8,2,.95), 0 3px 14px rgba(20,8,2,.8)" }}>{children}</span>
      <span style={{ ...name, ...foil(d) }}>{children}</span>
    </span>
  );
  const amp = (origin) => <span style={{ width: 54, height: 1, background: `linear-gradient(${origin === "right" ? 90 : 270}deg, transparent, #ecd09a)`, transform: t ? "scaleX(1)" : "scaleX(0)", transformOrigin: origin, transition: `transform 1100ms ${EASE} 2000ms` }}></span>;
  return (
    <section data-screen-label="01 Home" style={{ position: "relative", height: "100%", minHeight: 460, overflow: "hidden", background: "#2a160e", color: ink, textAlign: "center" }}>
      <video ref={va} src={HOME_SRC} muted playsInline preload="auto" aria-hidden="true" onEnded={(e) => e.currentTarget.pause()}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }}></video>
      <CurtainIntro opened={opened} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 2, background: "radial-gradient(ellipse 95% 62% at 50% 46%, rgba(34,14,6,.82) 0%, rgba(34,14,6,.6) 45%, rgba(34,14,6,.25) 80%, rgba(34,14,6,.15) 100%), linear-gradient(180deg, rgba(34,14,6,.35), rgba(34,14,6,0) 30%, rgba(34,14,6,0) 75%, rgba(34,14,6,.45))", opacity: t ? 1 : 0, transition: `opacity 1600ms ${EASE}` }}></div>
      <Sparkle />
      <div style={{ position: "relative", zIndex: 4, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "max(32px, env(safe-area-inset-top)) clamp(14px, 6vw, 26px) 92px", textShadow: glow }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ ...fade(0, 0), transform: t ? "scale(1)" : "scale(.92)", color: gold, "--text-accent": gold, "--text-ink": gold }}><Bismillah size={18} /></div>
          <Rule on={t} delay={300} />
          <Track on={t} delay={500} style={{ fontFamily: serif, fontSize: 12, fontWeight: 600, letterSpacing: ta ? "0" : "0.28em", textTransform: "uppercase", color: gold }}>{c.title}</Track>
        </div>
        <div style={{ marginTop: "clamp(10px, 3.5dvh, 40px)", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Ink on={t} delay={900} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>{foilName(2500, n.groom)}</Ink>
          <Track on={t} delay={1700} style={{ ...qual, letterSpacing: ta ? "0" : "0.3em", marginTop: ta ? 2 : -2 }}>{n.groomTitle}</Track>
          <div style={{ ...fade(2000, 6), ...parent }}>{n.groomParent}</div>
          <div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: 12, margin: "clamp(6px, 1.6dvh, 14px) 0" }}>
            {amp("right")}
            <span style={{ ...fade(2100, 0), transform: t ? "none" : "scale(.6)", fontFamily: "var(--font-script)", fontSize: 34, lineHeight: 1, color: gold }}>&amp;</span>
            {amp("left")}
          </div>
          <Ink on={t} delay={2400} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>{foilName(3900, n.bride)}</Ink>
          <Track on={t} delay={3200} style={{ ...qual, letterSpacing: ta ? "0" : "0.3em", marginTop: ta ? 2 : -2 }}>{n.brideTitle}</Track>
          <div style={{ ...fade(3500, 6), ...parent }}>{n.brideParent}</div>
        </div>
      </div>
      <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 22, zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, pointerEvents: "none", opacity: t ? 1 : 0, transition: `opacity 1200ms ${EASE} 4600ms` }}>
        <span style={{ fontFamily: serif, fontSize: ta ? 11 : 12, fontWeight: 600, letterSpacing: ta ? 0 : ".24em", textTransform: "uppercase", color: ink, textShadow: glow }}>{c.scrollDown}</span>
        <span style={{ width: 22, height: 34, borderRadius: 12, border: "1.5px solid #ecd09a", display: "flex", justifyContent: "center", paddingTop: 6, boxSizing: "border-box" }}><span className="nk-anim" style={{ width: 3, height: 7, borderRadius: 2, background: "#ecd09a", animation: "lxCue 1.6s ease-in-out infinite" }}></span></span>
      </div>
    </section>
  );
}
