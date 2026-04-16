import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
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
  successLt:  "#D1FAE5",
};

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/me");
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

  const profileUrl = profile
    ? `${window.location.origin}/${profile.username}`
    : "";

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    alert("Link copied to clipboard!");
  };

  if (!profile) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <div className="w-10 h-10 border-4 border-t-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: C.primary }}></div>
          <p className="text-sm font-semibold font-display" style={{ color: C.muted }}>Loading your dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      
      {/* HEADER / WELCOME */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight mb-1" style={{ color: C.dark }}>
          Welcome back, {profile.name?.split(" ")[0] || "User"} 👋
        </h1>
        <p className="text-sm" style={{ color: C.muted }}>
          Here is what's happening with your digital profile today.
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        
        {/* Stat: Views */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm transition-all hover:shadow-md" style={{ borderColor: C.border }}>
          <div className="flex justify-between items-start mb-4">
            <div className="text-xs font-bold font-display uppercase tracking-wider" style={{ color: C.muted }}>Total Views</div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: C.primaryLt, color: C.primary }}>👁</div>
          </div>
          <div className="text-4xl font-extrabold font-display tracking-tight" style={{ color: C.dark }}>
            {profile.views || 0}
          </div>
        </div>

        {/* Stat: Links */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm transition-all hover:shadow-md" style={{ borderColor: C.border }}>
          <div className="flex justify-between items-start mb-4">
            <div className="text-xs font-bold font-display uppercase tracking-wider" style={{ color: C.muted }}>Active Links</div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: C.primaryLt, color: C.primary }}>🔗</div>
          </div>
          <div className="text-4xl font-extrabold font-display tracking-tight" style={{ color: C.dark }}>
            {profile.links?.length || 0}
          </div>
        </div>

        {/* Stat: Leads */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm transition-all hover:shadow-md" style={{ borderColor: C.border }}>
          <div className="flex justify-between items-start mb-4">
            <div className="text-xs font-bold font-display uppercase tracking-wider" style={{ color: C.muted }}>Total Leads</div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: C.primaryLt, color: C.primary }}>🎯</div>
          </div>
          <div className="text-4xl font-extrabold font-display tracking-tight" style={{ color: C.dark }}>
            {profile.leads?.length || 0}
          </div>
        </div>

      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* LEFT COLUMN: Leads Table (Takes up 2/3 space on large screens) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          <div className="bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col" style={{ borderColor: C.border }}>
            <div className="px-6 py-5 border-b flex justify-between items-center bg-white" style={{ borderColor: C.border }}>
              <div>
                <h2 className="text-lg font-extrabold font-display tracking-tight" style={{ color: C.dark }}>Recent Leads</h2>
                <p className="text-xs mt-0.5" style={{ color: C.muted }}>Visitors who filled out your contact form.</p>
              </div>
              <div className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: C.primaryLt, color: C.primary }}>
                {profile.leads?.length || 0} Total
              </div>
            </div>

            {profile.leads?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs font-bold font-display uppercase tracking-wider" style={{ background: C.bg, color: C.mid }}>
                      <th className="px-6 py-4 font-semibold border-b" style={{ borderColor: C.border }}>Contact</th>
                      <th className="px-6 py-4 font-semibold border-b" style={{ borderColor: C.border }}>Message</th>
                      <th className="px-6 py-4 font-semibold border-b" style={{ borderColor: C.border }}>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm" style={{ borderColor: C.border }}>
                    {profile.leads.map((l, i) => {
                      const dateObj = new Date(l.createdAt);
                      return (
                        <tr key={i} className="transition-colors hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-bold font-display" style={{ color: C.dark }}>{l.name}</div>
                            <div className="text-xs mt-0.5" style={{ color: C.muted }}>{l.email}</div>
                          </td>
                          <td className="px-6 py-4 max-w-[200px] truncate" style={{ color: C.mid }}>
                            {l.message || <span className="italic text-gray-400">No message</span>}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium" style={{ color: C.dark }}>
                              {dateObj.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                            </div>
                            <div className="text-xs mt-0.5" style={{ color: C.muted }}>
                              {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3" style={{ background: C.bg }}>📭</div>
                <h3 className="text-base font-bold font-display mb-1" style={{ color: C.dark }}>No leads yet</h3>
                <p className="text-sm max-w-xs" style={{ color: C.muted }}>Share your profile link to start capturing visitors' information.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Actions & Analytics */}
        <div className="flex flex-col gap-6">
          
          {/* Quick Actions Panel */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm" style={{ borderColor: C.border }}>
            <h2 className="text-sm font-extrabold font-display uppercase tracking-widest mb-4" style={{ color: C.muted }}>Quick Actions</h2>
            
            <div className="flex flex-col gap-3">
              <Link to="/profile" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold font-display text-white transition-all hover:opacity-90 hover:-translate-y-px" style={{ background: C.primary, boxShadow: `0 8px 24px ${C.primary}44` }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                Edit Profile Settings
              </Link>

              {profile.username && (
                <div className="grid grid-cols-2 gap-3">
                  <a href={`/${profile.username}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold font-display transition-all hover:bg-gray-50 border" style={{ color: C.dark, borderColor: C.border }}>
                    <span>🌐</span> View Live
                  </a>
                  <button onClick={copyLink} className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold font-display transition-all hover:bg-gray-50 border" style={{ color: C.dark, borderColor: C.border }}>
                    <span>🔗</span> Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Link Analytics Panel */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm" style={{ borderColor: C.border }}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-sm font-extrabold font-display uppercase tracking-widest" style={{ color: C.muted }}>Link Clicks</h2>
              <span className="text-xs font-semibold px-2 py-1 rounded-md" style={{ background: C.bg, color: C.mid }}>All Time</span>
            </div>

            {profile.links?.length > 0 ? (
              <div className="flex flex-col gap-3">
                {profile.links.map((l, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border transition-all hover:bg-gray-50" style={{ borderColor: C.border }}>
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs flex-shrink-0" style={{ background: C.bg, color: C.dark }}>
                        {l.title?.charAt(0).toUpperCase() || "🔗"}
                      </div>
                      <span className="text-sm font-bold font-display truncate" style={{ color: C.dark }}>{l.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0 ml-3 bg-white px-2.5 py-1 rounded-lg border shadow-sm" style={{ borderColor: C.border }}>
                      <span className="text-xs font-extrabold" style={{ color: C.primary }}>{l.clicks || 0}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: C.muted }}>Clicks</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm" style={{ color: C.muted }}>No links added to your profile yet.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </Layout>
  );
}