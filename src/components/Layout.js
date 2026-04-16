import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import { QRCodeCanvas } from "qrcode.react";

/* ─── GLOBAL STYLES & TOKENS ─────────────────────── */
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
  h1,h2,h3,h4,h5 { font-family: 'Bricolage Grotesque', sans-serif; }
  .font-display { font-family: 'Bricolage Grotesque', sans-serif; }
  .font-body    { font-family: 'DM Sans', sans-serif; }
  
  .sidebar-link { 
    display: flex; align-items: center; gap: 0.5rem; padding: 0.35rem 1rem; 
    border-radius: 0.5rem; font-size: 0.75rem; font-weight: 600; 
    font-family: 'Bricolage Grotesque', sans-serif; color: #6B7280; transition: all 0.2s; 
  }
  .sidebar-link:hover, .sidebar-link.active { background: #EEF2FF; color: #1847F0; }
  
  .action-btn { 
    display: flex; align-items: center; justify-content: center; gap: 0.5rem; 
    width: 100%; padding: 0.6rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 700; 
    font-family: 'Bricolage Grotesque', sans-serif; color: #374151; 
    border: 1.5px solid #E5E7EB; background: #fff; transition: all 0.2s; cursor: pointer; 
  }
  .action-btn:hover { background: #F6F7F9; color: #0D0F14; border-color: #D1D5DB; }
`;

const C = {
  bg:         "#F6F7F9",
  surface:    "#FFFFFF",
  primary:    "#1847F0",
  primaryLt:  "#EEF2FF",
  dark:       "#0D0F14",
  mid:        "#374151",
  muted:      "#6B7280",
  border:     "#E5E7EB",
  red:        "#DC2626",
};

export default function Layout({ children }) {
  const nav = useNavigate();
  const [profile, setProfile] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/me");
        setProfile(res.data);
      } catch {}
    };
    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  const profileUrl = profile
    ? `${window.location.origin}/${profile.username}`
    : "";

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    alert("Link copied to clipboard!");
  };

  const downloadQR = () => {
    const canvas = document.getElementById("profileQR");
    if (!canvas) return;

    const img = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = img;
    a.download = `${profile?.username || 'profile'}-qr.png`;
    a.click();
  };

  return (
    <>
      <style>{GLOBAL}</style>
      <div className="flex min-h-screen font-body relative" style={{ background: C.bg }}>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg border bg-white shadow-sm transition-all"
          style={{ borderColor: C.border, color: C.dark }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        {/* Changed: Used Tailwind translate classes instead of inline styles so desktop overrides it properly */}
        <aside 
          className={`fixed md:sticky top-0 left-0 z-40 h-screen w-54 shrink-0 transition-transform duration-300 ease-in-out flex flex-col border-r ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
          style={{ background: C.surface, borderColor: C.border }}
        >
          <div className="flex flex-col h-full w-full p-2">
            
            <div className="flex-grow">
              {/* Logo */}
              <div className="flex items-center gap-2 mb-6 px-2 pt-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.primary }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                </div>
                <span className="font-display font-extrabold text-xl tracking-tight" style={{ color: C.dark }}>DigiQR</span>
              </div>

              {/* Navigation */}
              <nav className="space-y-1.5">
                <Link className="sidebar-link" to="/dashboard" onClick={() => setSidebarOpen(false)}>
                  <span className="text-lg">📊</span> Dashboard
                </Link>
                <Link className="sidebar-link" to="/profile" onClick={() => setSidebarOpen(false)}>
                  <span className="text-lg">👤</span> Profile Settings
                </Link>

              </nav>

              {/* Quick Actions */}
              {profile?.username && (
                <div className="mt-10 pt-6 border-t space-y-2" style={{ borderColor: C.border }}>
                  <div className="text-xs font-bold font-display uppercase tracking-widest px-2 mb-3" style={{ color: C.muted }}>Quick Actions</div>
                  
                  <button onClick={copyLink} className="action-btn">
                    <span>🔗</span> Copy Link
                  </button>

                  <a
                    href={`/${profile.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="action-btn"
                  >
                    <span>🌐</span> View Profile
                  </a>

                  <button onClick={() => setShowQR(true)} className="action-btn">
                    <span>📥</span> Get QR Code
                  </button>
                </div>
              )}
            </div>

            {/* Logout Footer */}
            <div className="pt-6 border-t mt-auto" style={{ borderColor: C.border }}>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-2 py-2 text-sm font-bold font-display transition-all hover:opacity-70 w-full text-left"
                style={{ color: C.red }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Sign Out
              </button>
            </div>

          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* TOPBAR */}
          <header className="sticky top-0 z-20 px-6 py-4 flex justify-between items-center transition-all border-b backdrop-blur-md"
            style={{ background: "rgba(255,255,255,0.85)", borderColor: C.border }}>
            
            <h1 className="text-xl font-extrabold font-display tracking-tight pl-12 md:pl-0" style={{ color: C.dark }}>
              Dashboard
            </h1>

            <div className="flex items-center gap-4">
              {profile?.username && (
                <a
                  href={`/${profile.username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:block text-sm font-bold font-display transition-colors hover:underline"
                  style={{ color: C.primary }}
                >
                  digiqr.io/{profile.username}
                </a>
              )}

              <Link to="/profile" className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold font-display border transition-all hover:-translate-y-px"
                style={{ background: C.primaryLt, color: C.primary, borderColor: "#C7D2FE" }}>
                {profile?.name?.charAt(0).toUpperCase() || "U"}
              </Link>
            </div>
          </header>

          {/* PAGE CONTENT WRAPPER */}
          <main className="flex-1 p-5 md:p-8 w-full mx-auto">
            {children}
          </main>

        </div>

        {/* QR MODAL */}
        {showQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowQR(false)}></div>
            
            {/* Modal Card */}
            <div className="relative bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl" style={{ border: `1px solid ${C.border}` }}>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3" style={{ background: C.primaryLt, color: C.primary }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="8" x2="12" y2="16"></line></svg>
                </div>
                <h2 className="text-xl font-extrabold font-display tracking-tight" style={{ color: C.dark }}>
                  Your Smart QR Code
                </h2>
                <p className="text-xs mt-1" style={{ color: C.muted }}>
                  Scan to view your digital profile
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl flex justify-center mb-6 border" style={{ borderColor: C.border }}>
                <QRCodeCanvas id="profileQR" value={profileUrl} size={180} fgColor={C.dark} />
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={downloadQR} 
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold font-display text-white transition-all hover:opacity-90"
                  style={{ background: C.primary }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download PNG
                </button>

                <button
                  onClick={() => setShowQR(false)}
                  className="w-full py-3 rounded-xl text-sm font-bold font-display transition-all hover:bg-gray-50 border"
                  style={{ color: C.dark, borderColor: C.border }}
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
}