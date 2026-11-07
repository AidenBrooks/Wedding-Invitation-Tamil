import React from "react";

/** The Bismillah, set in Aref Ruqaa. Always the first line of the invitation, in both languages. */
export function Bismillah({ size = 26, style }) {
  return (
    <div lang="ar" dir="rtl" aria-label="Bismillah ir-Rahman ir-Raheem"
      style={{ fontFamily: "var(--font-arabic)", fontSize: size, lineHeight: 1.6, color: "var(--text-accent)", textAlign: "center", ...style }}>
      بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
    </div>
  );
}
