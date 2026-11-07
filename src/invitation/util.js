/** Resolve a file in /public against Vite's base, so the build works from any sub-path. */
export const asset = (p) => import.meta.env.BASE_URL + p;

export const reduceMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* WhatsApp / in-app browsers can throw on storage access — never let that break the page. */
export const store = {
  get(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} },
};

export const EASE = "cubic-bezier(.22,.8,.24,1)";
