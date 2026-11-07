import React from "react";
import { Icon } from "./Icon.jsx";

/** Full-width pill action. Solid = primary (Save the date), outline = secondary (View on maps). */
export function PillButton({ children, variant = "solid", icon, href, onClick, disabled = false, lang, fullWidth = true, target }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const solid = variant === "solid";
  const ta = lang === "ta";
  const style = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
    width: fullWidth ? "100%" : "auto", minHeight: 48, padding: "0 24px", borderRadius: "var(--radius-pill)",
    fontFamily: ta ? "var(--font-tamil)" : "var(--font-serif)", fontSize: ta ? 14 : 17, fontWeight: 600, letterSpacing: ta ? 0 : ".04em",
    textDecoration: "none", cursor: disabled ? "default" : "pointer", boxSizing: "border-box",
    background: solid ? (press ? "var(--action-bg-press)" : hover ? "var(--text-accent)" : "var(--action-bg)") : (hover || press ? "var(--action-ghost-hover-bg, var(--surface-sunken))" : "transparent"),
    color: solid ? "var(--action-fg)" : (hover || press ? "var(--action-ghost-hover-fg, var(--action-ghost-fg))" : "var(--action-ghost-fg)"),
    border: solid ? "1px solid transparent" : "1px solid var(--action-ghost-border)",
    opacity: disabled ? 0.45 : 1, transform: press ? "scale(0.98)" : "scale(1)",
    transition: "background var(--dur-press), color var(--dur-press), transform var(--dur-press), box-shadow var(--dur-press)",
    boxShadow: !solid && (hover || press) ? "var(--action-ghost-hover-shadow, none)" : "none",
    WebkitTapHighlightColor: "transparent",
  };
  const handlers = disabled ? {} : {
    onMouseEnter: () => setHover(true), onMouseLeave: () => { setHover(false); setPress(false); },
    onPointerDown: () => setPress(true), onPointerUp: () => setPress(false), onClick,
  };
  const content = <>{icon && <Icon name={icon} size={19} />}<span lang={lang}>{children}</span></>;
  return href && !disabled
    ? <a href={href} target={target} rel={target === "_blank" ? "noopener" : undefined} style={style} {...handlers}>{content}</a>
    : <button type="button" disabled={disabled} style={style} {...handlers}>{content}</button>;
}
