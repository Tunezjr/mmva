"use client";

import { useState, useEffect } from "react";

const APPS = [
  { name: "Kuru", icon: "/logos/kuru.jpeg", description: "Kuru is a high-performance, fully on-chain order book decentralized exchange (DEX). Designed to provide a Centralized Exchange (CEX)-like trading experience directly on-chain", category: "DeFi", url: "https://kuru.io" },

  { name: "Curvance", icon: "/logos/curvance.png", description: "Cross-chain money market enabling lending, borrowing, and yield optimization natively built for Monad's high-performance EVM.", category: "DeFi", url: "https://curvance.com/" },

  { name: "aPriori", icon: "/logos/aPriori.jpeg", description: "MEV-powered liquid staking protocol on Monad, letting users stake $MON, earn boosted yields, and receive $aprMON for use across DeFi.", category: "DeFi", url: "https://www.apr.io/" },

  { name: "Kintsu", icon: "/logos/kintsu.jpg", description: "Composable liquid staking protocol on Monad, letting users stake $MON for $sMON and deploy it across DeFi while earning validator rewards.", category: "DeFi", url: "https://kintsu.xyz/staking" },

  { name: "Poply", icon: "/logo/poply.png", description: "Community-based NFT Marketplace & Launchpad Powered by Poply Otters NFT Collection", category: "NFT", url: "https://poply.xyz" },

  { name: "Chog", icon: "/logos/chog.jpg", description: "Born from the Monad community, Chog has become the most adored monanimal. Chog is a mischievous kid who is curious and he always finds new ways to cause chaos.", category: "NFT", url: "https://chog.xyz" },

  { name: "NadPoker", icon: "/logos/nadpoker.jpg", description: "The first poker lounge on Monad 💜", category: "NFT", url: "https://nadpoker.xyz" },

  { name: "Nodal", icon: null, description: "One-click RPC infrastructure for Monad with global edge nodes and 99.99% uptime SLA.", category: "Infra", url: "#" },
  { name: "BlockWatch", icon: null, description: "Real-time block explorer with parallel transaction tracing and call graph visualization.", category: "Infra", url: "#" },
  { name: "MonadBridge", icon: null, description: "Canonical cross-chain bridge connecting Monad to Ethereum, Solana, and major L2s.", category: "Infra", url: "#" },
  { name: "Ignite SDK", icon: null, description: "Type-safe TypeScript SDK for Monad with hooks, contract abstractions, and wallet connectors.", category: "Tools", url: "#" },
  { name: "Faucet Pro", icon: null, description: "Testnet token faucet with Discord and GitHub verification, distributing MON on demand.", category: "Tools", url: "#" },
  { name: "Trace", icon: null, description: "Developer debugging suite with step-through EVM execution and storage diff viewer.", category: "Tools", url: "#" },
  { name: "Vault Guard", icon: null, description: "Automated smart contract auditing tool fine-tuned on Monad's parallel execution model.", category: "Tools", url: "#" },
];

// Monad official brand colors — monad.xyz/brand-and-media-kit
const BRAND = {
  primary: "#6E54FF",
  primaryBg:     "rgba(110,84,255,0.10)",
  primaryBorder: "rgba(110,84,255,0.30)",
  primaryStrong: "rgba(110,84,255,0.50)",
  tint: "#DDD7FE",
};

const THEMES = {
  dark: {
    bg:              "#0E091C",
    navBg:           "rgba(14,9,28,0.92)",
    navBorder:       "rgba(255,255,255,0.07)",
    cardBg:          "rgba(255,255,255,0.03)",
    cardBorder:      "rgba(255,255,255,0.08)",
    cardHoverBg:     BRAND.primaryBg,
    cardHoverBorder: BRAND.primaryStrong,
    titleColor:      "#FFFFFF",
    textPrimary:     "#FFFFFF",
    textSecondary:   "rgba(255,255,255,0.45)",
    textMuted:       "rgba(221,215,254,0.35)",
    eyebrowText:     BRAND.tint,
    eyebrowBg:       BRAND.primaryBg,
    eyebrowBorder:   BRAND.primaryBorder,
    btnBorder:       "rgba(255,255,255,0.10)",
    btnColor:        "rgba(221,215,254,0.40)",
    btnHoverBorder:  "rgba(110,84,255,0.45)",
    btnHoverColor:   BRAND.tint,
    btnHoverBg:      "rgba(110,84,255,0.08)",
    btnActiveBg:     "rgba(110,84,255,0.15)",
    btnActiveBorder: "rgba(110,84,255,0.60)",
    btnActiveColor:  BRAND.tint,
    loadMoreBorder:  BRAND.primaryBorder,
    loadMoreColor:   "rgba(221,215,254,0.55)",
    loadMoreHoverBg: BRAND.primaryBg,
    loadMoreHoverBorder: BRAND.primaryStrong,
    loadMoreHoverColor:  BRAND.tint,
    footerBorder:    "rgba(255,255,255,0.07)",
    footerColor:     "rgba(221,215,254,0.30)",
    iconBg:          BRAND.primaryBg,
    iconBorder:      BRAND.primaryBorder,
    visitColor:      "rgba(221,215,254,0.35)",
    visitHoverColor: BRAND.tint,
    toggleBg:        "rgba(255,255,255,0.06)",
    toggleBorder:    "rgba(255,255,255,0.12)",
    toggleColor:     "rgba(221,215,254,0.60)",
    badgeColors: {
      DeFi:  { bg: "rgba(110,84,255,0.12)", border: "rgba(110,84,255,0.35)", text: "#DDD7FE" },
      NFT:   { bg: "rgba(255,142,228,0.10)", border: "rgba(255,142,228,0.30)", text: "#FF8EE4" },
      Infra: { bg: "rgba(133,230,255,0.10)", border: "rgba(133,230,255,0.30)", text: "#85E6FF" },
      Tools: { bg: "rgba(255,174,69,0.10)",  border: "rgba(255,174,69,0.30)",  text: "#FFAE45" },
    },
  },
  light: {
    bg:              "#EEE9FF",
    navBg:           "rgba(238,233,255,0.92)",
    navBorder:       "rgba(0,0,0,0.08)",
    cardBg:          "#FFFFFF",
    cardBorder:      "rgba(110,84,255,0.10)",
    cardHoverBg:     "rgba(110,84,255,0.05)",
    cardHoverBorder: BRAND.primary,
    titleColor:      "#0E091C",
    textPrimary:     "#0E091C",
    textSecondary:   "rgba(14,9,28,0.55)",
    textMuted:       "rgba(14,9,28,0.38)",
    eyebrowText:     BRAND.primary,
    eyebrowBg:       "rgba(110,84,255,0.07)",
    eyebrowBorder:   "rgba(110,84,255,0.20)",
    btnBorder:       "rgba(110,84,255,0.20)",
    btnColor:        "rgba(14,9,28,0.45)",
    btnHoverBorder:  BRAND.primary,
    btnHoverColor:   BRAND.primary,
    btnHoverBg:      "rgba(110,84,255,0.06)",
    btnActiveBg:     "rgba(110,84,255,0.10)",
    btnActiveBorder: BRAND.primary,
    btnActiveColor:  BRAND.primary,
    loadMoreBorder:  "rgba(110,84,255,0.30)",
    loadMoreColor:   BRAND.primary,
    loadMoreHoverBg: "rgba(110,84,255,0.07)",
    loadMoreHoverBorder: BRAND.primary,
    loadMoreHoverColor:  BRAND.primary,
    footerBorder:    "rgba(0,0,0,0.07)",
    footerColor:     "rgba(14,9,28,0.30)",
    iconBg:          "rgba(110,84,255,0.08)",
    iconBorder:      "rgba(110,84,255,0.18)",
    visitColor:      "rgba(110,84,255,0.45)",
    visitHoverColor: BRAND.primary,
    toggleBg:        "rgba(110,84,255,0.06)",
    toggleBorder:    "rgba(110,84,255,0.20)",
    toggleColor:     BRAND.primary,
    badgeColors: {
      DeFi:  { bg: "rgba(110,84,255,0.08)", border: "rgba(110,84,255,0.22)", text: BRAND.primary },
      NFT:   { bg: "rgba(180,0,140,0.06)",  border: "rgba(180,0,140,0.20)",  text: "#A0007A" },
      Infra: { bg: "rgba(0,120,180,0.07)",  border: "rgba(0,120,180,0.20)",  text: "#005F99" },
      Tools: { bg: "rgba(160,80,0,0.07)",   border: "rgba(160,80,0,0.20)",   text: "#8A4400" },
    },
  },
};

const CATEGORIES = ["All", "DeFi", "NFT", "Infra", "Tools"];

function CategoryBadge({ category, t }: any) {
  const c = t.badgeColors[category] || t.badgeColors.Tools;
  return (
    <span style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      color: c.text,
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.07em",
      padding: "3px 9px",
      borderRadius: "99px",
      textTransform: "uppercase",
    }}>{category}</span>
  );
}

function AppCard({
  app,
  index,
  t,
}: {
  app: any
  index: number
  t: any
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? t.cardHoverBg : t.cardBg,
        border: `1px solid ${hovered ? t.cardHoverBorder : t.cardBorder}`,
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "border-color 0.2s ease, background 0.2s ease, transform 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: "none",
        animationDelay: `${index * 40}ms`,
        animation: "fadeUp 0.45s ease both",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: t.iconBg,
          border: `1px solid ${t.iconBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0,
        }}>
          {app.icon
            ? <img src={app.icon} alt={app.name} style={{ width: 24, height: 24, objectFit: "contain", borderRadius: 4 }} />
            : ["⚡","🌀","🔷","💎","🌊","✦","◈","⬡","⟡","◉","⬢","⬦","⌬","◐"][index % 14]
          }
        </div>
        <CategoryBadge category={app.category} t={t} />
      </div>

      <h3 style={{
        margin: 0, fontSize: "16px", fontWeight: 700,
        color: t.textPrimary,
        fontFamily: "'DM Mono', monospace", letterSpacing: "-0.01em",
      }}>{app.name}</h3>

      <p style={{
        margin: 0, fontSize: "13.5px", lineHeight: 1.65,
        color: t.textSecondary, flexGrow: 1,
        fontFamily: "'DM Sans', sans-serif",
      }}>{app.description}</p>

      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: "4px",
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: "12.5px", fontWeight: 600,
          color: hovered ? t.visitHoverColor : t.visitColor,
          textDecoration: "none",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          transition: "color 0.2s",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        Visit App
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

const PAGE_SIZE = 9;

export default function MonadDirectory() {
  const [active, setActive] = useState("All");
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isDark, setIsDark] = useState(true);
  useEffect(() => setMounted(true), []);

  const t = isDark ? THEMES.dark : THEMES.light;

  const filtered = active === "All" ? APPS : APPS.filter(a => a.category === active);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleCategoryChange(cat: string) {
    setActive(cat);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      fontFamily: "'DM Sans', sans-serif",
      transition: "background 0.25s ease",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600&family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(110,84,255,0.30); border-radius: 3px; }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 18px;
        }

        /* ── Mobile responsive layer ── */
        @media (max-width: 768px) {
          .card-grid {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 28px !important;
          }
          .nav-inner {
            padding: 14px 16px !important;
          }
          .nav-project-count {
            display: none;
          }
          .nav-right {
            gap: 8px !important;
          }
          .hero-section {
            padding: 48px 20px 36px !important;
          }
          .hero-body {
            font-size: 14px !important;
          }
          .filter-tabs {
            padding: 0 16px 36px !important;
            gap: 8px !important;
          }
          .grid-wrapper {
            padding: 0 16px 60px !important;
          }
          .load-more-btn {
            width: 100%;
            box-sizing: border-box;
          }
        }

        @media (max-width: 400px) {
          .hero-title {
            font-size: 22px !important;
          }
          .toggle-label {
            display: none;
          }
        }
      `}</style>

      {/* Nav */}
      <nav className="nav-inner" style={{
        padding: "18px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: `1px solid ${t.navBorder}`,
        backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 50,
        background: t.navBg,
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/logos/Logomark.png"
            alt="Monad"
            style={{ width: 30, height: 30, borderRadius: 6, display: "block" }}
          />
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: t.textPrimary, fontSize: 16, letterSpacing: "-0.01em", transition: "color 0.25s ease" }}>
            Monad's<span style={{ color: BRAND.primary }}>Most Valuable App</span>
          </span>
        </div>

        <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="nav-project-count" style={{ fontSize: 12, color: t.textMuted, fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", transition: "color 0.25s ease" }}>
            {APPS.length} PROJECTS
          </span>

          <button
            onClick={() => setIsDark(d => !d)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: t.toggleBg,
              border: `1px solid ${t.toggleBorder}`,
              color: t.toggleColor,
              borderRadius: "99px",
              padding: "6px 13px",
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.04em",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
            <span className="toggle-label" style={{ textTransform: "uppercase" }}>{isDark ? "Light" : "Dark"}</span>
          </button>
        </div>
      </nav>

      <div>
        {/* Hero */}
        <div className="hero-section" style={{
          textAlign: "center",
          padding: "80px 24px 56px",
          animation: mounted ? "heroFade 0.7s ease both" : "none",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: t.eyebrowBg,
            border: `1px solid ${t.eyebrowBorder}`,
            borderRadius: 99, padding: "6px 16px", marginBottom: 28,
            transition: "background 0.25s ease, border-color 0.25s ease",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND.primary, display: "inline-block" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: t.eyebrowText, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", transition: "color 0.25s ease" }}>
              Ecosystem Directory
            </span>
          </div>

          <h1 className="hero-title" style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(36px, 5.5vw, 62px)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            margin: "0 0 18px",
            color: t.titleColor,
            transition: "color 0.25s ease",
          }}>
            Explore the{" "}
            <span style={{
              background: `linear-gradient(120deg, ${BRAND.tint} 0%, ${BRAND.primary} 60%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Monad</span>
            {" "}Ecosystem
          </h1>

          <p className="hero-body" style={{
            maxWidth: 500, margin: "0 auto",
            fontSize: "16px", lineHeight: 1.7,
            color: t.textSecondary,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            transition: "color 0.25s ease",
          }}>
            Discover the apps, protocols, and tools building on the fastest EVM-compatible L1. Curated and growing daily.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs" style={{ display: "flex", justifyContent: "center", gap: 10, padding: "0 24px 52px", flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  background: isActive ? t.btnActiveBg : "transparent",
                  border: `1px solid ${isActive ? t.btnActiveBorder : t.btnBorder}`,
                  color: isActive ? t.btnActiveColor : t.btnColor,
                  padding: "8px 20px",
                  borderRadius: "99px",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "'DM Mono', monospace",
                  textTransform: "uppercase",
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = t.btnHoverBorder;
                    e.currentTarget.style.color = t.btnHoverColor;
                    e.currentTarget.style.background = t.btnHoverBg;
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = t.btnBorder;
                    e.currentTarget.style.color = t.btnColor;
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Count */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: t.textMuted, letterSpacing: "0.08em", transition: "color 0.25s ease" }}>
            {filtered.length} {filtered.length === 1 ? "PROJECT" : "PROJECTS"}{active !== "All" ? ` IN ${active.toUpperCase()}` : ""}
          </span>
        </div>

        {/* Grid */}
        <div className="grid-wrapper" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px 80px" }}>
          <div className="card-grid">
            {visible.map((app, i) => (
              <AppCard key={app.name} app={app} index={i} t={t} />
            ))}
          </div>

          {hasMore && (
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button
                className="load-more-btn"
                onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                style={{
                  background: "transparent",
                  border: `1px solid ${t.loadMoreBorder}`,
                  color: t.loadMoreColor,
                  padding: "11px 36px",
                  borderRadius: "99px",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "'DM Mono', monospace",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = t.loadMoreHoverBg;
                  e.currentTarget.style.borderColor = t.loadMoreHoverBorder;
                  e.currentTarget.style.color = t.loadMoreHoverColor;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = t.loadMoreBorder;
                  e.currentTarget.style.color = t.loadMoreColor;
                }}
              >
                Load More
                <span style={{ marginLeft: 8, opacity: 0.5, fontSize: 11 }}>
                  {filtered.length - visibleCount} remaining
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          padding: "24px",
          borderTop: `1px solid ${t.footerBorder}`,
          color: t.footerColor,
          fontSize: 12,
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.06em",
          transition: "color 0.25s ease, border-color 0.25s ease",
        }}>
          MONAD ECOSYSTEM DIRECTORY — COMMUNITY CURATED
        </div>
      </div>
    </div>
  );
}
