import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Palette, Menu, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import RoleSwitcher from "./RoleSwitcher";
import { useState } from "react";

export default function Navbar() {
  const { theme, cycleTheme, themeKey } = useApp();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
    { to: "/insights", label: "Insights", icon: Lightbulb },
  ];

  const themeNames = {
    "blue-purple-pink": "Cosmic",
    "cyan-blue-purple": "Ocean",
    "green-teal-cyan": "Matrix",
  };

  return (
    <>
      <nav style={{
        background: "rgba(5,5,16,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "0 20px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "12px",
            background: theme.gradient,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: "800", color: "white",
            boxShadow: `0 0 20px ${theme.glow}`
          }}>F</div>
          <span style={{
            color: "white", fontWeight: "800", fontSize: "18px",
            letterSpacing: "-0.5px",
            textShadow: `0 0 20px ${theme.primary}`
          }}>FinanceIQ</span>
        </div>

        {/* Desktop Nav Links */}
        <div style={{
          display: "flex", alignItems: "center", gap: "4px",
          "@media (max-width: 768px)": { display: "none" }
        }} className="desktop-nav">
          {links.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link key={to} to={to} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 16px", borderRadius: "12px", textDecoration: "none",
                fontSize: "14px", fontWeight: "500", transition: "all 0.2s",
                background: isActive ? `${theme.primary}20` : "transparent",
                color: isActive ? theme.primary : "rgba(255,255,255,0.45)",
                border: isActive ? `1px solid ${theme.primary}40` : "1px solid transparent",
              }}>
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Desktop only */}
          <div className="desktop-nav">
            <RoleSwitcher />
          </div>
          <button
            onClick={cycleTheme}
            className="desktop-nav"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "7px 12px", borderRadius: "12px", border: "none",
              background: `linear-gradient(135deg, ${theme.primary}20, ${theme.accent}20)`,
              cursor: "pointer",
              border: `1px solid ${theme.primary}30`,
              color: theme.primary, fontSize: "12px", fontWeight: "600"
            }}
          >
            <Palette size={13} />
            {themeNames[themeKey]}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-nav"
            style={{
              background: "rgba(255,255,255,0.06)", border: "none",
              width: "36px", height: "36px", borderRadius: "10px",
              cursor: "pointer", color: "white",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "64px", left: 0, right: 0,
          background: "rgba(5,5,16,0.98)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "16px 20px",
          zIndex: 49, display: "flex", flexDirection: "column", gap: "8px"
        }}>
          {links.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link key={to} to={to}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "12px 16px", borderRadius: "12px", textDecoration: "none",
                  fontSize: "15px", fontWeight: "500",
                  background: isActive ? `${theme.primary}20` : "rgba(255,255,255,0.03)",
                  color: isActive ? theme.primary : "rgba(255,255,255,0.7)",
                  border: `1px solid ${isActive ? theme.primary + "40" : "rgba(255,255,255,0.06)"}`,
                }}>
                <Icon size={17} />
                {label}
              </Link>
            );
          })}

          <div style={{ marginTop: "8px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <RoleSwitcher />
          </div>

          <button
            onClick={() => { cycleTheme(); setMenuOpen(false); }}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 16px", borderRadius: "12px", border: "none",
              background: `linear-gradient(135deg, ${theme.primary}20, ${theme.accent}20)`,
              cursor: "pointer",
              border: `1px solid ${theme.primary}30`,
              color: theme.primary, fontSize: "13px", fontWeight: "600",
              width: "fit-content"
            }}
          >
            <Palette size={14} />
            {themeNames[themeKey]}
          </button>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-nav { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}