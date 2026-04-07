import { useApp } from "../../context/AppContext";
import { ArrowUpCircle, ArrowDownCircle, Pencil, Trash2 } from "lucide-react";

export default function TransactionTable({ onEdit }) {
  const { transactions, role, searchQuery, filterType, sortBy, deleteTransaction } = useApp();

  const filtered = transactions
    .filter((t) => filterType === "all" || t.type === filterType)
    .filter((t) =>
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "date"
        ? new Date(b.date) - new Date(a.date)
        : b.amount - a.amount
    );

  if (filtered.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "64px",
        background: "rgba(255,255,255,0.04)",
        borderRadius: "20px", border: "1px solid rgba(255,255,255,0.06)"
      }}>
        <p style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>No transactions found</p>
      </div>
    );
  }

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px", overflow: "hidden"
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["Date", "Description", "Category", "Amount", role === "admin" && "Actions"]
              .filter(Boolean)
              .map((h) => (
                <th key={h} style={{
                  padding: "16px 20px", textAlign: h === "Amount" ? "right" : h === "Actions" ? "center" : "left",
                  fontSize: "12px", fontWeight: "600", color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase", letterSpacing: "0.5px"
                }}>{h}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((t, index) => (
            <tr key={t.id} style={{
              borderBottom: index < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              transition: "background 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <td style={{ padding: "16px 20px", color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
                {t.date}
              </td>
              <td style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "10px",
                    background: t.type === "income" ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {t.type === "income"
                      ? <ArrowUpCircle size={16} color="#34d399" />
                      : <ArrowDownCircle size={16} color="#f87171" />}
                  </div>
                  <span style={{ color: "white", fontSize: "14px", fontWeight: "500" }}>
                    {t.description}
                  </span>
                </div>
              </td>
              <td style={{ padding: "16px 20px" }}>
                <span style={{
                  padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "500",
                  background: "rgba(129,140,248,0.15)", color: "#818cf8",
                  border: "1px solid rgba(129,140,248,0.2)"
                }}>
                  {t.category}
                </span>
              </td>
              <td style={{ padding: "16px 20px", textAlign: "right" }}>
                <span style={{
                  fontSize: "14px", fontWeight: "600",
                  color: t.type === "income" ? "#34d399" : "#f87171"
                }}>
                  {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
                </span>
              </td>
              {role === "admin" && (
                <td style={{ padding: "16px 20px", textAlign: "center" }}>
                  <button onClick={() => onEdit(t)} style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "rgba(255,255,255,0.3)", marginRight: "12px",
                    transition: "color 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#818cf8"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
                  >
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => deleteTransaction(t.id)} style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "rgba(255,255,255,0.3)", transition: "color 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#f87171"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}