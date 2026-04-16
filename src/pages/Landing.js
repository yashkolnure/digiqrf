import { useState, useEffect } from "react";

/* ─── GLOBAL STYLES ──────────────────────────────── */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
  h1,h2,h3,h4,h5 { font-family: 'Bricolage Grotesque', sans-serif; }
  a { text-decoration: none; color: inherit; }

  .font-display { font-family: 'Bricolage Grotesque', sans-serif; }
  .font-body    { font-family: 'DM Sans', sans-serif; }

  @keyframes floatA  { 0%,100%{transform:translateY(0)}    50%{transform:translateY(-9px)} }
  @keyframes floatB  { 0%,100%{transform:translateY(-4px)} 50%{transform:translateY(6px)}  }
  @keyframes floatC  { 0%,100%{transform:translateY(0)}    50%{transform:translateY(-7px)} }
  @keyframes scanBeam{ 0%{transform:translateY(0)} 50%{transform:translateY(62px)} 100%{transform:translateY(0)} }

  .fa { animation: floatA 5.5s ease-in-out infinite; }
  .fb { animation: floatB 6.5s ease-in-out infinite 1.2s; }
  .fc { animation: floatC 7s  ease-in-out infinite 0.6s; }
  .scan-beam { animation: scanBeam 2.2s ease-in-out infinite; }

  ::-webkit-scrollbar       { width: 5px; }
  ::-webkit-scrollbar-track { background: #F1F3F5; }
  ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 4px; }

  .nav-link:hover { color:#1847F0; background:#EEF2FF; }
  .feat-card:hover { background:#fff!important; border-color:#C7D2FE!important; transform:translateY(-2px); box-shadow:0 6px 24px rgba(24,71,240,.09); }
  .test-card:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(13,15,20,.07); }
  .social-icon:hover { background:#1847F0!important; }
  .footer-link:hover { color:#fff!important; }
`;

/* ─── TOKENS ─────────────────────────────────────── */
const C = {
  bg:         "#F6F7F9",
  bgAlt:      "#EDEEF2",
  surface:    "#FFFFFF",
  primary:    "#1847F0",
  primaryHov: "#1338CC",
  primaryLt:  "#EEF2FF",
  primaryMid: "#C7D2FE",
  dark:       "#0D0F14",
  mid:        "#374151",
  muted:      "#6B7280",
  border:     "#E5E7EB",
  success:    "#059669",
  amber:      "#D97706",
  red:        "#DC2626",
};

/* ─── CHIP ───────────────────────────────────────── */
const Chip = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold font-display tracking-wide"
    style={{ background: C.primaryLt, color: C.primary, border: `1px solid ${C.primaryMid}` }}>
    {children}
  </span>
);

/* ─── HERO ILLUSTRATION ──────────────────────────── */
function HeroIllustration() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* bg ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full"
        style={{ background: `radial-gradient(circle,${C.primaryLt} 0%,transparent 72%)`, zIndex: 0 }}/>

      {/* Phone */}
      <div className="relative flex justify-center" style={{ zIndex: 1 }}>
        <svg width="200" height="400" viewBox="0 0 220 440" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="110" cy="432" rx="68" ry="8" fill="#0D0F1414"/>
          <rect x="2" y="2" width="216" height="436" rx="32" fill="#1847F0"/>
          <rect x="4" y="4" width="212" height="432" rx="30" fill="#0D0F14"/>
          <rect x="8" y="8" width="204" height="424" rx="27" fill="#F6F7F9"/>
          <rect x="78" y="16" width="64" height="12" rx="6" fill="#0D0F14"/>
          <circle cx="176" cy="22" r="2.5" fill="#9CA3AF"/><circle cx="168" cy="22" r="2.5" fill="#9CA3AF"/><circle cx="160" cy="22" r="2.5" fill="#9CA3AF"/>
          <rect x="8" y="8" width="204" height="64" rx="27" fill="url(#hdrGrad)"/>
          <rect x="8" y="40" width="204" height="32" fill="url(#hdrGrad)"/>
          <circle cx="110" cy="82" r="26" fill="white" stroke="white" strokeWidth="3"/>
          <circle cx="110" cy="82" r="23" fill="url(#avGrad)"/>
          <text x="110" y="88" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="sans-serif">AK</text>
          <circle cx="128" cy="98" r="8" fill="white"/>
          <circle cx="128" cy="98" r="6.5" fill="#1847F0"/>
          <path d="M124.5 98.5 L127 101 L131.5 96" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="110" y="120" textAnchor="middle" fill="#0D0F14" fontSize="13" fontWeight="700" fontFamily="sans-serif">Arjun Kumar</text>
          <text x="110" y="132" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="sans-serif">Product Designer · Mumbai</text>
          <rect x="50" y="138" width="34" height="12" rx="6" fill="#EEF2FF"/>
          <text x="67" y="147" textAnchor="middle" fill="#1847F0" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Website</text>
          <rect x="88" y="138" width="34" height="12" rx="6" fill="#EEF2FF"/>
          <text x="105" y="147" textAnchor="middle" fill="#1847F0" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Portfolio</text>
          <rect x="126" y="138" width="28" height="12" rx="6" fill="#EEF2FF"/>
          <text x="140" y="147" textAnchor="middle" fill="#1847F0" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Blog</text>
          <line x1="24" y1="157" x2="196" y2="157" stroke="#E5E7EB" strokeWidth="0.75"/>
          {/* QR */}
          <rect x="56" y="163" width="108" height="108" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
          <rect x="64" y="171" width="22" height="22" rx="3" fill="#0D0F14"/><rect x="66" y="173" width="18" height="18" rx="2" fill="white"/><rect x="69" y="176" width="12" height="12" rx="1.5" fill="#0D0F14"/>
          <rect x="130" y="171" width="22" height="22" rx="3" fill="#0D0F14"/><rect x="132" y="173" width="18" height="18" rx="2" fill="white"/><rect x="135" y="176" width="12" height="12" rx="1.5" fill="#0D0F14"/>
          <rect x="64" y="237" width="22" height="22" rx="3" fill="#0D0F14"/><rect x="66" y="239" width="18" height="18" rx="2" fill="white"/><rect x="69" y="242" width="12" height="12" rx="1.5" fill="#0D0F14"/>
          {[{x:92,y:172},{x:100,y:172},{x:108,y:172},{x:120,y:172},{x:96,y:180},{x:104,y:180},{x:116,y:180},{x:124,y:180},{x:92,y:188},{x:108,y:188},{x:120,y:188},{x:95,y:196},{x:103,y:196},{x:111,y:196},{x:119,y:196},{x:127,y:196},{x:92,y:204},{x:100,y:204},{x:116,y:204},{x:124,y:204},{x:97,y:212},{x:105,y:212},{x:113,y:212},{x:128,y:212},{x:92,y:220},{x:104,y:220},{x:112,y:220},{x:120,y:220},{x:128,y:220},{x:93,y:228},{x:109,y:228},{x:117,y:228},{x:130,y:228},{x:131,y:238},{x:139,y:238},{x:147,y:238},{x:139,y:246},{x:151,y:246},{x:131,y:254},{x:147,y:254}].map((d,i)=>(
            <rect key={i} x={d.x} y={d.y} width="5" height="5" rx="0.8" fill="#0D0F14"/>
          ))}
          <g className="scan-beam">
            <line x1="58" y1="195" x2="162" y2="195" stroke="#1847F0" strokeWidth="1.2" strokeOpacity="0.55"/>
            <rect x="58" y="193" width="104" height="4" rx="2" fill="url(#scanGrad)" opacity="0.3"/>
          </g>
          <rect x="102" y="209" width="16" height="16" rx="3" fill="white"/>
          <rect x="103.5" y="210.5" width="13" height="13" rx="2" fill="#1847F0"/>
          <text x="110" y="220.5" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="sans-serif">dq</text>
          <text x="110" y="282" textAnchor="middle" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">digiqr.io/arjun</text>
          {/* Buttons */}
          <rect x="24" y="289" width="52" height="42" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
          <text x="50" y="308" textAnchor="middle" fontSize="11" fontFamily="sans-serif">💬</text>
          <text x="50" y="323" textAnchor="middle" fill="#059669" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">WhatsApp</text>
          <rect x="84" y="289" width="52" height="42" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
          <text x="110" y="308" textAnchor="middle" fontSize="11" fontFamily="sans-serif">📞</text>
          <text x="110" y="323" textAnchor="middle" fill="#1847F0" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Call Now</text>
          <rect x="144" y="289" width="52" height="42" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
          <text x="170" y="308" textAnchor="middle" fontSize="11" fontFamily="sans-serif">✉️</text>
          <text x="170" y="323" textAnchor="middle" fill="#DC2626" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Email</text>
          {/* Links */}
          <rect x="16" y="339" width="188" height="26" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
          <text x="30" y="356" textAnchor="middle" fontSize="8" fontFamily="sans-serif">🔗</text>
          <text x="44" y="356" fill="#0D0F14" fontSize="9" fontWeight="600" fontFamily="sans-serif">Portfolio</text>
          <text x="196" y="356" textAnchor="end" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">portfolio.arjun.dev ↗</text>
          <rect x="16" y="370" width="188" height="26" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
          <text x="30" y="387" textAnchor="middle" fill="#0A66C2" fontSize="9" fontWeight="700" fontFamily="sans-serif">in</text>
          <text x="44" y="387" fill="#0D0F14" fontSize="9" fontWeight="600" fontFamily="sans-serif">LinkedIn</text>
          <text x="196" y="387" textAnchor="end" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">in/arjun ↗</text>
          <rect x="16" y="401" width="188" height="26" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
          <text x="30" y="418" textAnchor="middle" fontSize="8" fontFamily="sans-serif">📸</text>
          <text x="44" y="418" fill="#0D0F14" fontSize="9" fontWeight="600" fontFamily="sans-serif">Instagram</text>
          <text x="196" y="418" textAnchor="end" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">@arjun.designs ↗</text>
          <defs>
            <linearGradient id="hdrGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1847F0"/><stop offset="100%" stopColor="#1847F0" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="avGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1847F0"/><stop offset="100%" stopColor="#60A5FA"/>
            </linearGradient>
            <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1847F0" stopOpacity="0"/>
              <stop offset="50%" stopColor="#1847F0" stopOpacity="1"/>
              <stop offset="100%" stopColor="#1847F0" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Float: Views */}
      <div className="fa absolute top-10 -right-2 md:-right-8 bg-white border rounded-xl p-3 shadow-lg z-10" style={{ border: `1px solid ${C.border}`, minWidth: 130 }}>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-sm">📈</span>
          <span className="text-xs font-medium" style={{ color: C.muted }}>Profile Views</span>
        </div>
        <div className="text-xl font-extrabold font-display tracking-tight" style={{ color: C.dark }}>2,410</div>
        <div className="text-xs font-semibold mt-0.5" style={{ color: C.success }}>↑ 18% this week</div>
        <svg width="102" height="22" viewBox="0 0 102 22" className="mt-1">
          <polyline points="0,18 14,14 28,16 40,10 52,12 64,6 76,8 88,4 102,2" fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="0,18 14,14 28,16 40,10 52,12 64,6 76,8 88,4 102,2 102,22 0,22" fill={C.primaryLt} strokeWidth="0"/>
        </svg>
      </div>

      {/* Float: Scan */}
      <div className="fb absolute bottom-20 -left-4 md:-left-10 bg-white border rounded-xl p-3 shadow-lg z-10" style={{ border: `1px solid ${C.border}`, minWidth: 156 }}>
        <div className="flex items-center gap-2">
          <div className="relative flex-shrink-0">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: C.primaryLt }}>📲</div>
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full border-2 border-white" style={{ background: C.success }}/>
          </div>
          <div>
            <div className="text-xs font-semibold" style={{ color: C.dark }}>Rohan M. just scanned</div>
            <div className="text-xs mt-0.5" style={{ color: C.muted }}>2 seconds ago · Mumbai</div>
          </div>
        </div>
      </div>

      {/* Float: Leads */}
      <div className="fc absolute top-40 -right-3 md:-right-10 rounded-xl p-3 z-10 shadow-xl" style={{ background: C.primary, minWidth: 110, boxShadow: `0 8px 24px ${C.primary}44` }}>
        <div className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>New Leads</div>
        <div className="text-2xl font-extrabold font-display text-white tracking-tight">128</div>
        <div className="flex gap-0.5 mt-1 items-end">
          {[40,55,35,65,50,70,60].map((h,i) => (
            <div key={i} style={{ width:8, borderRadius:2, background:"rgba(255,255,255,0.5)", height:`${h*0.3}px` }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── NAVBAR ─────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = ["Features", "How It Works", "Pricing", "Testimonials"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-5 md:px-10"
      style={{
        background: scrolled ? "rgba(246,247,249,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      }}>
      <div className="max-w-6xl mx-auto flex items-center h-16 gap-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.primary }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <span className="font-display font-extrabold text-lg tracking-tight" style={{ color: C.dark }}>DigiQR</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex flex-1 justify-center gap-1">
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              className="nav-link px-4 py-1.5 text-sm font-medium rounded-lg transition-all"
              style={{ color: C.mid }}>
              {link}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
       <div className="hidden md:flex items-center gap-2 flex-shrink-0 relative z-10">
  <button 
    onClick={() => window.location.href = '/login'}
    className="cursor-pointer px-4 py-2 text-sm font-semibold font-display rounded-lg border transition-all hover:bg-gray-50 active:scale-95"
    style={{ border: `1.5px solid ${C.border}`, color: C.dark }}
  >
    Log in
  </button>
  
  <button 
    onClick={() => window.location.href = '/signup'}
    className="cursor-pointer flex items-center gap-1.5 px-4 py-2 text-sm font-bold font-display rounded-lg text-white transition-all hover:opacity-90 active:scale-95"
    style={{ background: C.primary }}
  >
    Get Started Free
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  </button>
</div>
        {/* Mobile hamburger */}
        <button className="ml-auto md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="block w-5 h-0.5 rounded transition-all" style={{ background: C.dark, transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }}/>
          <span className="block w-5 h-0.5 rounded transition-all" style={{ background: C.dark, opacity: menuOpen ? 0 : 1 }}/>
          <span className="block w-5 h-0.5 rounded transition-all" style={{ background: C.dark, transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }}/>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-5 py-4 flex flex-col gap-3" style={{ borderColor: C.border }}>
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-medium py-1" style={{ color: C.mid }}
              onClick={() => setMenuOpen(false)}>
              {link}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t" style={{ borderColor: C.border }}>
            <button  onClick={() => window.location.href = '/login'} className="w-full py-2.5 text-sm font-semibold font-display rounded-lg border"
              style={{ border: `1.5px solid ${C.border}`, color: C.dark }}>Log in</button>
            <button  onClick={() => window.location.href = '/signup'} className="w-full py-2.5 text-sm font-bold font-display rounded-lg text-white"
              style={{ background: C.primary }}>Get Started Free</button>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────── */
function Hero() {
  return (
    <section className="pt-24 pb-16 px-5 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-5">
            <Chip>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              The Smart Digital Identity Platform
            </Chip>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-none mb-5" style={{ color: C.dark }}>
            Your Entire Identity.{" "}
            <span style={{ color: C.primary }}>One Smart Link.</span>
          </h1>
          <p className="text-base leading-relaxed mb-7 max-w-md mx-auto md:mx-0" style={{ color: C.muted }}>
            Build your digital profile in seconds. Share your contact, socials, portfolio &amp; links through a single smart QR code. Turn every visitor into a lead — effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8">
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold font-display text-white transition-all hover:opacity-90 hover:-translate-y-px"
            onClick={() => window.location.href = '/signup'}
              style={{ background: C.primary }}>
              Create Your Free Profile
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold font-display border transition-all hover:bg-gray-50"
              onClick={() => window.location.href = '/yash'}
              style={{ border: `1.5px solid ${C.border}`, color: C.dark }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16"/></svg>
              Watch Demo
            </button>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start flex-wrap">
            <div className="flex">
              {["AK","SR","MN","JP","LK"].map((ini,idx) => (
                <div key={ini} style={{ width:30,height:30,borderRadius:"50%",background:[C.primary,"#10B981","#F59E0B","#EF4444","#8B5CF6"][idx],border:"2.5px solid white",marginLeft:idx>0?-9:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#fff",fontFamily:"'Bricolage Grotesque',sans-serif" }}>{ini}</div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 justify-center md:justify-start mb-0.5">
                {[1,2,3,4,5].map(s=><span key={s} style={{color:C.amber,fontSize:12}}>★</span>)}
              </div>
              <span className="text-xs" style={{ color: C.muted }}><strong style={{ color: C.dark }}>50,000+</strong> professionals trust DigiQR</span>
            </div>
            <div className="hidden sm:block w-px h-7" style={{ background: C.border }}/>
            <div className="flex gap-3 flex-wrap justify-center">
              {[["✓","No credit card"],["✓","2 min setup"],["✓","Free forever"]].map(([icon,text])=>(
                <span key={text} className="text-xs" style={{ color: C.muted }}><span style={{ color:C.success,fontWeight:700 }}>{icon}</span> {text}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

/* ─── LOGO STRIP ─────────────────────────────────── */
function LogoStrip() {
  const companies = ["Accenture","Deloitte","Razorpay","Zomato","Notion","Canva","Stripe"];
  return (
    <div className="px-5 md:px-10 py-4 border-t border-b overflow-x-auto" style={{ background: C.bgAlt, borderColor: C.border }}>
      <div className="max-w-6xl mx-auto flex items-center gap-4 min-w-max mx-auto">
        <span className="text-xs font-medium uppercase tracking-widest flex-shrink-0" style={{ color: C.muted }}>Used at</span>
        <div className="w-px h-4" style={{ background: C.border }}/>
        <div className="flex gap-8 md:gap-12 items-center">
          {companies.map(c=>(
            <span key={c} className="text-sm font-bold font-display tracking-tight whitespace-nowrap" style={{ color:"#BEC4CD" }}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── STATS ──────────────────────────────────────── */
function Stats() {
  const items = [
    {val:"50K+",label:"Active Users",icon:"👤"},
    {val:"2M+",label:"Profile Views",icon:"👁"},
    {val:"98%",label:"Satisfaction",icon:"⭐"},
    {val:"4.9/5",label:"App Rating",icon:"📱"},
  ];
  return (
    <section className="bg-white px-5 md:px-10 py-12 border-b" style={{ borderColor: C.border }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(s=>(
          <div key={s.label} className="text-center p-5 rounded-xl border" style={{ background: C.bg, borderColor: C.border }}>
            <div className="text-xl mb-2">{s.icon}</div>
            <div className="text-3xl font-extrabold font-display tracking-tight" style={{ color: C.primary }}>{s.val}</div>
            <div className="text-xs mt-1" style={{ color: C.muted }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── FEATURES ───────────────────────────────────── */
function Features() {
  const feats = [
    {icon:"🔗",title:"One Smart Link",desc:"Share everything — contact, socials, portfolio, and links — through a single beautiful profile URL."},
    {icon:"📲",title:"Instant QR Code",desc:"Generate a smart, printable QR code instantly. Let anyone scan and connect with you in seconds."},
    {icon:"📋",title:"Lead Capture Form",desc:"Built-in contact form collects visitor details and sends them straight to your inbox automatically."},
    {icon:"📊",title:"Analytics Dashboard",desc:"Track profile views, link clicks, and lead conversions in real time with clear visual charts."},
    {icon:"⚡",title:"WhatsApp & Call CTA",desc:"Let visitors reach you instantly via WhatsApp, phone, or email right from your profile page."},
    {icon:"🎨",title:"Custom Themes",desc:"Personalise your profile with themes, colours, and layouts that match your unique brand identity."},
    {icon:"🔒",title:"Privacy & Security",desc:"Control what information you share. Your data is encrypted, protected, and fully under your control."},
    {icon:"🌐",title:"Custom Domain",desc:"Use your own domain for a fully branded experience — yourname.com/profile, your way."},
  ];

  return (
    <section id="features" className="py-16 md:py-20 px-5 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-11">
          <Chip>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            Everything You Need
          </Chip>
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mt-4">
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight leading-tight" style={{ color: C.dark }}>
              Powerful features,<br/>zero complexity
            </h2>
            <p className="text-sm leading-relaxed md:max-w-xs" style={{ color: C.muted }}>
              Everything you need to build your digital presence, capture leads, and grow your personal brand.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {feats.map(f=>(
            <div key={f.title} className="feat-card p-5 rounded-xl border cursor-default transition-all"
              style={{ background: C.bg, borderColor: C.border }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-3" style={{ background: C.primaryLt }}>{f.icon}</div>
              <h3 className="text-sm font-bold font-display mb-1.5" style={{ color: C.dark }}>{f.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ───────────────────────────────── */
function HowItWorks() {
  const steps = [
    {num:"01",title:"Create Your Profile",desc:"Sign up and fill in your details — name, bio, contact info, and social links. Takes under 2 minutes.",icon:"👤"},
    {num:"02",title:"Customise & Publish",desc:"Choose a theme, add links, configure your lead form, and hit publish to go live instantly.",icon:"✏️"},
    {num:"03",title:"Share & Grow",desc:"Share your unique link or QR code anywhere. Track views, capture leads, and build your brand.",icon:"🚀"},
  ];
  return (
    <section id="how-it-works" className="py-16 md:py-20 px-5 md:px-10" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-3">
            <Chip>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
              Simple Process
            </Chip>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight mb-3" style={{ color: C.dark }}>Up and running in 3 steps</h2>
          <p className="text-sm max-w-sm mx-auto" style={{ color: C.muted }}>No tech skills required. Create your digital identity in minutes, not hours.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-9 left-1/3 right-1/3 h-px" style={{ background: C.primaryMid, zIndex: 0 }}/>
          {steps.map((s,i)=>(
            <div key={s.num} className="text-center relative z-10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl"
                style={{ background: i===1 ? C.primary : "#fff", border: `1.5px solid ${i===1 ? C.primary : C.border}`, boxShadow: i===1 ? `0 6px 20px ${C.primary}38` : "0 2px 8px rgba(13,15,20,.06)" }}>
                {s.icon}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: C.primary }}>Step {s.num}</div>
              <h3 className="text-base font-bold font-display mb-2" style={{ color: C.dark }}>{s.title}</h3>
              <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: C.muted }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── DASHBOARD PREVIEW ──────────────────────────── */
function DashboardPreview() {
  const bars = [45,62,38,78,55,82,68,91,74,88,95,72];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <section className="py-16 md:py-20 px-5 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <div className="mb-4"><Chip>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8,21 16,21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            Analytics &amp; Insights
          </Chip></div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight leading-tight mb-4" style={{ color: C.dark }}>
            Know exactly who's<br/>visiting your profile
          </h2>
          <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: C.muted }}>
            Real-time analytics show profile views, QR scan locations, link click-through rates, and lead conversion data — all in one clean dashboard.
          </p>
          <div className="flex flex-col gap-3 mb-7">
            {[["📊","Real-time profile view tracking"],["📍","Geographic scan location data"],["🎯","Lead conversion funnel metrics"],["📤","One-click CSV export for all leads"]].map(([icon,text])=>(
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: C.primaryLt }}>{icon}</div>
                <span className="text-sm" style={{ color: C.mid }}>{text}</span>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold font-display text-white transition-all hover:opacity-90"
             onClick={() => window.location.href = '/signup'}
            style={{ background: C.primary }}>
            See Analytics Demo
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>

        {/* Right: Dashboard mockup */}
        <div className="rounded-2xl overflow-hidden border shadow-lg" style={{ background: C.bg, borderColor: C.border }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b bg-white" style={{ borderColor: C.border }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: C.success }}/>
              <span className="text-sm font-semibold font-display" style={{ color: C.dark }}>Analytics Overview</span>
            </div>
            <div className="flex gap-1.5">
              {["7d","30d","90d"].map((t,i)=>(
                <span key={t} className="text-xs font-semibold px-2 py-1 rounded-md"
                  style={{ background: i===1 ? C.primary : C.bg, color: i===1 ? "#fff" : C.muted }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 p-4 pb-0">
            {[{val:"2,410",label:"Views",delta:"+18%",color:C.primary},{val:"842",label:"Clicks",delta:"+12%",color:C.success},{val:"128",label:"Leads",delta:"+31%",color:C.amber}].map(m=>(
              <div key={m.label} className="bg-white border rounded-xl p-3" style={{ borderColor: C.border }}>
                <div className="text-xs mb-1" style={{ color: C.muted }}>{m.label}</div>
                <div className="text-xl font-extrabold font-display tracking-tight" style={{ color: C.dark }}>{m.val}</div>
                <div className="text-xs font-semibold mt-0.5" style={{ color: m.color }}>{m.delta} vs last month</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="p-4">
            <div className="bg-white border rounded-xl p-4" style={{ borderColor: C.border }}>
              <div className="text-xs font-semibold mb-3" style={{ color: C.muted }}>Monthly Profile Views</div>
              <div className="flex items-end gap-1.5" style={{ height: 80 }}>
                {bars.map((h,i)=>(
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t transition-all" style={{ height:`${h}%`, background: i===11 ? C.primary : i>=8 ? C.primaryMid : C.bgAlt }}/>
                    <span className="text-xs hidden sm:block" style={{ fontSize:8, color:C.muted }}>{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ────────────────────────────────────── */
function Pricing() {
  const [annual, setAnnual] = useState(true);
  const plans = [
    {name:"Starter",price:0,period:"forever free",desc:"For individuals getting started.",features:["1 Smart Profile","QR Code Generation","Up to 5 Links","Basic Analytics","DigiQR Branding"],cta:"Get Started Free",popular:false},
    {name:"Pro",price:annual?249:299,period:annual?"/mo, billed yearly":"/month",desc:"For professionals who want to grow.",features:["Unlimited Links","Custom Domain","Lead Capture Forms","Advanced Analytics","Remove Branding","Priority Support","QR Customisation"],cta:"Start Free Trial",popular:true},
    {name:"Business",price:annual?699:849,period:annual?"/mo, billed yearly":"/month",desc:"For teams managing multiple profiles.",features:["Everything in Pro","10 Team Members","Team Dashboard","API Access","White-label","Account Manager","SLA Guarantee"],cta:"Contact Sales",popular:false},
  ];

  return (
    <section id="pricing" className="py-16 md:py-20 px-5 md:px-10" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-3"><Chip>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            Simple Pricing
          </Chip></div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight mb-2" style={{ color: C.dark }}>Start free. Scale as you grow.</h2>
          <p className="text-sm mb-6" style={{ color: C.muted }}>No hidden fees. Cancel anytime.</p>

          <div className="inline-flex items-center gap-1 bg-white border rounded-full p-1" style={{ borderColor: C.border }}>
            <button onClick={()=>setAnnual(false)} className="px-4 py-1.5 rounded-full text-sm font-semibold font-display transition-all"
              style={{ background: !annual ? C.primary : "transparent", color: !annual ? "#fff" : C.muted }}>Monthly</button>
            <button onClick={()=>setAnnual(true)} className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold font-display transition-all"
              style={{ background: annual ? C.primary : "transparent", color: annual ? "#fff" : C.muted }}>
              Annual
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background:"#DCFCE7",color:"#15803D" }}>Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map(p=>(
            <div key={p.name} className="relative rounded-2xl p-7"
              style={{ background: p.popular ? C.primary : "#fff", border: p.popular ? `2px solid ${C.primary}` : `1px solid ${C.border}`, boxShadow: p.popular ? `0 16px 48px ${C.primary}28` : "0 2px 8px rgba(13,15,20,.04)" }}>
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap font-display"
                  style={{ background:"#fff", color:C.primary, border:`1px solid ${C.primaryMid}` }}>✦ Most Popular</div>
              )}
              <div className="text-xs font-bold font-display tracking-widest uppercase mb-1.5" style={{ color: p.popular ? "rgba(255,255,255,0.7)" : C.muted }}>{p.name}</div>
              <div className="flex items-baseline gap-1 mb-1.5">
                <span className="text-4xl font-extrabold font-display tracking-tight" style={{ color: p.popular ? "#fff" : C.dark }}>
                  {p.price===0 ? "Free" : `₹${p.price}`}
                </span>
                {p.price>0 && <span className="text-xs" style={{ color: p.popular ? "rgba(255,255,255,0.6)" : C.muted }}>{p.period}</span>}
              </div>
              <p className="text-xs leading-relaxed mb-5" style={{ color: p.popular ? "rgba(255,255,255,0.7)" : C.muted }}>{p.desc}</p>

              <button className="w-full py-2.5 rounded-lg text-sm font-bold font-display mb-5 transition-all hover:opacity-90"
                onClick={() => window.location.href = '/signup'}
                style={p.popular ? { background:"#fff", color:C.primary } : p.price===0 ? { background:"transparent", color:C.dark, border:`1.5px solid ${C.border}` } : { background:C.primary, color:"#fff" }}>
                {p.cta}
              </button>

              <div className="flex flex-col gap-2">
                {p.features.map(f=>(
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: p.popular ? "rgba(255,255,255,0.2)" : C.primaryLt }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={p.popular ? "#fff" : C.primary} strokeWidth="3.5"><polyline points="20,6 9,17 4,12"/></svg>
                    </div>
                    <span className="text-xs" style={{ color: p.popular ? "rgba(255,255,255,0.88)" : C.mid }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────── */
function Testimonials() {
  const reviews = [
    {name:"Priya Sharma",role:"Freelance UX Designer",company:"Mumbai",text:"DigiQR replaced my old LinkTree setup. The lead capture form alone brought me 40+ client inquiries in the first month. Genuinely the best tool I've bought this year.",initials:"PS",color:"#8B5CF6"},
    {name:"Rahul Mehta",role:"Founder & CEO",company:"Buildify Technologies",text:"I hand out QR codes at every networking event now. DigiQR makes me look polished and lets me follow up with every contact. It's become central to how I network.",initials:"RM",color:C.primary},
    {name:"Aisha Khan",role:"Digital Marketing Manager",company:"GrowthHive Agency",text:"My team's profiles look so professional now. The analytics show exactly which campaigns drive profile visits. Client-facing results have improved dramatically.",initials:"AK",color:"#059669"},
  ];

  return (
    <section id="testimonials" className="py-16 md:py-20 px-5 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-10">
          <div>
            <div className="mb-3"><Chip>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Customer Stories
            </Chip></div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight leading-tight" style={{ color: C.dark }}>
              Loved by 50,000+<br/>professionals
            </h2>
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: C.muted }}>Don't just take our word for it — here's what our users have to say about DigiQR.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map(r=>(
            <div key={r.name} className="test-card p-6 rounded-2xl border transition-all"
              style={{ background: C.bg, borderColor: C.border }}>
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(s=><span key={s} style={{color:C.amber,fontSize:12}}>★</span>)}
              </div>
              <p className="text-sm leading-relaxed mb-5 italic" style={{ color: C.mid }}>"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white font-display flex-shrink-0"
                  style={{ background: r.color }}>{r.initials}</div>
                <div>
                  <div className="text-sm font-bold font-display" style={{ color: C.dark }}>{r.name}</div>
                  <div className="text-xs" style={{ color: C.muted }}>{r.role} · {r.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ──────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-16 md:py-20 px-5 md:px-10" style={{ background: C.primary }}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl"
          style={{ background: "rgba(255,255,255,0.15)" }}>🚀</div>
        <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white mb-4">
          Ready to share yourself smarter?
        </h2>
        <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.75)" }}>
          Join 50,000+ professionals who use DigiQR to build their digital identity, capture leads, and grow their brand — all from one smart link.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold font-display transition-all hover:-translate-y-px hover:shadow-xl"
            style={{ background: "#fff", color: C.primary }}>
            Start Your Free Trial
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold font-display transition-all hover:bg-white/10 border text-white"
            style={{ border: "1.5px solid rgba(255,255,255,0.35)" }}>
            View Live Demo
          </button>
        </div>
        <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
          ✓ Free forever plan &nbsp;·&nbsp; ✓ No credit card required &nbsp;·&nbsp; ✓ Setup in 2 minutes
        </p>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────── */
function Footer() {
  const links = {
    Product: ["Features","How It Works","Pricing","Changelog"],
    Company: ["About Us","Blog","Careers","Press Kit"],
    Support:  ["Help Centre","Contact Us","Privacy Policy","Terms of Service"],
  };

  return (
    <footer className="px-5 md:px-10 pt-14 pb-7" style={{ background: C.dark }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.primary }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight text-white">DigiQR</span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "#94A3B8" }}>
              Your all-in-one digital identity platform. Create, share, and grow with one smart link.
            </p>
            <div className="flex gap-2">
              {["𝕏","in","◎","▷"].map((icon,i)=>(
                <div key={i} className="social-icon w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer text-xs text-white transition-all"
                  style={{ background: "#1E293B" }}>{icon}</div>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(links).map(([section,items])=>(
            <div key={section}>
              <h4 className="text-xs font-bold font-display tracking-widest uppercase text-white mb-4">{section}</h4>
              <div className="flex flex-col gap-2.5">
                {items.map(item=>(
                  <a key={item} href="#" className="footer-link text-sm transition-colors" style={{ color: "#6B7280" }}>{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-6" style={{ borderColor: "#1E293B" }}>
          <p className="text-xs" style={{ color: "#4B5563" }}>© 2025 DigiQR. All rights reserved.</p>
          <div className="flex gap-5 flex-wrap justify-center">
            {["Privacy Policy","Terms of Service","Cookie Policy"].map(l=>(
              <a key={l} href="#" className="footer-link text-xs transition-colors" style={{ color: "#4B5563" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ────────────────────────────────────────── */
export default function DigiQRLanding() {
  return (
    <>
      <style>{GLOBAL}</style>
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <Stats />
        <Features />
        <HowItWorks />
        <DashboardPreview />
        <Pricing />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}