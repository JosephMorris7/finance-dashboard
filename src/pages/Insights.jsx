import InsightsPanel from "../components/insights/InsightsPanel";
import { useApp } from "../context/AppContext";

export default function Insights() {
  const { transactions } = useApp();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const netSavings = totalIncome - totalExpense;

  return (
    <div style={{ padding: "24px 16px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{
          fontSize: "32px", fontWeight: "700", color: "white",
          letterSpacing: "-0.5px", marginBottom: "8px"
        }}>
          Insights
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
          Smart observations from your financial data
        </p>
      </div>

      {/* Insight Cards */}
      <InsightsPanel />

      {/* Financial Health */}
      <div style={{
        marginTop: "24px",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "20px", padding: "28px"
      }}>
        <h3 style={{ color: "white", fontSize: "16px", fontWeight: "600", marginBottom: "24px" }}>
          Financial Health Summary
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { label: "Total Income", value: `₹${totalIncome.toLocaleString("en-IN")}`, color: "#34d399" },
            { label: "Total Expenses", value: `₹${totalExpense.toLocaleString("en-IN")}`, color: "#f87171" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.04)"
            }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>{label}</span>
              <span style={{ color, fontSize: "15px", fontWeight: "600" }}>{value}</span>
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "white", fontSize: "15px", fontWeight: "600" }}>Net Savings</span>
            <span style={{
              fontSize: "18px", fontWeight: "700",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>
              ₹{netSavings.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}