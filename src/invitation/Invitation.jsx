/* The full invitation page — recreation of ui_kits/invitation/index.html (InvitationLuxe.jsx) */
import React from "react";
import { Icon } from "../components/Icon.jsx";
import { PillButton } from "../components/PillButton.jsx";
import { ScratchReveal } from "../components/ScratchReveal.jsx";
import { GateDoors, Reveal, Sparkles } from "./effects.jsx";
import { VideoHome } from "./home.jsx";
import { FloatingDock } from "./dock.jsx";
import { Block, FlipCountdown, GreyHeartRule, HeartDate, ProgramTimeline, ScriptTitle, TinyHeart } from "./sections.jsx";
import { COPY, PROGRAM, PRESENCE, MAPS_URL, MAPS_EMBED, saveTheDate } from "./copy.js";
import { asset, store } from "./util.js";

const SAGE_FOIL = ["#7f8b5c", "#c3caa0", "#99a571", "#626e45"];
const MONOGRAM = asset("assets/monogram-cocoa.webp");
const UNLOCK_MS = 9500; // home stays locked until every line of wording has appeared

function Invitation({ lang, setLang, opened }) {
  const c = COPY[lang], ta = lang === "ta";
  const body = ta ? "var(--font-tamil)" : "var(--font-serif)";
  const sc = React.useRef(null), spark = React.useRef(null), heartWrap = React.useRef(null), scratchSec = React.useRef(null);
  const [revealed, setRevealed] = React.useState(false);
  const [locked, setLocked] = React.useState(true);
  React.useEffect(() => { if (!opened) return; const id = setTimeout(() => setLocked(false), UNLOCK_MS); return () => clearTimeout(id); }, [opened]);
  const onReveal = () => {
    try { navigator.vibrate && navigator.vibrate([18, 40, 18]); } catch (e) {}
    const h = heartWrap.current.getBoundingClientRect(), s = scratchSec.current.getBoundingClientRect();
    spark.current && spark.current.burst(h.left - s.left + h.width / 2, h.top - s.top + h.height * 0.42);
    setRevealed(true);
  };

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <FloatingDock sc={sc} lang={lang} setLang={setLang} opened={opened && !locked} />
      <div ref={sc} lang={lang} className="nk-paper" style={{ height: "100%", overflowY: locked ? "hidden" : "auto", touchAction: locked ? "none" : "auto", overscrollBehavior: "contain", scrollbarWidth: "none" }}>

        <VideoHome c={c} lang={lang} ta={ta} opened={opened} />

        <div className="nk-green">
          {/* AS monogram watermark, fixed mid-screen behind every section */}
          <div aria-hidden="true" style={{ position: "sticky", top: "50%", height: 0, zIndex: 0, pointerEvents: "none" }}>
            <img src={MONOGRAM} alt="" style={{ position: "absolute", left: "50%", top: 0, width: 240, height: 240, objectFit: "contain", transform: "translate(-50%,-50%)", opacity: 0.1 }} />
          </div>

          <Block label="02 Wording" pad="64px 34px 48px" gap={20}>
            <Reveal root={sc}><div style={{ fontFamily: body, fontWeight: 700, fontSize: ta ? 17 : 22, lineHeight: 1.35, letterSpacing: ta ? 0 : ".01em", color: "var(--text-ink)", textWrap: "balance" }}>{c.host}</div></Reveal>
            <Reveal root={sc} delay={140}><p style={{ margin: 0, fontFamily: body, fontSize: ta ? 15 : 20, lineHeight: ta ? 1.85 : 1.55, fontStyle: ta ? "normal" : "italic", color: "var(--text-ink)", textWrap: "pretty" }}>{c.invite}</p></Reveal>
            <Reveal root={sc} delay={260}><TinyHeart w={90} /></Reveal>
          </Block>

          <section ref={scratchSec} data-screen-label="03 Scratch" style={{ position: "relative", padding: "32px 24px 56px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
            <Sparkles ref={spark} />
            <Reveal root={sc}>
              <div style={{ display: "grid", placeItems: "center" }}>
                <div style={{ gridArea: "1/1", opacity: revealed ? 0 : 1, transition: "opacity 500ms var(--ease-out)" }}>
                  {ta ? <ScriptTitle ta>{c.scratch}</ScriptTitle> : <h2 style={{ margin: "6px 0 10px", fontFamily: "'Great Vibes', var(--font-script)", fontWeight: 400, fontSize: 44, lineHeight: 1.1, color: "#4f4c43", letterSpacing: ".01em" }}>{c.scratch}</h2>}
                </div>
                <div style={{ gridArea: "1/1", opacity: revealed ? 1 : 0, transition: "opacity 700ms var(--ease-out) 250ms" }} aria-hidden={!revealed}>
                  {ta ? <ScriptTitle ta>{c.forever}</ScriptTitle> : <h2 style={{ margin: 0, fontFamily: "'Great Vibes', var(--font-script)", fontWeight: 400, fontSize: 42, lineHeight: 1.1, color: "var(--text-ink)", textShadow: "var(--text-script-shadow)" }}>{c.forever}</h2>}
                </div>
              </div>
            </Reveal>
            <Reveal root={sc} delay={60}><GreyHeartRule /></Reveal>
            <Reveal root={sc} delay={120}>
              <div ref={heartWrap} style={{ display: "flex", justifyContent: "center", animation: revealed ? "nkHeartPop 700ms var(--ease-out)" : "none" }}>
                <ScratchReveal lang={lang} width={286} height={256} foil={SAGE_FOIL} hint={" "} onReveal={onReveal}><HeartDate c={c} ta={ta} shown={revealed} /></ScratchReveal>
              </div>
            </Reveal>
            <div style={{ width: "100%", maxWidth: 260, marginTop: 8, transform: revealed ? "scale(1.03)" : "none", transition: "transform 700ms var(--ease-out) 700ms" }}>
              <div style={{ padding: 4, borderRadius: 999, background: "linear-gradient(135deg, rgba(230,205,148,.9), rgba(111,122,69,.5), rgba(230,205,148,.9))", boxShadow: "0 10px 24px rgba(70,83,45,.28)" }}>
                <PillButton lang={lang} icon="calendar-heart" onClick={saveTheDate}>{c.save}</PillButton>
              </div>
            </div>
          </section>

          <Block label="04 Countdown" pad="40px 24px 56px" gap={18}>
            <Reveal root={sc}><ScriptTitle ta={ta} size={38}>{c.countdown}</ScriptTitle></Reveal>
            <Reveal root={sc} delay={120}><FlipCountdown lang={lang} /></Reveal>
          </Block>

          <Block label="05 Program" pad="40px 28px 56px" gap={22}>
            <Reveal root={sc}><ScriptTitle ta={ta} size={40}>{PROGRAM[lang].title}</ScriptTitle></Reveal>
            <Reveal root={sc} delay={60}><TinyHeart w={90} /></Reveal>
            <ProgramTimeline root={sc} lang={lang} ta={ta} body={body} />
          </Block>

          <Block label="06 Venue" pad="40px 22px 56px" gap={10}>
            <Reveal root={sc}><div style={{ display: "flex", justifyContent: "center", color: "var(--text-accent)" }}><Icon name="map-pin" size={22} /></div></Reveal>
            <Reveal root={sc} delay={80}><ScriptTitle ta={ta} size={40}>{c.venue}</ScriptTitle></Reveal>
            <Reveal root={sc} delay={160}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, fontFamily: body }}>
                <div style={{ fontWeight: 600, fontSize: ta ? 16 : 19 }}>{c.vName}</div>
                <div style={{ fontSize: ta ? 13 : 15, lineHeight: 1.5, color: "var(--text-muted)", textWrap: "pretty" }}>{c.vAddr}</div>
                <div style={{ fontSize: ta ? 13 : 14, fontStyle: ta ? "normal" : "italic", color: "var(--text-accent)", marginTop: 2 }}>{c.vTime}</div>
              </div>
            </Reveal>
            <Reveal root={sc} delay={240}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
                <div style={{ padding: 6, borderRadius: 20, border: "1px solid #6f7a45", background: "#fbf6ea", boxShadow: "0 10px 24px rgba(70,83,45,.18), inset 0 0 0 3px #fbf6ea, inset 0 0 0 4px rgba(111,122,69,.35)" }}>
                  <div style={{ height: 200, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(111,122,69,.4)" }}>
                    <iframe title={c.venue} src={MAPS_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ width: "100%", height: "100%", border: 0, display: "block", filter: "sepia(.2) saturate(.85)" }}></iframe>
                  </div>
                </div>
                <div style={{ borderRadius: 999, boxShadow: "0 8px 20px rgba(70,83,45,.3)", "--action-bg": "linear-gradient(135deg, #6f7a45, #56653a)" }}>
                  <PillButton lang={lang} icon="map-pin" href={MAPS_URL} target="_blank">{c.maps}</PillButton>
                </div>
              </div>
            </Reveal>
          </Block>

          <Block label="07 Presence" pad="56px 30px 96px" gap={12}>
            <Reveal root={sc}><ScriptTitle ta={ta} size={36}>{c.presence}</ScriptTitle></Reveal>
            <Reveal root={sc} delay={80}><TinyHeart /></Reveal>
            {PRESENCE[lang].map((p, i) => <Reveal key={p} root={sc} delay={140 + i * 90}><div lang={lang} style={{ fontFamily: body, fontSize: ta ? 15 : 18, lineHeight: 1.35 }}>{p}</div></Reveal>)}
            <div style={{ fontFamily: body, fontSize: 11, letterSpacing: ta ? 0 : ".12em", color: "var(--text-muted)" }}>{c.credit}</div>
          </Block>
        </div>
      </div>
    </div>
  );
}

/* Per-guest language links: ?ta → Tamil only, ?en → English only (switch hidden). No parameter → guest can switch. */
function linkLang() {
  const built = import.meta.env.VITE_LANG;
  if (built === "ta" || built === "en") return built;
  try {
    const q = new URLSearchParams(window.location.search);
    const v = (q.get("lang") || (q.has("ta") ? "ta" : q.has("en") ? "en" : "")).toLowerCase();
    return v === "ta" || v === "en" ? v : null;
  } catch (e) { return null; }
}

export function InvitationApp() {
  const [fixed] = React.useState(linkLang);
  const [lang, setLangS] = React.useState(() => fixed || (store.get("nk-lang") === "ta" ? "ta" : "en"));
  const [opened, setOpened] = React.useState(false);
  const setLang = fixed ? null : (l) => { store.set("nk-lang", l); setLangS(l); };
  React.useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return (
    <div className="nk-stage">
      <div className="nk-phone nk-root">
        <Invitation lang={lang} setLang={setLang} opened={opened} />
        <GateDoors lang={lang} onOpen={() => setOpened(true)} />
      </div>
    </div>
  );
}
