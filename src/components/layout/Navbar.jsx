import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Palette } from "lucide-react";
import { useApp } from "../../context/AppContext";
import RoleSwitcher from "./RoleSwitcher";

export default function Navbar() {
  const { theme, cycleTheme, themeKey } = useApp();
  const location = useLocation();

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
    <nav style={{
      background: "rgba(5,5,16,0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      padding: "0 32px",
      height: "68px",
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
  color: "white",
  fontWeight: "800", fontSize: "20px",
  letterSpacing: "-0.5px",
  textShadow: `0 0 20px ${theme.primary}, 0 0 40px ${theme.primary}80`
}}>FinanceIQ</span>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {links.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link key={to} to={to} style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 18px", borderRadius: "12px", textDecoration: "none",
              fontSize: "14px", fontWeight: "500", transition: "all 0.2s",
              background: isActive ? `rgba(${theme.primary === "#6366f1" ? "99,102,241" : theme.primary === "#06b6d4" ? "6,182,212" : "16,185,129"},0.12)` : "transparent",
              color: isActive ? theme.primary : "rgba(255,255,255,0.45)",
              border: isActive ? `1px solid ${theme.primary}40` : "1px solid transparent",
              boxShadow: isActive ? `0 0 20px ${theme.glow}` : "none"
            }}>
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <RoleSwitcher />

        {/* Theme Switcher */}
        <button
          onClick={cycleTheme}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "8px 14px", borderRadius: "12px", border: "none",
            background: `linear-gradient(135deg, ${theme.primary}20, ${theme.accent}20)`,
            cursor: "pointer", transition: "all 0.3s",
            border: `1px solid ${theme.primary}30`,
            color: theme.primary, fontSize: "12px", fontWeight: "600"
          }}
        >
          <Palette size={14} />
          {themeNames[themeKey]}
        </button>
      </div>
    </nav>
  );
}