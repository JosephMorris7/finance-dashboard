import { useApp } from "../../context/AppContext";
import { Trophy, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

export default function InsightsPanel() {
  const { transactions } = useApp();

  const expenses = transactions.filter((t) => t.type === "expense");
  const income = transactions.filter((t) => t.type === "income");

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  const byMonth = expenses.reduce((acc, t) => {
    const month = t.date.slice(0, 7);
    acc[month] = (acc[month] || 0) + t.amount;
    return acc;
  }, {});
  const months = Object.entries(byMonth).sort();
  const lastTwo = months.slice(-2);
  const trend = lastTwo.length === 2
    ? ((lastTwo[1][1] - lastTwo[0][1]) / lastTwo[0][1] * 100).toFixed(1)
    : null;

  const totalIncome = income.reduce((s, t) => s + t.amount, 0);
  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
  const savingsRate = totalIncome > 0
    ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
    : 0;

  const cards = [
    {
      icon: Trophy,
      title: "Top Spending Category",
      value: topCategory?.[0] || "N/A",
      sub: `₹${topCategory?.[1].toLocaleString("en-IN")} total spent`,
      gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
      glow: "rgba(245,158,11,0.2)"
    },
    {
      icon: trend > 0 ? TrendingUp : TrendingDown,
      title: "Monthly Spending Trend",
      value: trend ? `${trend > 0 ? "+" : ""}${trend}%` : "N/A",
      sub: "compared to last month",
      gradient: trend > 0
        ? "linear-gradient(135deg, #ef4444, #f87171)"
        : "linear-gradient(135deg, #10b981, #34d399)",
      glow: trend > 0 ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)"
    },
    {
      icon: AlertTriangle,
      title: "Total Expenses",
      value: `₹${totalExpense.toLocaleString("en-IN")}`,
      sub: "across all months",
      gradient: "linear-gradient(135deg, #6366f1, #818cf8)",
      glow: "rgba(99,102,241,0.2)"
    },
    {
      icon: TrendingUp,
      title: "Savings Rate",
      value: `${savingsRate}%`,
      sub: "of total income saved",
      gradient: "linear-gradient(135deg, #10b981, #34d399)",
      glow: "rgba(16,185,129,0.2)"
    },
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px"
    }}>
      {cards.map(({ icon: Icon, title, value, sub, gradient, glow }) => (
        <div key={title} style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "20px", padding: "24px",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = `0 0 30px ${glow}`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
        >
          <div style={{
            width: "42px", height: "42px", borderRadius: "12px",
            background: gradient, display: "flex",
            alignItems: "center", justifyContent: "center",
            marginBottom: "16px", boxShadow: `0 0 20px ${glow}`
          }}>
            <Icon size={20} color="white" />
          </div>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {title}
          </p>
          <p style={{ fontSize: "22px", fontWeight: "700", color: "white", marginBottom: "4px" }}>
            {value}
          </p>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
            {sub}
          </p>
        </div>
      ))}
    </div>
  );
}