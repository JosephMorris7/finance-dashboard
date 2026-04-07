import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function Landing() {
  const navigate = useNavigate();
  const { theme } = useApp();
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let animFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129,140,248,${p.opacity})`;
        ctx.fill();
      });
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={() => navigate("/dashboard")} />;
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "space-between", position: "relative", overflow: "hidden",
    }}>

      {/* Particles canvas */}
      <canvas ref={canvasRef} style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none"
      }} />

      {/* Navbar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 20px", position: "relative", zIndex: 1,
        animation: "slideUp 0.5s ease forwards"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "12px",
            background: theme.gradient,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: "800", color: "white",
            boxShadow: `0 0 20px ${theme.glow}`
          }}>F</div>
          <span style={{
            color: "white", fontWeight: "800", fontSize: "22px",
            letterSpacing: "-0.5px",
            textShadow: `0 0 20px ${theme.primary}`
          }}>FinanceIQ</span>
        </div>

        <button
          onClick={() => setLoading(true)}
          style={{
            padding: "10px 24px", borderRadius: "12px", border: "none",
            background: theme.gradient, color: "white",
            fontSize: "14px", fontWeight: "700", cursor: "none",
            boxShadow: `0 0 20px ${theme.glow}`,
            transition: "all 0.3s ease"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 0 30px ${theme.glow}`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 0 20px ${theme.glow}`;
          }}
        >
          Open App
        </button>
      </div>

      {/* Main layout */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
flexWrap: "wrap", gap: "40px", position: "relative", zIndex: 1,
maxWidth: "1200px", margin: "0 auto", width: "100%",
padding: "0px 24px 40px", flex: 1    }}>

        {/* LEFT */}
        <div style={ { flex: 1, textAlign: "left", minWidth: "280px"  }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "20px", marginBottom: "32px",
            background: `rgba(99,102,241,0.12)`,
            border: `1px solid rgba(99,102,241,0.25)`,
            animation: "slideUp 0.5s ease 0.1s forwards", opacity: 0
          }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#34d399", boxShadow: "0 0 8px #34d399",
              animation: "pulse-glow 2s ease-in-out infinite"
            }} />
            <span style={{ color: "#818cf8", fontSize: "13px", fontWeight: "600", letterSpacing: "0.5px" }}>
              Smart Finance Tracking
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: "clamp(70px, 5vw, 68px)", fontWeight: "800",
            letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "24px",
            animation: "slideUp 0.6s ease 0.2s forwards", opacity: 0,
            fontFamily: "century gothic"
          }}>
            <span style={{ color: "white", display: "block" }}>Take Control</span>
            <span style={{ color: "white", display: "block" }}>over Your</span>
            <span style={{
              background: theme.gradient,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", display: "block"
            }}>
              Finances
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "17px", color: "rgba(255,255,255,0.45)", fontWeight: "400",
            maxWidth: "420px", lineHeight: 1.8, marginBottom: "40px",
            animation: "slideUp 0.6s ease 0.3s forwards", opacity: 0,
            fontFamily: "century gothic"
          }}>
            Track spending, visualize trends, and gain powerful insights
            into your financial health — all in one beautiful dashboard.
          </p>

          {/* CTA Button */}
          <div style={{
            animation: "slideUp 0.6s ease 0.4s forwards", opacity: 0,
            marginBottom: "40px"
          }}>
            <button
              onClick={() => setLoading(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "16px 40px", borderRadius: "16px", border: "none",
                background: theme.gradient, color: "white",
                fontSize: "16px", fontWeight: "700", cursor: "none",
                boxShadow: `0 0 30px ${theme.glow}, 0 0 60px ${theme.glow}`,
                transition: "all 0.3s ease", letterSpacing: "0.3px",
                fontFamily: "century gothic;"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                e.currentTarget.style.boxShadow = `0 0 50px ${theme.glow}, 0 0 100px ${theme.glow}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = `0 0 30px ${theme.glow}, 0 0 60px ${theme.glow}`;
              }}
            >
              Get Started
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Feature pills */}
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            flexWrap: "wrap", marginBottom: "40px",
            animation: "slideUp 0.6s ease 0.5s forwards", opacity: 0
          }}>
            {[
              { icon: TrendingUp, label: "Real-time Analytics" },
              { icon: Shield, label: "Role Based Access" },
              { icon: Zap, label: "Instant Insights" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "9px 16px", borderRadius: "12px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: "500",
                transition: "all 0.3s ease", cursor: "none",
                fontFamily: "century gothic;"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = `${theme.primary}40`;
                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              >
                <Icon size={14} color={theme.primary} />
                {label}
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div style={{
            display: "flex", alignItems: "center", gap: "40px",
            flexWrap: "wrap",
            animation: "slideUp 0.6s ease 0.6s forwards", opacity: 0
          }}>
            {[
              { value: "20+", label: "Transactions" },
              { value: "3", label: "Smart Insights" },
              { value: "100%", label: "Frontend" },
            ].map(({ value, label }, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {i > 0 && <div style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.1)" }} />}
                <div>
                  <p style={{
                    fontSize: "26px", fontWeight: "800",
                    letterSpacing: "-1px", marginBottom: "2px",
                    background: theme.gradient,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    fontFamily: "century gothic;"
                  }}>{value}</p>
                  <p style={{
                    fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: "500",
                    fontFamily: "century gothic;"
                  }}>
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - 3D Coins */}
        <div style={{
flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minWidth: "280px",          animation: "slideUp 0.8s ease 0.3s forwards", opacity: 0,
          position: "relative"
        }}>
          <div style={{
            position: "absolute", width: "500px", height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.primary}25 0%, transparent 70%)`,
            filter: "blur(50px)", pointerEvents: "none",
            animation: "pulse-glow 4s ease-in-out infinite"
          }} />
          <img
            src="/images/coins.png"
            alt="3D Finance"
            style={{
              width: "700%", maxWidth: "780px",
              position: "relative", zIndex: 1,
              filter: `drop-shadow(0 0 50px ${theme.primary}60) drop-shadow(0 40px 80px rgba(0,0,0,0.6))`,
            }}
          />
        </div>
      </div>
    </div>
  );
}