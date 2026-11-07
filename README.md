# Ahnaf & Sulaiha · Nikkah invitation (Tamil only)

Tamil-only edition of the invitation: no language switch. `.env.production` sets `VITE_LANG=ta`; delete it to get the bilingual site back.
Import into Vercel as-is: the settings are in `vercel.json`.


Production build of the Claude Design prototype `project/ui_kits/invitation/index.html`.
Vite + React. It builds to a static site, so it can be hosted anywhere and shared as a WhatsApp link.

```bash
npm install
npm run dev      # local preview
npm run build    # → dist/ (static; works at a domain root or any sub-path)
```

## Flow
1. **Gate doors** (`effects.jsx › GateDoors`): leaf-embossed doors with a "Tap to open" plaque that breathes and twinkles. A tap sends a light sweep, a flash and star glints, then the doors swing outward (2.4s).
2. **Green curtain clip**: the first 2.5s of `curtain-intro.mp4` plays, then the frame splits and slides off left and right. If the clip can't play, the curtain fades out, so it never blocks the page.
3. **Home** (`home.jsx`): `home-video.mp4` plays once and freezes on its last frame, with twinkling gold sparkles over it. The Bismillah, "Nikkah Invitation", then the groom and bride names in gold foil with their qualifications and parent lines, all fade in one after another. Scrolling stays locked until everything has appeared (9.5s), then "Scroll down" shows.
4. **Ivory/olive sections** (`.nk-green`), with the AS monogram as a fixed watermark: wording → scratch heart (sage glitter, sparkle burst, "Save the date" .ics) → flip-clock countdown → program timeline (the line draws itself and a gold bead lights each event) → venue with framed map and "View on maps" → Presence Expecting + credit.
5. **Floating controls** (`dock.jsx`): EN/த switch bottom-left, back-to-top with a scroll-progress ring bottom-right.

## Language links (one per guest group)
- `https://<site>/?ta`: Tamil only. The EN/த switch is hidden.
- `https://<site>/?en`: English only. The switch is hidden.
- `https://<site>/`: guests can switch (opens in English, or in the language they last chose).

`?lang=ta` / `?lang=en` work too.

## Tamil-only build
Build with `VITE_LANG=ta` (for example, set it as a Vercel environment variable, or put it in `.env.production`). The site is then Tamil only: no switch, and URL parameters are ignored.

## Structure
- `src/styles/`: design-system tokens copied from `project/tokens/`, minus the dusk theme the client removed. `app.css` holds the page shell, the olive section theme and the keyframes.
- `src/components/`: design-system primitives copied unchanged (Icon, PillButton, ScratchReveal, Bismillah).
- `src/invitation/copy.js`: **all English/Tamil copy, names, program, venue and event time.** Edit text here.
- `public/assets/`: optimised media (doors → WebP, curtain clip trimmed to 3s, audio removed). About 1.6 MB in total, down from about 11 MB in the prototype.

## Open items carried over from the design chats
- The Tamil wording was written by the design assistant and needs a native reader.
- The printed card names two halls (Haji Habeeb Shadhi Mahal / Sulthar Habeebullah Mahal). This build uses the Venue line.
