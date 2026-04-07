import { useApp } from "../../context/AppContext";

export default function SummaryCard({ title, amount, icon: Icon, gradient, glow, delay, image }) {
  const { theme } = useApp();

  return (
    <div
      className="card-hover"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "24px",
        padding: "28px",
        cursor: "default",
        animation: `slideUp 0.6s ease ${delay} forwards`,
        opacity: 0,
        position: "relative",
        overflow: "hidden"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
        e.currentTarget.style.border = `1px solid ${theme.primary}60`;
        e.currentTarget.style.boxShadow = `
          0 0 0 1px ${theme.primary}30,
          0 0 20px ${theme.primary}40,
          0 0 40px ${theme.primary}20,
          0 20px 40px rgba(0,0,0,0.3)
        `;
        e.currentTarget.style.background = `rgba(255,255,255,0.06)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      }}
    >
      {/* Background gradient blob */}
      <div style={{
        position: "absolute", top: "-40px", right: "-40px",
        width: "130px", height: "130px", borderRadius: "50%",
        background: gradient, opacity: 0.12,
        filter: "blur(25px)", pointerEvents: "none",
      }} />

      {/* Top row */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", marginBottom: "16px"
      }}>
        <span style={{
          fontSize: "11px", color: "rgba(255,255,255,0.4)",
          fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.2px",
          fontFamily: "'Syne', sans-serif"
        }}>
          {title}
        </span>

        {/* 3D Image */}
{image ? (
  <div>
    <img
      src={image}
      alt={title}
      style={{
        width: "64px",
        height: "64px",
        objectFit: "contain",
        filter: `drop-shadow(0 0 12px ${glow}) drop-shadow(0 8px 16px rgba(0,0,0,0.4))`,
      }}
    />
  </div>
) : (
          <div style={{
            width: "44px", height: "44px", borderRadius: "14px",
            background: gradient,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: glow
          }}>
            <Icon size={20} color="white" />
          </div>
        )}
      </div>

      {/* Amount */}
      <p style={{
        fontSize: "30px", fontWeight: "800", color: "white",
        letterSpacing: "-1px", marginBottom: "16px",
        fontFamily: "'Syne', sans-serif"
      }}>
        ₹{amount.toLocaleString("en-IN")}
      </p>

      {/* Bottom glowing bar */}
      <div style={{
        height: "3px", borderRadius: "10px",
        background: gradient, opacity: 0.6,
        boxShadow: `0 0 10px ${theme.primary}60`
      }} />
    </div>
  );
}