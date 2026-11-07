import React from "react";

const HINT = { en: "Scratch to reveal the date", ta: "தேதியை அறிய தேய்க்கவும்" };

function heartPath(ctx, w, h) {
  ctx.beginPath();
  ctx.moveTo(w / 2, h * 0.28);
  ctx.bezierCurveTo(w / 2, h * 0.25, w * 0.44, h * 0.08, w * 0.25, h * 0.08);
  ctx.bezierCurveTo(w * 0.02, h * 0.08, w * 0.02, h * 0.38, w * 0.02, h * 0.38);
  ctx.bezierCurveTo(w * 0.02, h * 0.6, w * 0.22, h * 0.78, w / 2, h * 0.96);
  ctx.bezierCurveTo(w * 0.78, h * 0.78, w * 0.98, h * 0.6, w * 0.98, h * 0.38);
  ctx.bezierCurveTo(w * 0.98, h * 0.38, w * 0.98, h * 0.08, w * 0.75, h * 0.08);
  ctx.bezierCurveTo(w * 0.56, h * 0.08, w / 2, h * 0.25, w / 2, h * 0.28);
  ctx.closePath();
}

/** Foil heart the guest scratches away to uncover the date. Enter/Space or a long press also reveals. */
export function ScratchReveal({ children, width = 280, height = 250, threshold = 0.45, lang = "en", hint, onReveal, revealed: revealedProp = false, foil }) {
  const cover = React.useRef(null), outline = React.useRef(null);
  const [revealed, setRevealed] = React.useState(revealedProp);
  const state = React.useRef({ down: false, total: 0, moves: 0, last: null });

  React.useEffect(() => {
    const dpr = window.devicePixelRatio || 1;
    [cover.current, outline.current].forEach((c) => { c.width = width * dpr; c.height = height * dpr; c.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0); });
    const o = outline.current.getContext("2d");
    heartPath(o, width, height); o.strokeStyle = getComputedStyle(outline.current).getPropertyValue("--decor-rose") || "#a86b6b"; o.lineWidth = 1; o.stroke();
    const ctx = cover.current.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, width, height);
    const fc = foil || ["#c59b7c", "#e3c4ab", "#d4ad91", "#a97a5c"];
    g.addColorStop(0, fc[0]); g.addColorStop(0.45, fc[1]); g.addColorStop(0.55, fc[2]); g.addColorStop(1, fc[3]);
    heartPath(ctx, width, height); ctx.fillStyle = g; ctx.fill();
    ctx.save(); heartPath(ctx, width, height); ctx.clip();
    for (let i = 0; i < (width * height) / 55; i++) {
      const x = Math.random() * width, y = Math.random() * height, r = Math.random() * 1.3 + 0.3, k = Math.random();
      ctx.fillStyle = k > 0.35 ? "rgba(255,248,240," + (0.35 + Math.random() * 0.6) + ")" : "rgba(122,74,50," + (0.15 + Math.random() * 0.25) + ")";
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    const sheen = ctx.createRadialGradient(width * 0.32, height * 0.3, 4, width * 0.32, height * 0.3, width * 0.5);
    sheen.addColorStop(0, "rgba(255,255,255,.45)"); sheen.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sheen; ctx.fillRect(0, 0, width, height);
    ctx.restore();
    const img = ctx.getImageData(0, 0, cover.current.width, cover.current.height).data;
    let n = 0; for (let i = 3; i < img.length; i += 64) if (img[i] > 0) n++;
    state.current.total = n;
  }, [width, height, foil && foil.join()]);

  const reveal = React.useCallback(() => { if (revealed) return; setRevealed(true); onReveal && onReveal(); }, [revealed, onReveal]);

  const pos = (e) => { const r = cover.current.getBoundingClientRect(); return [(e.clientX - r.left) * (width / r.width), (e.clientY - r.top) * (height / r.height)]; };
  const scratch = (e) => {
    const s = state.current; if (!s.down || revealed) return;
    const ctx = cover.current.getContext("2d"); const [x, y] = pos(e);
    ctx.globalCompositeOperation = "destination-out"; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 38;
    ctx.beginPath(); const [lx, ly] = s.last || [x, y]; ctx.moveTo(lx, ly); ctx.lineTo(x, y); ctx.stroke();
    ctx.globalCompositeOperation = "source-over"; s.last = [x, y];
    if (++s.moves % 6 === 0) {
      const d = ctx.getImageData(0, 0, cover.current.width, cover.current.height).data; let n = 0;
      for (let i = 3; i < d.length; i += 64) if (d[i] > 0) n++;
      if (s.total && 1 - n / s.total >= threshold) reveal();
    }
  };

  const ta = lang === "ta";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ position: "relative", width, height, maxWidth: "100%" }}>
        <canvas ref={outline} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}></canvas>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: height * 0.1 }}>{children}</div>
        <canvas ref={cover} role="button" tabIndex={0} aria-label={hint || HINT[lang]}
          onPointerDown={(e) => { state.current.down = true; state.current.last = null; e.currentTarget.setPointerCapture(e.pointerId); scratch(e); }}
          onPointerMove={scratch} onPointerUp={() => { state.current.down = false; }} onPointerCancel={() => { state.current.down = false; }}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); reveal(); } }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", touchAction: "none", cursor: "grab",
            opacity: revealed ? 0 : 1, transition: "opacity var(--dur-fade) var(--ease-out)", pointerEvents: revealed ? "none" : "auto" }}></canvas>
      </div>
      <div lang={lang} style={{ fontFamily: ta ? "var(--font-tamil)" : "var(--font-serif)", fontSize: ta ? 13 : 12, letterSpacing: ta ? 0 : "var(--tracking-caps)", textTransform: "uppercase", color: "var(--text-accent)",
        opacity: revealed ? 0 : 1, transition: "opacity var(--dur-fade)" }}>{hint || HINT[lang]}</div>
    </div>
  );
}
