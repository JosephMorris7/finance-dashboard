import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useApp } from "../../context/AppContext";
import { useState } from "react";
import { RefreshCw } from "lucide-react";

const COLORS = ["#818cf8", "#f87171", "#34d399", "#fbbf24", "#60a5fa", "#a78bfa", "#f472b6"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "rgba(10,10,30,0.95)",
        border: `1px solid ${payload[0].fill}40`,
        borderRadius: "12px",
        padding: "12px 16px",
        backdropFilter: "blur(20px)",
        boxShadow: `0 0 20px ${payload[0].fill}30`
      }}>
        <p style={{ color: "white", fontSize: "13px", fontWeight: "700", marginBottom: "4px" }}>
          {payload[0].name}
        </p>
        <p style={{ color: payload[0].fill, fontSize: "13px", fontWeight: "600" }}>
          ₹{payload[0].value.toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
};

const BarTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "rgba(10,10,30,0.95)",
        border: `1px solid rgba(129,140,248,0.4)`,
        borderRadius: "12px",
        padding: "12px 16px",
        backdropFilter: "blur(20px)",
      }}>
        <p style={{ color: "white", fontSize: "13px", fontWeight: "700", marginBottom: "4px" }}>
          {payload[0].payload.name}
        </p>
        <p style={{ color: "#818cf8", fontSize: "13px", fontWeight: "600" }}>
          ₹{payload[0].value.toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
};

export default function CategoryPieChart() {

  const { transactions } = useApp();
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  const categoryData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const total = Object.values(categoryData).reduce((s, v) => s + v, 0);

  const data = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
    total
  }));

  return (

    <div
      style={{
        perspective: "1000px",
        height: "380px",
        cursor: "pointer"
      }}
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >

        {/* FRONT CARD */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: hovered
              ? "1px solid rgba(129,140,248,0.4)"
              : "1px solid rgba(255,255,255,0.06)",
            borderRadius: "20px",
            padding: "24px",
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            transform: hovered ? "translateY(-6px)" : "translateY(0)",
            boxShadow: hovered
              ? "0 0 40px rgba(129,140,248,0.35), 0 0 80px rgba(129,140,248,0.15)"
              : "0 0 0 rgba(0,0,0,0)"
          }}
        >

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <h3 style={{ color: "white", fontSize: "15px", fontWeight: "600" }}>
              Spending Breakdown
            </h3>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "20px",
              background: "rgba(129,140,248,0.1)",
              border: "1px solid rgba(129,140,248,0.2)"
            }}>
              <RefreshCw size={11} color="#818cf8" />
              <span style={{ color: "#818cf8", fontSize: "10px", fontWeight: "600" }}>
                Flip for Bar
              </span>
            </div>
          </div>

          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "16px" }}>
            Click to see bar chart
          </p>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    opacity={0.9}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
            {data.map((entry, index) => (
              <span
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.5)"
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: COLORS[index % COLORS.length],
                    display: "inline-block",
                    boxShadow: `0 0 5px ${COLORS[index % COLORS.length]}`
                  }}
                />
                {entry.name}
              </span>
            ))}
          </div>

        </div>

        {/* BACK CARD */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: hovered
              ? "1px solid rgba(236,72,153,0.4)"
              : "1px solid rgba(129,140,248,0.2)",
            borderRadius: "20px",
            padding: "24px",
            transformStyle: "preserve-3d",
            boxShadow: hovered
              ? "0 0 40px rgba(236,72,153,0.35), 0 0 80px rgba(236,72,153,0.15)"
              : "0 0 30px rgba(129,140,248,0.1)"
          }}
        >

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <h3 style={{ color: "white", fontSize: "15px", fontWeight: "600" }}>
              Category Bar Chart
            </h3>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "20px",
              background: "rgba(236,72,153,0.1)",
              border: "1px solid rgba(236,72,153,0.2)"
            }}>
              <RefreshCw size={11} color="#ec4899" />
              <span style={{ color: "#ec4899", fontSize: "10px", fontWeight: "600" }}>
                Flip for Pie
              </span>
            </div>
          </div>

          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "16px" }}>
            Click to see pie chart
          </p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize: 9, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false}/>
              <Tooltip content={<BarTooltip />} />
              <Bar dataKey="value" radius={[6,6,0,0]} maxBarSize={40}>
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    style={{ filter: `drop-shadow(0 0 6px ${COLORS[index % COLORS.length]}80)` }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}