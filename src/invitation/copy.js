/* All invitation copy, English + Tamil. Tamil lines marked (review) were written by the design assistant and await a native reader. */
export const COPY = {
  en: {
    title: "Nikkah Invitation",
    host: "Peerkalam Mr. P.M. Mujibur Rahman & Bros",
    invite: "With the blessings of Allah and the prayers of our loved ones, we invite you to share in the joy of our Nikkah.",
    scratch: "Scratch to Reveal", forever: "Our forever begins", invited: "You're Invited",
    dateLong: "December 13, 2026", weekday: "Sunday", time: "12:00 PM", hijri: "Rajab 4, 1448 AH",
    save: "Save the date", maps: "View on maps", venue: "Venue", countdown: "Counting Down to Forever",
    vName: "Sulthar Habeebullah Mahal", vAddr: "Ponnagoundanur Road, Pallapatti - 639 207", vTime: "Nikkah at 12:00 PM",
    presence: "Presence Expecting", credit: "Designed by Absze Technology", scrollDown: "Scroll down",
  },
  ta: {
    title: "நிக்காஹ் (எ) திருமண அழைப்பிதழ்",
    host: "பீர்கலாம் Mr. P.M. முஜிபுர் ரஹ்மான் & பிரதர்ஸ்",
    invite: "அல்லாஹ்வின் அருளாலும் எங்கள் அன்புக்குரியவர்களின் துஆவினாலும், எங்கள் நிக்காஹ்வின் மகிழ்ச்சியில் பங்கேற்க உங்களை அன்புடன் அழைக்கிறோம்.",
    scratch: "தேதியை அறிய தேய்க்கவும்", forever: "எங்கள் இனிய பயணம் தொடங்குகிறது", invited: "அன்புடன் அழைக்கிறோம்",
    dateLong: "டிசம்பர் 13, 2026", weekday: "ஞாயிறு", time: "மதியம் 12:00", hijri: "ரஜப் 4, ஹிஜ்ரி 1448",
    save: "தேதியை சேமிக்கவும்", maps: "வரைபடத்தில் காண்க", venue: "இடம்", countdown: "நிக்காஹ்விற்கு இன்னும்",
    vName: "சுல்தார் ஹபீபுல்லாஹ் மஹால்", vAddr: "பொன்னகவுண்டனூர் ரோடு, பள்ளப்பட்டி - 639 207", vTime: "நிக்காஹ் மதியம் 12:00 மணிக்கு",
    presence: "தங்கள் நல்வரவை நாடும்", credit: "வடிவமைப்பு: Absze Technology", scrollDown: "கீழே உருட்டவும்",
  },
};

export const NAMES = {
  en: { groom: "Mohamed Ahnaf", groomTitle: "B.Sc(CS)", groomParent: "Son of Peerkalam Mr. P.M. Mujibur Rahman", bride: "Sulaiha Faslin", brideTitle: "Aalima", brideParent: "Daughter of Kenthapodi Mr. K.S. Sheik Fareed" },
  ta: { groom: "முகமது அஹ்னஃப்", groomTitle: "B.Sc.(CS)", groomParent: "பீர்கலம் P.M. முஜிபுர் ரஹ்மான் அவர்களின் மகன்", bride: "சுலைஹா பாஸ்லின்", brideTitle: "ஆலிமா", brideParent: "கெந்தபொடி K.S. ஷேக் பரீத் அவர்களின் மகள்" },
};

export const PROGRAM = {
  en: { title: "Program Timeline", items: [["9 – 10 AM", "Morning Breakfast", "sun"], ["12:00 PM", "Nikkah", "heart"], ["1 – 3 PM", "Lunch", "clock"]] },
  ta: { title: "நிகழ்ச்சி நேர அட்டவணை", items: [["காலை 9 – 10", "காலை சிற்றுண்டி", "sun"], ["மதியம் 12:00", "நிக்காஹ்", "heart"], ["மதியம் 1 – 3", "மதிய விருந்து", "clock"]] },
};

export const UNITS = { en: ["Days", "Hours", "Minutes", "Seconds"], ta: ["நாட்கள்", "மணி", "நிமிடம்", "விநாடி"] };

export const PRESENCE = {
  en: ["Saha Sheik Abdul Khadar", "Dindukalam Mohamed Ibrahim & Bros", "Vethalaikara Sadam Hussain & Bros"],
  ta: ["ஷாகா ஷேக் அப்துல் காதர்", "திண்டுக்கலாம் முகமது இப்ராஹிம் & பிரதர்ஸ்", "வெத்தலைக்கார சதாம் ஹுசைன் & பிரதர்ஸ்"],
};

export const EVENT_START = "2026-12-13T12:00:00+05:30";
const VENUE_Q = "Sulthar Habeebullah Mahal, Ponnagoundanur Road, Pallapatti 639207";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(VENUE_Q);
export const MAPS_EMBED = "https://maps.google.com/maps?q=" + encodeURIComponent(VENUE_Q) + "&z=15&output=embed";

const CAL = {
  title: "Nikkah of Mohamed Ahnaf & Sulaiha Faslin",
  start: "20261213T063000Z", end: "20261213T093000Z", // 12:00 PM – 3:00 PM IST
  location: "Sulthar Habeebullah Mahal, Ponnagoundanur Road, Pallapatti - 639 207",
  details: "Nikkah at 12:00 PM. With the blessings of Allah, we invite you to share in the joy of our Nikkah.",
};
const GOOGLE_CAL = "https://calendar.google.com/calendar/render?action=TEMPLATE"
  + "&text=" + encodeURIComponent(CAL.title) + "&dates=" + CAL.start + "/" + CAL.end
  + "&location=" + encodeURIComponent(CAL.location) + "&details=" + encodeURIComponent(CAL.details) + "&ctz=Asia/Kolkata";

/**
 * Open the guest's calendar with the Nikkah already filled in — they confirm with one tap.
 * (Browsers never allow a website to write to a calendar silently.)
 *  - iPhone / iPad: opens public/nikkah.ics → iOS shows its "Add to Calendar" sheet (with 1-day and 2-hour reminders).
 *  - Android: opens Google Calendar's prefilled "Save event" screen (the app, if installed).
 *  - Computers: downloads the .ics, which opens in Outlook / Apple Calendar / etc.
 * Must be called from a tap so the browser allows it.
 */
export function saveTheDate() {
  const ua = navigator.userAgent || "";
  const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const ics = new URL(import.meta.env.BASE_URL + "nikkah.ics", window.location.href).href;
  if (ios) { window.location.href = ics; return; }
  if (/Android/i.test(ua)) { const w = window.open(GOOGLE_CAL, "_blank"); if (w) w.opener = null; else window.location.href = GOOGLE_CAL; return; }
  const a = document.createElement("a"); a.href = ics; a.download = "ahnaf-sulaiha-nikkah.ics";
  document.body.appendChild(a); a.click(); a.remove();
}
