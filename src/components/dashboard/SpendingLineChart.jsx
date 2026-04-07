import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useApp } from "../../context/AppContext";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "rgba(10,10,30,0.95)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px", padding: "12px 16px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 20px rgba(129,140,248,0.2)"
      }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", marginBottom: "8px" }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontSize: "13px", fontWeight: "600" }}>
            {p.name}: ₹{p.value.toLocaleString("en-IN")}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function SpendingLineChart() {
  const { transactions } = useApp();

  const monthlyData = transactions.reduce((acc, t) => {
    const month = t.date.slice(0, 7);
    if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
    if (t.type === "income") acc[month].income += t.amount;
    else acc[month].expense += t.amount;
    return acc;
  }, {});

  const data = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "20px", padding: "24px",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        position: "relative", overflow: "hidden"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.border = "1px solid rgba(129,140,248,0.5)";
        e.currentTarget.style.boxShadow = "0 0 30px rgba(99,102,241,0.3), 0 0 60px rgba(99,102,241,0.1), 0 20px 40px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* 3D effect top highlight */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.5), transparent)",
        pointerEvents: "none"
      }} />

      <h3 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "4px" }}>
        Monthly Overview
      </h3>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "24px" }}>
        Income vs Expenses trend
      </p>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f87171" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone" dataKey="income" name="Income"
            stroke="#818cf8" strokeWidth={3}
            fill="url(#incomeGrad)"
            dot={{ r: 5, fill: "#818cf8", strokeWidth: 0 }}
            activeDot={{ r: 7, fill: "#818cf8", strokeWidth: 2, stroke: "rgba(129,140,248,0.4)" }}
            filter="drop-shadow(0 0 6px rgba(129,140,248,0.8))"
          />
          <Area
            type="monotone" dataKey="expense" name="Expense"
            stroke="#f87171" strokeWidth={3}
            fill="url(#expenseGrad)"
            dot={{ r: 5, fill: "#f87171", strokeWidth: 0 }}
            activeDot={{ r: 7, fill: "#f87171", strokeWidth: 2, stroke: "rgba(248,113,113,0.4)" }}
            filter="drop-shadow(0 0 6px rgba(248,113,113,0.8))"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", gap: "20px", marginTop: "16px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#818cf8", display: "inline-block", boxShadow: "0 0 6px #818cf8" }} />
          Income
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f87171", display: "inline-block", boxShadow: "0 0 6px #f87171" }} />
          Expenses
        </span>
      </div>
    </div>
  );
}