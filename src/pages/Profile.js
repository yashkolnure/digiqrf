import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { QRCodeCanvas } from "qrcode.react";
import api from "../api";

/* ─── TOKENS ─────────────────────────────────────── */
const C = {
  bg:         "#F6F7F9",
  surface:    "#FFFFFF",
  primary:    "#1847F0",
  primaryLt:  "#EEF2FF",
  dark:       "#0D0F14",
  mid:        "#374151",
  muted:      "#6B7280",
  border:     "#E5E7EB",
  success:    "#059669",
};

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    bio: "",
    profileImage: "",
    banner: "",
    phone: "",
    email: "",
    theme: "default",
    social: {},
    links: [],
    services: [],
    portfolio: [],
    testimonials: [],
    enableContactForm: false
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/me");
        if (res.data) setProfile({ ...profile, ...res.data });
      } catch (err) {
        console.error("Failed to load profile data");
      }
    };
    fetchProfile();
  }, []);

  // ---------- HELPERS ----------
  const updateField = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const updateSocial = (field, value) => {
    setProfile({
      ...profile,
      social: { ...profile.social, [field]: value }
    });
  };

  const addItem = (key, obj) => {
    setProfile({
      ...profile,
      [key]: [...(profile[key] || []), obj]
    });
  };

  const updateItem = (key, i, field, value) => {
    const updated = [...profile[key]];
    updated[i][field] = value;
    setProfile({ ...profile, [key]: updated });
  };

  const removeItem = (key, i) => {
    const updated = profile[key].filter((_, index) => index !== i);
    setProfile({ ...profile, [key]: updated });
  };

  const saveProfile = async () => {
    setLoading(true);
    try {
      await api.post("/profile", profile);
      // Small visual feedback logic could go here
    } catch (err) {
      alert(err.response?.data?.msg || "Error saving profile");
    } finally {
      setLoading(false);
    }
  };
const getPreviewTheme = () => {
    switch (profile.theme) {
      case "dark":
        return { outerBg: "#111827", cardBg: "#1F2937", text: "#FFFFFF", btnBg: "#FFFFFF", btnText: "#000000", border: "none" };
      case "gradient":
        return { outerBg: "linear-gradient(to bottom right, #6366f1, #9333ea)", cardBg: "#FFFFFF", text: "#000000", btnBg: "#4f46e5", btnText: "#FFFFFF", border: "none" };
      case "glass":
        return { outerBg: "linear-gradient(to bottom right, #818cf8, #a855f7)", cardBg: "rgba(255,255,255,0.2)", text: "#FFFFFF", btnBg: "rgba(255,255,255,0.3)", btnText: "#FFFFFF", border: "1px solid rgba(255,255,255,0.3)" };
      case "minimal":
        return { outerBg: "#F3F4F6", cardBg: "#FFFFFF", text: "#000000", btnBg: "#111827", btnText: "#FFFFFF", border: "1px solid #E5E7EB" };
      case "cyberneural":
        return { outerBg: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", cardBg: "rgba(255,255,255,0.05)", text: "#E2E8F0", btnBg: "rgba(255,255,255,0.1)", btnText: "#FFFFFF", border: "1px solid rgba(255,255,255,0.2)" };
      default:
        return { outerBg: "#F3F4F6", cardBg: "#FFFFFF", text: "#000000", btnBg: "#4f46e5", btnText: "#FFFFFF", border: "none" };
    }
  };

  const pt = getPreviewTheme();
  // Shared Input Style
  const inputClass = "w-full px-4 py-3 rounded-xl text-sm font-body transition-all focus:outline-none focus:ring-2 focus:bg-white";
  const inputStyle = { background: C.bg, border: `1.5px solid ${C.border}`, color: C.dark, "--tw-ring-color": C.primaryLt };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-8 items-start relative">

        {/* LEFT PANEL: BUILDER FORM */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6">
          
          <div className="flex items-center justify-between bg-white p-5 rounded-2xl border shadow-sm sticky top-20 z-10" style={{ borderColor: C.border }}>
            <div>
              <h2 className="text-xl font-extrabold font-display tracking-tight" style={{ color: C.dark }}>Profile Builder</h2>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>Changes update in real-time.</p>
            </div>
            <button 
              onClick={saveProfile} 
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold font-display text-white transition-all hover:opacity-90 disabled:opacity-70"
              style={{ background: C.primary, boxShadow: `0 8px 24px ${C.primary}44` }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* BASIC INFO */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm" style={{ borderColor: C.border }}>
            <h3 className="text-sm font-extrabold font-display uppercase tracking-widest mb-4" style={{ color: C.muted }}>Basic Information</h3>
            <div className="flex flex-col gap-4">
              <input placeholder="Full Name" className={inputClass} style={inputStyle} value={profile.name || ""} onChange={(e) => updateField("name", e.target.value)} />
              <input placeholder="Username (digiqr.io/username)" className={inputClass} style={inputStyle} value={profile.username || ""} onChange={(e) => updateField("username", e.target.value)} />
              <input placeholder="Profile Image URL" className={inputClass} style={inputStyle} value={profile.profileImage || ""} onChange={(e) => updateField("profileImage", e.target.value)} />
              <textarea placeholder="Write a short bio..." className={inputClass} style={{ ...inputStyle, minHeight: "100px" }} value={profile.bio || ""} onChange={(e) => updateField("bio", e.target.value)} />
            </div>
          </div>

          {/* CONTACT & SOCIAL */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm" style={{ borderColor: C.border }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-extrabold font-display uppercase tracking-widest" style={{ color: C.muted }}>Contact & Social</h3>
              <label className="flex items-center gap-2 text-xs font-bold font-display cursor-pointer" style={{ color: C.dark }}>
                <input type="checkbox" checked={profile.enableContactForm} onChange={(e) => updateField("enableContactForm", e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" />
                Enable Lead Form
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Phone Number" className={inputClass} style={inputStyle} value={profile.phone || ""} onChange={(e) => updateField("phone", e.target.value)} />
              <input placeholder="Public Email" className={inputClass} style={inputStyle} value={profile.email || ""} onChange={(e) => updateField("email", e.target.value)} />
              <input placeholder="Instagram Username" className={inputClass} style={inputStyle} value={profile.social?.instagram || ""} onChange={(e) => updateSocial("instagram", e.target.value)} />
              <input placeholder="LinkedIn URL" className={inputClass} style={inputStyle} value={profile.social?.linkedin || ""} onChange={(e) => updateSocial("linkedin", e.target.value)} />
            </div>
          </div>

          {/* LINKS */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm" style={{ borderColor: C.border }}>
            <h3 className="text-sm font-extrabold font-display uppercase tracking-widest mb-4" style={{ color: C.muted }}>Important Links</h3>
            <div className="flex flex-col gap-3">
              {profile.links?.map((l, i) => (
                <div key={i} className="flex gap-2 items-center p-3 rounded-xl border bg-gray-50" style={{ borderColor: C.border }}>
                  <div className="flex flex-col w-full gap-2">
                    <input className={inputClass} style={{...inputStyle, padding: "8px 12px"}} placeholder="Title (e.g. My Website)" value={l.title} onChange={(e) => updateItem("links", i, "title", e.target.value)} />
                    <input className={inputClass} style={{...inputStyle, padding: "8px 12px"}} placeholder="URL (https://...)" value={l.url} onChange={(e) => updateItem("links", i, "url", e.target.value)} />
                  </div>
                  <button onClick={() => removeItem("links", i)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
              <button onClick={() => addItem("links", { title: "", url: "" })} className="w-full py-3 rounded-xl text-sm font-bold font-display border border-dashed transition-all hover:bg-gray-50" style={{ borderColor: C.mid, color: C.dark }}>
                + Add New Link
              </button>
            </div>
          </div>

          {/* PORTFOLIO / PROJECTS */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm" style={{ borderColor: C.border }}>
            <h3 className="text-sm font-extrabold font-display uppercase tracking-widest mb-4" style={{ color: C.muted }}>Portfolio / Projects</h3>
            <div className="flex flex-col gap-4">
              {profile.portfolio?.map((p, i) => (
                <div key={i} className="flex flex-col gap-2 p-4 rounded-xl border bg-gray-50 relative" style={{ borderColor: C.border }}>
                  <button onClick={() => removeItem("portfolio", i)} className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                  <input className={inputClass} style={{...inputStyle, padding: "8px 12px"}} placeholder="Project Title" value={p.title} onChange={(e) => updateItem("portfolio", i, "title", e.target.value)} />
                  <input className={inputClass} style={{...inputStyle, padding: "8px 12px"}} placeholder="Project Link" value={p.link} onChange={(e) => updateItem("portfolio", i, "link", e.target.value)} />
                  <input className={inputClass} style={{...inputStyle, padding: "8px 12px"}} placeholder="Image URL (optional)" value={p.image} onChange={(e) => updateItem("portfolio", i, "image", e.target.value)} />
                </div>
              ))}
              <button onClick={() => addItem("portfolio", { title: "", link: "", image: "" })} className="w-full py-3 rounded-xl text-sm font-bold font-display border border-dashed transition-all hover:bg-gray-50" style={{ borderColor: C.mid, color: C.dark }}>
                + Add Project
              </button>
            </div>
          </div>

          {/* THEMES */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm mb-10" style={{ borderColor: C.border }}>
            <h3 className="text-sm font-extrabold font-display uppercase tracking-widest mb-4" style={{ color: C.muted }}>Appearance</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "default", label: "Clean White", bg: "#FFFFFF", text: "#0D0F14", border: "#E5E7EB" },
                { name: "dark", label: "Midnight", bg: "#0D0F14", text: "#FFFFFF", border: "#374151" },
                { name: "cyberneural", label: "Cyber Neural", bg: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", text: "#E2E8F0", border: "#8B5CF6" },
                { name: "gradient", label: "Sunrise", bg: "linear-gradient(to right, #ff9966, #ff5e62)", text: "#FFFFFF", border: "transparent" },
              ].map((theme) => (
                <div
                  key={theme.name}
                  onClick={() => updateField("theme", theme.name)}
                  className="p-4 rounded-xl cursor-pointer border text-center transition-all relative overflow-hidden"
                  style={{ 
                    background: theme.bg, 
                    color: theme.text,
                    borderColor: profile.theme === theme.name ? C.primary : C.border,
                    borderWidth: profile.theme === theme.name ? "2px" : "1px",
                    transform: profile.theme === theme.name ? "scale(1.02)" : "scale(1)"
                  }}
                >
                  {profile.theme === theme.name && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                  )}
                  <p className="text-xs font-bold font-display mt-1">{theme.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
{/* RIGHT PANEL: LIVE PREVIEW (STICKY) */}
        <div className="w-full lg:w-2/5 sticky top-28 hidden md:flex flex-col items-center gap-4">
          
          {/* View Live Action Bar */}
          {profile.username ? (
            <div className="w-[440px] bg-white border rounded-2xl p-2.5 shadow-sm flex justify-between items-center" style={{ borderColor: C.border }}>
              <div className="flex items-center gap-2 pl-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold font-display uppercase tracking-widest" style={{ color: C.muted }}>Live Preview</span>
              </div>
              <a 
                href={`/${profile.username}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-display text-white transition-all hover:-translate-y-px"
                style={{ background: C.primary, boxShadow: `0 4px 12px ${C.primary}33` }}
              >
                View Live
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          ) : (
            <div className="w-[440px] bg-white border rounded-2xl p-4 shadow-sm text-center" style={{ borderColor: C.border }}>
              <span className="text-xs font-bold font-display uppercase tracking-widest" style={{ color: C.muted }}>Claim username to view live</span>
            </div>
          )}

          {/* Simple Preview Window (No Phone Frame) */}
          <div 
            className="w-[440px] max-h-[calc(100vh-190px)] rounded-3xl overflow-y-auto no-scrollbar shadow-2xl transition-all duration-300 p-5 font-body border"
            style={{ 
              background: pt.outerBg,
              borderColor: C.border 
            }}
          >
            
            {/* Profile Card (Matches Card inside PublicProfile) */}
            <div 
              className="w-full rounded-2xl shadow-sm p-6 text-center"
              style={{ background: pt.cardBg, color: pt.text, border: pt.border, backdropFilter: profile.theme === "glass" ? "blur(12px)" : "none" }}
            >
              
              {/* Header Section */}
              {profile.profileImage ? (
                <img src={profile.profileImage} alt="" className="w-20 h-20 rounded-full mx-auto mb-3 object-cover shadow-sm" />
              ) : (
                <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold bg-gray-200 text-gray-600 shadow-sm">
                  {profile.name?.charAt(0) || "U"}
                </div>
              )}
              <h2 className="text-xl font-bold font-display">{profile.name || "Your Name"}</h2>
              <p className="text-xs opacity-70">@{profile.username || "username"}</p>
              {profile.bio && <p className="mt-2 mb-4 text-sm opacity-80 leading-relaxed">{profile.bio}</p>}

              {/* Contact Buttons */}
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {profile.phone && <div className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-800 border shadow-sm">📞 Call</div>}
                {profile.email && <div className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-800 border shadow-sm">✉️ Email</div>}
                {profile.social?.whatsapp && <div className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-500 text-white shadow-sm">WhatsApp</div>}
              </div>

              {/* Social Texts */}
              <div className="flex justify-center gap-3 mb-5 flex-wrap text-xs opacity-80 font-medium">
                {profile.social?.instagram && <span>Instagram</span>}
                {profile.social?.linkedin && <span>LinkedIn</span>}
                {profile.social?.twitter && <span>Twitter</span>}
              </div>

              {/* Links */}
              {profile.links?.length > 0 && (
                <div className="mb-6 space-y-2.5">
                  {profile.links.map((l, i) => (
                    <div 
                      key={i} 
                      className="block py-2.5 rounded-xl text-sm font-bold shadow-sm transition-transform hover:-translate-y-px"
                      style={{ background: pt.btnBg, color: pt.btnText }}
                    >
                      {l.title || "Link Title"}
                    </div>
                  ))}
                </div>
              )}

              {/* Services */}
              {profile.services?.length > 0 && (
                <div className="mb-5 text-left border-t pt-4" style={{ borderColor: "rgba(128,128,128,0.2)" }}>
                  <h3 className="font-bold mb-3 text-sm tracking-wide">Services</h3>
                  {profile.services.map((s, i) => (
                    <div key={i} className="mb-3">
                      <b className="text-sm font-display">{s.title || "Service Title"}</b>
                      <p className="text-xs opacity-70 mt-0.5 leading-relaxed">{s.description || "Service description goes here."}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Portfolio */}
              {profile.portfolio?.length > 0 && (
                <div className="mb-5 text-left border-t pt-4" style={{ borderColor: "rgba(128,128,128,0.2)" }}>
                  <h3 className="font-bold mb-3 text-sm tracking-wide">Portfolio</h3>
                  {profile.portfolio.map((p, i) => (
                    <div key={i} className="mb-1.5 text-sm underline opacity-90 cursor-pointer">
                      {p.title || "Project Title"}
                    </div>
                  ))}
                </div>
              )}

              {/* Testimonials */}
              {profile.testimonials?.length > 0 && (
                <div className="mb-5 text-left border-t pt-4" style={{ borderColor: "rgba(128,128,128,0.2)" }}>
                  <h3 className="font-bold mb-3 text-sm tracking-wide">Testimonials</h3>
                  {profile.testimonials.map((t, i) => (
                    <div key={i} className="mb-3">
                      <b className="text-sm font-display">{t.name || "Client Name"}</b>
                      <p className="text-xs opacity-70 mt-0.5 italic">"{t.text || "Feedback goes here"}"</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact Form Placeholder */}
              {profile.enableContactForm && (
                <div className="mb-5 border-t pt-4" style={{ borderColor: "rgba(128,128,128,0.2)" }}>
                  <h3 className="font-bold mb-3 text-left text-sm tracking-wide">Contact Me</h3>
                  <div className="w-full h-8 rounded-lg bg-gray-500/10 mb-2 border border-gray-500/20"></div>
                  <div className="w-full h-8 rounded-lg bg-gray-500/10 mb-2 border border-gray-500/20"></div>
                  <div className="w-full h-16 rounded-lg bg-gray-500/10 mb-3 border border-gray-500/20"></div>
                  <div className="w-full py-2 rounded-lg text-sm font-bold" style={{ background: pt.btnBg, color: pt.btnText }}>Submit</div>
                </div>
              )}

              {/* QR Code Placeholder */}
              <div className="mt-6 flex flex-col items-center border-t pt-5" style={{ borderColor: "rgba(128,128,128,0.2)" }}>
                <div className="w-[100px] h-[100px] bg-white p-1 rounded-lg">
                  <QRCodeCanvas value="digiqr.io" size={92} />
                </div>
                <div className="mt-3 text-[10px] uppercase font-bold opacity-50 tracking-widest">Download QR</div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}