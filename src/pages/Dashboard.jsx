import { useApp } from "../context/AppContext";
import SummaryCard from "../components/dashboard/SummaryCard";
import SpendingLineChart from "../components/dashboard/SpendingLineChart";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

export default function Dashboard() {
  const { transactions } = useApp();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;
const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Good Night";
};
  return (
    <div style={{ padding: "40px 24px" }}>

      {/* Hero Header */}
      <div style={{ marginBottom: "40px", animation: "slideUp 0.6s ease forwards" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <div style={{
            padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
            background: "rgba(99,102,241,0.15)", color: "#818cf8",
            border: "1px solid rgba(99,102,241,0.25)", letterSpacing: "0.5px",
            fontFamily: "century gothic"
          }}>
            LIVE DASHBOARD
          </div>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#34d399", boxShadow: "0 0 10px #34d399",
            animation: "pulse-glow 2s ease-in-out infinite"
          }} />
        </div>

        <h1 style={{
          fontSize: "42px",
          fontFamily: "century gothic;",
          fontWeight: "800",
          letterSpacing: "-1px",
          marginBottom: "12px", lineHeight: 1.1,
          background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #e879f9 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
         Hey {getGreeting()} 👋
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.4)", fontSize: "16px",
          fontFamily: "century gothic;", fontWeight: "400"
        }}>
          Here's what's happening with your finances today.
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px", marginBottom: "28px"
      }}>
        <SummaryCard
  title="Total Balance"
  amount={totalBalance}
  icon={Wallet}
  gradient="linear-gradient(135deg, #6366f1, #818cf8)"
  glow="0 0 40px rgba(99,102,241,0.3)"
  delay="0s"
  image="/images/wallet.png"
/>
<SummaryCard
  title="Total Income"
  amount={totalIncome}
  icon={TrendingUp}
  gradient="linear-gradient(135deg, #10b981, #34d399)"
  glow="0 0 40px rgba(16,185,129,0.3)"
  delay="0.1s"
  image="/images/income.png"
/>
<SummaryCard
  title="Total Expenses"
  amount={totalExpense}
  icon={TrendingDown}
  gradient="linear-gradient(135deg, #ec4899, #f87171)"
  glow="0 0 40px rgba(236,72,153,0.3)"
  delay="0.2s"
  image="/images/expense.png"
/>
      </div>

      {/* Charts */}
      <div style={{
        display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",        gap: "20px"
      }}>
        <SpendingLineChart />
        <CategoryPieChart />
      </div>

      {/* Recent Activity Strip */}
      <div style={{
        marginTop: "24px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "20px", padding: "20px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "12px",
            background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <ArrowUpRight size={18} color="#818cf8" />
          </div>
          <div>
            <p style={{
              color: "white", fontSize: "14px", fontWeight: "600",
              fontFamily: "century gothic;"
            }}>
              {transactions.length} Total Transactions
            </p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
              Across all categories
            </p>
          </div>
        </div>
        <div style={{
          padding: "6px 16px", borderRadius: "20px",
          background: "rgba(99,102,241,0.1)",
          border: "1px solid rgba(99,102,241,0.2)",
          color: "#818cf8", fontSize: "12px", fontWeight: "600",
          fontFamily: "century gothic;"
        }}>
          {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
        </div>
      </div>
    </div>
  );
}