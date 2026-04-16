import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

/* ─── GLOBAL STYLES & TOKENS ─────────────────────── */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
  h1,h2,h3,h4,h5 { font-family: 'Bricolage Grotesque', sans-serif; }
  .font-display { font-family: 'Bricolage Grotesque', sans-serif; }
  .font-body    { font-family: 'DM Sans', sans-serif; }
  
  .nav-link:hover { color:#1847F0; background:#EEF2FF; }
  .footer-link:hover { color:#fff!important; }
  .social-icon:hover { background:#1847F0!important; }
`;

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
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.primary }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <span className="font-display font-extrabold text-lg tracking-tight" style={{ color: C.dark }}>DigiQR</span>
        </Link>

        <div className="hidden md:flex flex-1 justify-center gap-1">
          {navLinks.map(link => (
            <Link key={link} to={`/#${link.toLowerCase().replace(/ /g, "-")}`}
              className="nav-link px-4 py-1.5 text-sm font-medium rounded-lg transition-all"
              style={{ color: C.mid }}>
              {link}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Link to="/login" className="px-4 py-2 text-sm font-semibold font-display rounded-lg border transition-all hover:bg-gray-50"
            style={{ border: `1.5px solid ${C.border}`, color: C.dark }}>
            Log in
          </Link>
        </div>

        <button className="ml-auto md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="block w-5 h-0.5 rounded transition-all" style={{ background: C.dark, transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }}/>
          <span className="block w-5 h-0.5 rounded transition-all" style={{ background: C.dark, opacity: menuOpen ? 0 : 1 }}/>
          <span className="block w-5 h-0.5 rounded transition-all" style={{ background: C.dark, transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }}/>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t px-5 py-4 flex flex-col gap-3" style={{ borderColor: C.border }}>
          {navLinks.map(link => (
            <Link key={link} to={`/#${link.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-medium py-1" style={{ color: C.mid }}
              onClick={() => setMenuOpen(false)}>
              {link}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t" style={{ borderColor: C.border }}>
            <Link to="/" className="w-full text-center py-2.5 text-sm font-semibold font-display rounded-lg border"
              style={{ border: `1.5px solid ${C.border}`, color: C.dark }}>Log in</Link>
          </div>
        </div>
      )}
    </nav>
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
    <footer className="px-5 md:px-10 pt-14 pb-7 mt-auto" style={{ background: C.dark }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
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

/* ─── MAIN SIGNUP VIEW ───────────────────────────── */
export default function Signup() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    try {
      const res = await api.post("/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{GLOBAL}</style>
      <div className="min-h-screen flex flex-col font-body bg-cover bg-center" style={{ background: C.bg }}>
        
        <Navbar />

        <main className="flex-grow flex items-center justify-center p-5 pt-28 pb-16">
          
          <div className="w-full max-w-md p-8 md:p-10 rounded-2xl shadow-xl transition-all"
               style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: "0 12px 40px rgba(13,15,20,0.05)" }}>
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ background: C.primaryLt, color: C.primary }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight mb-2" style={{ color: C.dark }}>
                Create Account
              </h2>
              <p className="text-sm font-body" style={{ color: C.muted }}>
                Join 50,000+ professionals today.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div>
                <label className="block text-xs font-bold font-display uppercase tracking-wider mb-2" style={{ color: C.mid }}>
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl text-sm font-body transition-all focus:outline-none focus:ring-2 focus:bg-white"
                  style={{ background: C.bg, border: `1.5px solid ${C.border}`, color: C.dark, "--tw-ring-color": C.primaryMid }}
                  placeholder="e.g. Yash Kolnure"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-display uppercase tracking-wider mb-2" style={{ color: C.mid }}>
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl text-sm font-body transition-all focus:outline-none focus:ring-2 focus:bg-white"
                  style={{ background: C.bg, border: `1.5px solid ${C.border}`, color: C.dark, "--tw-ring-color": C.primaryMid }}
                  placeholder="name@example.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-display uppercase tracking-wider mb-2" style={{ color: C.mid }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl text-sm font-body transition-all focus:outline-none focus:ring-2 focus:bg-white"
                  style={{ background: C.bg, border: `1.5px solid ${C.border}`, color: C.dark, "--tw-ring-color": C.primaryMid }}
                  placeholder="+91 98765 43210"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-display uppercase tracking-wider mb-2" style={{ color: C.mid }}>
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl text-sm font-body transition-all focus:outline-none focus:ring-2 focus:bg-white"
                  style={{ background: C.bg, border: `1.5px solid ${C.border}`, color: C.dark, "--tw-ring-color": C.primaryMid }}
                  placeholder="••••••••"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold font-display text-white transition-all hover:opacity-90 hover:-translate-y-px disabled:opacity-70 disabled:hover:translate-y-0"
                style={{ background: C.primary, boxShadow: `0 8px 24px ${C.primary}44` }}
              >
                {loading ? "Creating Account..." : "Sign Up Free"}
                {!loading && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
              </button>
            </form>

            <p className="text-center mt-8 text-sm font-body" style={{ color: C.muted }}>
              Already have an account?{" "}
              <Link to="/login" className="font-bold font-display transition-colors hover:underline" style={{ color: C.dark }}>
                Log in here
              </Link>
            </p>
          </div>

        </main>

        <Footer />

      </div>
    </>
  );
}