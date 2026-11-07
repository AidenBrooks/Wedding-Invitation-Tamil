import React from "react";

const PATHS = {
  "calendar-heart": ["M3 10h18V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7", "M8 2v4", "M16 2v4", "M21.29 14.7a2.43 2.43 0 0 0-2.65-.52c-.3.12-.57.3-.8.53l-.34.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L17.5 22l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z"],
  "map-pin": ["M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0", { c: [12, 10, 3] }],
  heart: ["M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"],
  clock: [{ c: [12, 12, 10] }, "M12 6v6l4 2"],
  navigation: ["M3 11 22 2 13 21 11 13 3 11Z"],
  calendar: ["M8 2v4", "M16 2v4", "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z", "M3 10h18"],
  sun: [{ c: [12, 12, 4] }, "M12 2v2", "M12 20v2", "m4.93 4.93 1.41 1.41", "m17.66 17.66 1.41 1.41", "M2 12h2", "M20 12h2", "m6.34 17.66-1.41 1.41", "m19.07 4.93-1.41 1.41"],
  moon: ["M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"],
};

/** Lucide line icons (ISC) at the brand's 1.5px stroke. */
export function Icon({ name, size = 20, strokeWidth = 1.5, color = "currentColor", style, title }) {
  const parts = PATHS[name];
  if (!parts) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", display: "block", ...style }}
      role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {parts.map((p, i) => typeof p === "string" ? <path key={i} d={p} /> : <circle key={i} cx={p.c[0]} cy={p.c[1]} r={p.c[2]} />)}
    </svg>
  );
}
Icon.names = Object.keys(PATHS);
