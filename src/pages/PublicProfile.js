import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { QRCodeCanvas } from "qrcode.react";

/* ─────────────────────────────────────────────
   FONT LOADER
───────────────────────────────────────────── */
function injectFont(href) {
  if (!href || document.querySelector(`link[href="${href}"]`)) return;
  const el = document.createElement("link");
  el.rel  = "stylesheet";
  el.href = href;
  document.head.appendChild(el);
}

/* ─────────────────────────────────────────────
   THEME KEY NORMALISER
   Maps any backend value → one of the 4 keys
───────────────────────────────────────────── */
function resolveTheme(raw) {
  const map = {
    default:     "white",
    minimal:     "white",
    clean_white: "white",
    white:       "white",
    dark:        "midnight",
    midnight:    "midnight",
    glass:       "midnight",
    cyber:       "cyber",
    cyberneural: "cyber",
    gradient:    "sunrise",
    sunrise:     "sunrise",
  };
  return map[raw] || "white";
}

/* ─────────────────────────────────────────────
   THEME DEFINITIONS
───────────────────────────────────────────── */
const THEMES = {

  /* ══════════════════════════════
     1. CLEAN WHITE
  ══════════════════════════════ */
  white: {
    fontUrl:     "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap",
    displayFont: "'Playfair Display', Georgia, serif",
    bodyFont:    "'DM Sans', system-ui, sans-serif",

    pageBg:      "#f0ede8",
    pageBgImage: "none",
    pageBgSize:  "auto",

    cardBg:      "#ffffff",
    cardBorder:  "1px solid rgba(0,0,0,0.07)",
    cardShadow:  "0 8px 60px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
    cardRadius:  "24px",

    headerBg:    "linear-gradient(135deg, #2d6a4f 0%, #1a3f2e 100%)",
    headerH:     "110px",

    avatarBorder:"4px solid #ffffff",
    avatarShadow:"0 4px 20px rgba(0,0,0,0.12)",
    avatarRadius:"50%",

    nameColor:   "#111111",
    nameSz:      "1.7rem",
    nameWt:      "700",
    nameLS:      "normal",
    nameTS:      "none",
    userColor:   "#888888",
    bioColor:    "#555555",

    accent:      "#2d6a4f",
    accentText:  "#ffffff",

    divider:     "rgba(0,0,0,0.08)",

    secColor:    "#111111",
    secBorder:   "#2d6a4f",
    secSz:       "0.78rem",
    secLS:       "0.12em",

    linkBg:      "#111111",
    linkColor:   "#ffffff",
    linkBorder:  "none",
    linkRadius:  "10px",

    ctaBg:       "#f5f2ed",
    ctaColor:    "#333333",
    ctaBorder:   "1px solid #e0dcd5",

    socialColor: "#2d6a4f",

    inputBg:     "#f5f2ed",
    inputBorder: "1px solid #ddd8d0",
    inputColor:  "#111111",
    inputPH:     "#aaaaaa",
    inputFocus:  "#2d6a4f",

    submitBg:    "#111111",
    submitColor: "#ffffff",

    svcBg:       "#f5f2ed",
    svcBorder:   "1px solid #e8e4de",
    testiBg:     "#f9f7f4",
    testiBorder: "1px solid #e8e4de",
    portBg:      "#f5f2ed",
    portBorder:  "1px solid #e8e4de",

    qrBg:        "#f5f2ed",
    qrBorder:    "1px solid #e0dcd5",
    qrFg:        "#111111",
    qrBgColor:   "#f5f2ed",

    downloadBg:  "#f5f2ed",
    downloadColor:"#333333",
    downloadBorder:"1px solid #e0dcd5",

    waColor:     "#25d366",
    waBorder:    "rgba(37,211,102,0.25)",
    waBg:        "#f0fff5",
  },

  /* ══════════════════════════════
     2. MIDNIGHT
  ══════════════════════════════ */
  midnight: {
    fontUrl:     "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Jost:wght@300;400;500&display=swap",
    displayFont: "'Cormorant Garamond', Georgia, serif",
    bodyFont:    "'Jost', system-ui, sans-serif",

    pageBg:      "#07090f",
    pageBgImage: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,168,80,0.06) 0%, transparent 70%)",
    pageBgSize:  "auto",

    cardBg:      "linear-gradient(160deg, #12192d 0%, #0c1322 100%)",
    cardBorder:  "1px solid rgba(200,168,80,0.18)",
    cardShadow:  "0 30px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,168,80,0.05)",
    cardRadius:  "20px",

    headerBg:    "linear-gradient(135deg, #1c2c50 0%, #0f1929 100%)",
    headerH:     "110px",

    avatarBorder:"3px solid rgba(200,168,80,0.55)",
    avatarShadow:"0 0 30px rgba(200,168,80,0.18), 0 4px 20px rgba(0,0,0,0.5)",
    avatarRadius:"50%",

    nameColor:   "#f0dfa0",
    nameSz:      "1.9rem",
    nameWt:      "700",
    nameLS:      "0.02em",
    nameTS:      "none",
    userColor:   "rgba(200,168,80,0.5)",
    bioColor:    "rgba(255,255,255,0.5)",

    accent:      "#c8a850",
    accentText:  "#07090f",

    divider:     "rgba(200,168,80,0.12)",

    secColor:    "#f0dfa0",
    secBorder:   "rgba(200,168,80,0.35)",
    secSz:       "0.78rem",
    secLS:       "0.12em",

    linkBg:      "rgba(200,168,80,0.1)",
    linkColor:   "#f0dfa0",
    linkBorder:  "1px solid rgba(200,168,80,0.25)",
    linkRadius:  "10px",

    ctaBg:       "rgba(255,255,255,0.06)",
    ctaColor:    "#f0dfa0",
    ctaBorder:   "1px solid rgba(255,255,255,0.1)",

    socialColor: "#c8a850",

    inputBg:     "rgba(255,255,255,0.04)",
    inputBorder: "1px solid rgba(200,168,80,0.2)",
    inputColor:  "#f0dfa0",
    inputPH:     "rgba(200,168,80,0.35)",
    inputFocus:  "#c8a850",

    submitBg:    "rgba(200,168,80,0.15)",
    submitColor: "#f0dfa0",

    svcBg:       "rgba(255,255,255,0.03)",
    svcBorder:   "1px solid rgba(200,168,80,0.12)",
    testiBg:     "rgba(255,255,255,0.03)",
    testiBorder: "1px solid rgba(200,168,80,0.1)",
    portBg:      "rgba(255,255,255,0.03)",
    portBorder:  "1px solid rgba(200,168,80,0.12)",

    qrBg:        "rgba(0,0,0,0.35)",
    qrBorder:    "1px solid rgba(200,168,80,0.2)",
    qrFg:        "#f0dfa0",
    qrBgColor:   "#0c1322",

    downloadBg:  "rgba(255,255,255,0.06)",
    downloadColor:"#f0dfa0",
    downloadBorder:"1px solid rgba(200,168,80,0.2)",

    waColor:     "#25d366",
    waBorder:    "rgba(37,211,102,0.25)",
    waBg:        "rgba(37,211,102,0.07)",
  },

  /* ══════════════════════════════
     3. CYBER NEURAL
  ══════════════════════════════ */
  cyber: {
    fontUrl:     "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap",
    displayFont: "'Orbitron', monospace",
    bodyFont:    "'Rajdhani', system-ui, sans-serif",

    pageBg:      "#04060f",
    pageBgImage: "linear-gradient(rgba(0,210,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.022) 1px, transparent 1px)",
    pageBgSize:  "36px 36px",

    cardBg:      "linear-gradient(145deg, #080f24 0%, #0a1530 100%)",
    cardBorder:  "1px solid rgba(0,210,255,0.22)",
    cardShadow:  "0 0 80px rgba(0,210,255,0.06), 0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(0,210,255,0.1)",
    cardRadius:  "6px",

    headerBg:    "linear-gradient(135deg, #071428 0%, #03090f 100%)",
    headerH:     "110px",

    avatarBorder:"2px solid rgba(0,210,255,0.65)",
    avatarShadow:"0 0 25px rgba(0,210,255,0.45), 0 0 60px rgba(0,210,255,0.12)",
    avatarRadius:"4px",

    nameColor:   "#00d2ff",
    nameSz:      "1.3rem",
    nameWt:      "700",
    nameLS:      "0.07em",
    nameTS:      "0 0 20px rgba(0,210,255,0.6)",
    userColor:   "rgba(0,210,255,0.45)",
    bioColor:    "rgba(120,190,255,0.65)",

    accent:      "#00d2ff",
    accentText:  "#04060f",

    divider:     "rgba(0,210,255,0.08)",

    secColor:    "#00d2ff",
    secBorder:   "rgba(0,210,255,0.25)",
    secSz:       "0.7rem",
    secLS:       "0.2em",

    linkBg:      "rgba(0,210,255,0.07)",
    linkColor:   "#00d2ff",
    linkBorder:  "1px solid rgba(0,210,255,0.28)",
    linkRadius:  "4px",

    ctaBg:       "rgba(0,210,255,0.06)",
    ctaColor:    "#00d2ff",
    ctaBorder:   "1px solid rgba(0,210,255,0.22)",

    socialColor: "#00d2ff",

    inputBg:     "rgba(0,210,255,0.04)",
    inputBorder: "1px solid rgba(0,210,255,0.18)",
    inputColor:  "#80d0ff",
    inputPH:     "rgba(0,210,255,0.3)",
    inputFocus:  "#00d2ff",

    submitBg:    "rgba(0,210,255,0.12)",
    submitColor: "#00d2ff",

    svcBg:       "rgba(0,210,255,0.04)",
    svcBorder:   "1px solid rgba(0,210,255,0.12)",
    testiBg:     "rgba(0,210,255,0.03)",
    testiBorder: "1px solid rgba(0,210,255,0.1)",
    portBg:      "rgba(0,210,255,0.04)",
    portBorder:  "1px solid rgba(0,210,255,0.12)",

    qrBg:        "rgba(0,0,0,0.5)",
    qrBorder:    "1px solid rgba(0,210,255,0.22)",
    qrFg:        "#00d2ff",
    qrBgColor:   "#04060f",

    downloadBg:  "rgba(0,210,255,0.06)",
    downloadColor:"#00d2ff",
    downloadBorder:"1px solid rgba(0,210,255,0.22)",

    waColor:     "#25d366",
    waBorder:    "rgba(37,211,102,0.25)",
    waBg:        "rgba(37,211,102,0.06)",
  },

  /* ══════════════════════════════
     4. SUNRISE
  ══════════════════════════════ */
  sunrise: {
    fontUrl:     "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
    displayFont: "'Plus Jakarta Sans', system-ui, sans-serif",
    bodyFont:    "'Plus Jakarta Sans', system-ui, sans-serif",

    pageBg:      "#ff6b35",
    pageBgImage: "linear-gradient(135deg, #ff6b35 0%, #f7931e 40%, #ffcd3c 75%, #ff6b9d 100%)",
    pageBgSize:  "auto",

    cardBg:      "rgba(255,255,255,0.97)",
    cardBorder:  "none",
    cardShadow:  "0 25px 80px rgba(255,107,53,0.2), 0 4px 20px rgba(0,0,0,0.06)",
    cardRadius:  "28px",

    headerBg:    "linear-gradient(135deg, #ff6b35 0%, #f7931e 60%, #ffcd3c 100%)",
    headerH:     "120px",

    avatarBorder:"4px solid #ffffff",
    avatarShadow:"0 8px 30px rgba(255,107,53,0.28)",
    avatarRadius:"50%",

    nameColor:   "#1a0a00",
    nameSz:      "1.7rem",
    nameWt:      "800",
    nameLS:      "normal",
    nameTS:      "none",
    userColor:   "#ff6b35",
    bioColor:    "#6b4030",

    accent:      "#ff6b35",
    accentText:  "#ffffff",

    divider:     "rgba(255,107,53,0.12)",

    secColor:    "#1a0a00",
    secBorder:   "#ff6b35",
    secSz:       "0.78rem",
    secLS:       "0.1em",

    linkBg:      "linear-gradient(135deg, #ff6b35, #f7931e)",
    linkColor:   "#ffffff",
    linkBorder:  "none",
    linkRadius:  "12px",

    ctaBg:       "#fff5f0",
    ctaColor:    "#ff6b35",
    ctaBorder:   "1px solid #ffd4c2",

    socialColor: "#ff6b35",

    inputBg:     "#fff5f0",
    inputBorder: "1px solid #ffd4c2",
    inputColor:  "#1a0a00",
    inputPH:     "#cc9988",
    inputFocus:  "#ff6b35",

    submitBg:    "linear-gradient(135deg, #ff6b35, #f7931e)",
    submitColor: "#ffffff",

    svcBg:       "#fff8f5",
    svcBorder:   "1px solid #ffd4c2",
    testiBg:     "#fffaf8",
    testiBorder: "1px solid #ffd4c2",
    portBg:      "#fff8f5",
    portBorder:  "1px solid #ffd4c2",

    qrBg:        "#fff5f0",
    qrBorder:    "1px solid #ffd4c2",
    qrFg:        "#1a0a00",
    qrBgColor:   "#fff5f0",

    downloadBg:  "#fff5f0",
    downloadColor:"#ff6b35",
    downloadBorder:"1px solid #ffd4c2",

    waColor:     "#25d366",
    waBorder:    "rgba(37,211,102,0.3)",
    waBg:        "#f0fff5",
  },
};

/* ─────────────────────────────────────────────
   CSS FACTORY  (generates scoped class styles)
───────────────────────────────────────────── */
function buildCSS(t, key) {
  return `
    .dq *{box-sizing:border-box;margin:0;padding:0}
    .dq{
      font-family:${t.bodyFont};
      min-height:100vh;
      background-color:${t.pageBg};
      background-image:${t.pageBgImage};
      background-size:${t.pageBgSize};
      display:flex;
      justify-content:center;
      align-items:flex-start;
      padding:32px 16px 64px;
    }
    .dq-card{
      width:100%;max-width:448px;
      background:${t.cardBg};
      border:${t.cardBorder};
      box-shadow:${t.cardShadow};
      border-radius:${t.cardRadius};
      overflow:hidden;
      animation:dqUp .45s cubic-bezier(.22,1,.36,1) both;
      ${key==="cyber"?"position:relative;":""}
    }
    ${key==="cyber"?`.dq-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,210,255,.9),transparent);z-index:1}`:""}
    .dq-header{
      height:${t.headerH};
      background:${t.headerBg};
      position:relative;flex-shrink:0;
    }
    .dq-avatar-wrap{
      position:absolute;bottom:-44px;left:50%;transform:translateX(-50%);
    }
    .dq-avatar,.dq-avatar-ph{
      width:90px;height:90px;
      border-radius:${t.avatarRadius};
      border:${t.avatarBorder};
      box-shadow:${t.avatarShadow};
      object-fit:cover;display:block;
    }
    .dq-avatar-ph{
      background:rgba(255,255,255,0.12);
      display:flex;align-items:center;justify-content:center;
      font-size:2rem;
    }
    .dq-body{
      padding:56px 28px 36px;text-align:center;
    }
    .dq-name{
      font-family:${t.displayFont};
      color:${t.nameColor};
      font-size:${t.nameSz};
      font-weight:${t.nameWt};
      letter-spacing:${t.nameLS};
      text-shadow:${t.nameTS};
      line-height:1.2;margin-bottom:5px;
    }
    .dq-user{
      color:${t.userColor};font-size:.8rem;margin-bottom:12px;
      letter-spacing:${key==="cyber"?".18em":".04em"};
      ${key==="cyber"?"text-transform:uppercase;":""}
    }
    .dq-bio{
      color:${t.bioColor};font-size:.92rem;line-height:1.65;
      max-width:320px;margin:0 auto 24px;
    }
    .dq-divider{height:1px;background:${t.divider};margin:20px 0}
    .dq-section{text-align:left;margin-bottom:24px}
    .dq-sec-title{
      font-family:${t.displayFont};
      color:${t.secColor};
      font-size:${t.secSz};font-weight:600;
      text-transform:uppercase;letter-spacing:${t.secLS};
      padding-bottom:9px;
      border-bottom:1px solid ${t.secBorder};
      margin-bottom:14px;
    }
    .dq-cta-row{
      display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:20px;
    }
    .dq-cta{
      display:inline-flex;align-items:center;gap:6px;
      padding:9px 20px;border-radius:100px;
      font-family:${t.bodyFont};font-size:.84rem;font-weight:500;
      text-decoration:none;cursor:pointer;
      background:${t.ctaBg};color:${t.ctaColor};border:${t.ctaBorder};
      transition:opacity .2s,transform .15s;
    }
    .dq-cta:hover{opacity:.8;transform:translateY(-1px)}
    .dq-social-row{
      display:flex;justify-content:center;gap:22px;flex-wrap:wrap;margin-bottom:20px;
    }
    .dq-social{
      font-family:${t.bodyFont};font-size:.78rem;font-weight:500;
      color:${t.socialColor};text-decoration:none;
      text-transform:uppercase;letter-spacing:.08em;
      transition:opacity .2s;
    }
    .dq-social:hover{opacity:.65}
    .dq-link{
      display:block;width:100%;padding:13px 20px;
      border-radius:${t.linkRadius};
      font-family:${t.bodyFont};font-size:.9rem;font-weight:500;
      text-align:center;text-decoration:none;
      background:${t.linkBg};color:${t.linkColor};
      border:${t.linkBorder||"none"};
      margin-bottom:9px;
      transition:opacity .2s,transform .15s;letter-spacing:.02em;
    }
    .dq-link:hover{opacity:.85;transform:translateY(-2px)}
    .dq-svc{
      background:${t.svcBg};border:${t.svcBorder};
      border-radius:10px;padding:14px 16px;margin-bottom:10px;
    }
    .dq-svc-title{
      font-family:${t.displayFont};color:${t.nameColor};
      font-size:1rem;font-weight:600;margin-bottom:4px;
    }
    .dq-svc-desc{color:${t.bioColor};font-size:.85rem;line-height:1.55}
    .dq-port{
      display:flex;align-items:center;gap:10px;
      padding:12px 16px;border-radius:10px;
      text-decoration:none;background:${t.portBg};
      border:${t.portBorder};margin-bottom:8px;
      transition:opacity .2s,transform .15s;
    }
    .dq-port:hover{opacity:.78;transform:translateY(-1px)}
    .dq-port-icon{font-size:.95rem;flex-shrink:0}
    .dq-port-title{color:${t.accent};font-size:.9rem;font-weight:500}
    .dq-testi{
      background:${t.testiBg};border:${t.testiBorder};
      border-radius:10px;padding:14px 16px;margin-bottom:10px;
    }
    .dq-testi-name{color:${t.nameColor};font-weight:600;font-size:.88rem;margin-bottom:4px}
    .dq-testi-text{color:${t.bioColor};font-size:.85rem;line-height:1.55;font-style:italic}
    .dq-quote{color:${t.accent};font-size:1.4rem;line-height:1;opacity:.45;margin-right:2px}
    .dq-input{
      width:100%;padding:11px 14px;border-radius:8px;
      font-family:${t.bodyFont};font-size:.9rem;
      background:${t.inputBg};border:${t.inputBorder};
      color:${t.inputColor};outline:none;margin-bottom:10px;
      transition:border-color .2s;
      ${key==="cyber"?"letter-spacing:.04em;":""}
    }
    .dq-input::placeholder{color:${t.inputPH}}
    .dq-input:focus{border-color:${t.inputFocus}}
    .dq-textarea{resize:vertical;min-height:88px}
    .dq-submit{
      width:100%;padding:13px 20px;border-radius:8px;
      font-family:${t.bodyFont};font-size:.9rem;font-weight:600;
      background:${t.submitBg};color:${t.submitColor};
      border:none;cursor:pointer;letter-spacing:.05em;
      transition:opacity .2s,transform .15s;
    }
    .dq-submit:hover:not(:disabled){opacity:.88;transform:translateY(-1px)}
    .dq-submit:disabled{opacity:.45;cursor:not-allowed}
    .dq-qr-wrap{text-align:center;margin-top:8px}
    .dq-qr-lbl{
      color:${t.userColor};font-size:.72rem;letter-spacing:.1em;
      text-transform:uppercase;margin-bottom:12px;
    }
    .dq-qr-box{
      display:inline-block;padding:16px;
      background:${t.qrBg};border:${t.qrBorder};
      border-radius:12px;margin-bottom:12px;
      ${key==="cyber"?"border-radius:4px;":""}
    }
    .dq-qr-dl{
      display:inline-flex;align-items:center;gap:6px;
      padding:9px 20px;border-radius:100px;
      font-family:${t.bodyFont};font-size:.8rem;font-weight:500;
      background:${t.downloadBg};color:${t.downloadColor};
      border:${t.downloadBorder};cursor:pointer;
      transition:opacity .2s,transform .15s;
    }
    .dq-qr-dl:hover{opacity:.78;transform:translateY(-1px)}
    .dq-wa{
      background:${t.waBg} !important;
      color:${t.waColor} !important;
      border-color:${t.waBorder} !important;
    }
    @keyframes dqUp{
      from{opacity:0;transform:translateY(22px)}
      to{opacity:1;transform:translateY(0)}
    }
    @media(max-width:480px){
      .dq{padding:0 0 48px}
      .dq-card{border-radius:${key==="cyber"?"0":`0 0 ${t.cardRadius} ${t.cardRadius}`}}
      .dq-body{padding:56px 20px 28px}
    }
  `;
}

/* ─────────────────────────────────────────────
   LOADING SCREEN
───────────────────────────────────────────── */
function LoadingScreen() {
  return (
    <div style={{
      display:"flex",alignItems:"center",justifyContent:"center",
      minHeight:"100vh",background:"#07090f",flexDirection:"column",gap:"16px"
    }}>
      <div style={{
        width:"36px",height:"36px",borderRadius:"50%",
        border:"2.5px solid rgba(255,255,255,0.08)",
        borderTopColor:"rgba(255,255,255,0.5)",
        animation:"spin .75s linear infinite"
      }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile]   = useState(null);
  const [submitting, setSub]    = useState(false);
  const [sent, setSent]         = useState(false);
  const [lead, setLead]         = useState({ name:"", email:"", phone:"", message:"" });

  useEffect(() => {
    api.get(`/profile/${username}`)
      .then(r => setProfile(r.data))
      .catch(console.error);
  }, [username]);

  if (!profile) return <LoadingScreen />;

  /* ── resolve theme ── */
  const key = resolveTheme(profile.theme);
  const t   = THEMES[key];
  injectFont(t.fontUrl);
  const css = buildCSS(t, key);
  const url = `${window.location.origin}/${profile.username}`;

  /* ── qr download ── */
  const downloadQR = () => {
    const canvas = document.querySelector(".dq-card canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.href     = canvas.toDataURL("image/png");
    a.download = `${profile.username}-qrcode.png`;
    a.click();
  };

  /* ── lead submit ── */
  const submitLead = async () => {
    if (submitting || sent) return;
    setSub(true);
    try {
      await api.post("/profile/lead", { username: profile.username, ...lead });
      setSent(true);
      setLead({ name:"", email:"", phone:"", message:"" });
    } catch { alert("Something went wrong. Please try again."); }
    finally { setSub(false); }
  };

  const hasCTA    = profile.phone || profile.email || profile.social?.whatsapp;
  const hasSocial = profile.social?.instagram || profile.social?.linkedin || profile.social?.twitter;

  return (
    <>
      <style>{css}</style>

      <div className="dq">
        <div className="dq-card">

          {/* ── HEADER BAND ── */}
          <div className="dq-header">
            <div className="dq-avatar-wrap">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={profile.name || "Profile"}
                  className="dq-avatar"
                />
              ) : (
                <div className="dq-avatar-ph">👤</div>
              )}
            </div>
          </div>

          {/* ── BODY ── */}
          <div className="dq-body">

            {/* NAME + USERNAME + BIO */}
            <h1 className="dq-name">{profile.name || "Your Name"}</h1>
            <p className="dq-user">@{profile.username}</p>
            {profile.bio && <p className="dq-bio">{profile.bio}</p>}

            {/* CTA BUTTONS  (Call / Email / WhatsApp) */}
            {hasCTA && (
              <div className="dq-cta-row">
                {profile.phone && (
                  <a href={`tel:${profile.phone}`} className="dq-cta">
                    📞 Call
                  </a>
                )}
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="dq-cta">
                    ✉️ Email
                  </a>
                )}
                {profile.social?.whatsapp && (
                  <a
                    href={`https://wa.me/${profile.social.whatsapp}?text=Hi%20I%20found%20you%20via%20DigiQR`}
                    target="_blank" rel="noreferrer"
                    className="dq-cta dq-wa"
                  >
                    💬 WhatsApp
                  </a>
                )}
              </div>
            )}

            {/* SOCIAL LINKS */}
            {hasSocial && (
              <>
                <div className="dq-social-row">
                  {profile.social?.instagram && (
                    <a href={profile.social.instagram} target="_blank" rel="noreferrer" className="dq-social">
                      Instagram
                    </a>
                  )}
                  {profile.social?.linkedin && (
                    <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="dq-social">
                      LinkedIn
                    </a>
                  )}
                  {profile.social?.twitter && (
                    <a href={profile.social.twitter} target="_blank" rel="noreferrer" className="dq-social">
                      Twitter
                    </a>
                  )}
                </div>
                <div className="dq-divider" />
              </>
            )}

            {/* CUSTOM LINKS */}
            {profile.links?.length > 0 && (
              <div className="dq-section">
                {profile.links.map((l, i) => (
                  <a
                    key={i}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="dq-link"
                    onClick={() =>
                      api.post("/profile/click", { username: profile.username, index: i })
                    }
                  >
                    {l.title}
                  </a>
                ))}
              </div>
            )}

            {/* SERVICES */}
            {profile.services?.length > 0 && (
              <div className="dq-section">
                <h3 className="dq-sec-title">Services</h3>
                {profile.services.map((s, i) => (
                  <div key={i} className="dq-svc">
                    <p className="dq-svc-title">{s.title}</p>
                    {s.description && <p className="dq-svc-desc">{s.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* PORTFOLIO */}
            {profile.portfolio?.length > 0 && (
              <div className="dq-section">
                <h3 className="dq-sec-title">Portfolio</h3>
                {profile.portfolio.map((p, i) => (
                  <a
                    key={i}
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="dq-port"
                  >
                    <span className="dq-port-icon">🔗</span>
                    <span className="dq-port-title">{p.title}</span>
                  </a>
                ))}
              </div>
            )}

            {/* TESTIMONIALS */}
            {profile.testimonials?.length > 0 && (
              <div className="dq-section">
                <h3 className="dq-sec-title">What clients say</h3>
                {profile.testimonials.map((t, i) => (
                  <div key={i} className="dq-testi">
                    <p className="dq-testi-name">{t.name}</p>
                    <p className="dq-testi-text">
                      <span className="dq-quote">&ldquo;</span>
                      {t.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* CONTACT FORM */}
            {profile.enableContactForm && (
              <div className="dq-section">
                <h3 className="dq-sec-title">Get in touch</h3>

                {sent ? (
                  <div style={{
                    textAlign:"center",padding:"24px 16px",
                    background: key==="white"||key==="sunrise"
                      ? "rgba(45,106,79,.06)"
                      : "rgba(0,210,255,.06)",
                    borderRadius:"10px",
                    color: t.accent,
                    fontSize:".9rem",fontWeight:"500"
                  }}>
                    ✅ Message sent! I&rsquo;ll get back to you soon.
                  </div>
                ) : (
                  <>
                    <input
                      className="dq-input"
                      placeholder="Your name"
                      value={lead.name}
                      onChange={e => setLead({ ...lead, name: e.target.value })}
                    />
                    <input
                      className="dq-input"
                      placeholder="Email address"
                      value={lead.email}
                      onChange={e => setLead({ ...lead, email: e.target.value })}
                    />
                    <input
                      className="dq-input"
                      placeholder="Phone (optional)"
                      value={lead.phone}
                      onChange={e => setLead({ ...lead, phone: e.target.value })}
                    />
                    <textarea
                      className="dq-input dq-textarea"
                      placeholder="Your message…"
                      value={lead.message}
                      onChange={e => setLead({ ...lead, message: e.target.value })}
                    />
                    <button
                      className="dq-submit"
                      onClick={submitLead}
                      disabled={submitting || !lead.name || !lead.email}
                    >
                      {submitting ? "Sending…" : "Send Message"}
                    </button>
                  </>
                )}
              </div>
            )}

            {/* QR CODE */}
            <div className="dq-qr-wrap">
              <div className="dq-divider" style={{ marginBottom:"20px" }} />
              <p className="dq-qr-lbl">Scan to share profile</p>
              <div className="dq-qr-box">
                <QRCodeCanvas
                  value={url}
                  size={128}
                  fgColor={t.qrFg}
                  bgColor={t.qrBgColor}
                />
              </div>
              <br />
              <button className="dq-qr-dl" onClick={downloadQR}>
                ⬇ Download QR
              </button>
            </div>

          </div>{/* /dq-body */}
        </div>{/* /dq-card */}
      </div>{/* /dq */}
    </>
  );
}