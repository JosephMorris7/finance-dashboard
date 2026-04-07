import { useApp } from "../../context/AppContext";

export default function RoleSwitcher() {
  const { role, setRole, theme } = useApp();

  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: "rgba(255,255,255,0.04)",
      borderRadius: "12px", padding: "4px",
      border: "1px solid rgba(255,255,255,0.06)"
    }}>
      {["viewer", "admin"].map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          style={{
            padding: "7px 18px", borderRadius: "10px", border: "none",
            cursor: "pointer", fontSize: "13px", fontWeight: "600",
            textTransform: "capitalize", transition: "all 0.3s",
            background: role === r ? theme.gradient : "transparent",
            color: role === r ? "white" : "rgba(255,255,255,0.35)",
            boxShadow: role === r ? `0 0 20px ${theme.glow}` : "none",
            letterSpacing: "0.3px"
          }}
        >
          {r}
        </button>
      ))}
    </div>
  );
}