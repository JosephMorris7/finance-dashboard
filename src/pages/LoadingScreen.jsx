import { useEffect, useState, useRef } from "react";
import { useApp } from "../context/AppContext";

export default function LoadingScreen({ onComplete }) {
  const { theme } = useApp();
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const canvasRef = useRef(null);
  const coinsCanvasRef = useRef(null);
  const circleCanvasRef = useRef(null);

  const loadingTexts = [
    "Connecting to your finances...",
    "Processing transactions...",
    "Analyzing spending patterns...",
    "Generating insights...",
    "Almost ready...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 0.6;
      });
    }, 20);

    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 800);

    // Particles
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.5 ? "129,140,248" : "168,85,247"
      }));
      let animFrame;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.x += p.dx; p.y += p.dy;
          if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
          ctx.fill();
        });
        animFrame = requestAnimationFrame(animate);
      };
      animate();
    }

    // Falling coins
    const coinsCanvas = coinsCanvasRef.current;
    if (coinsCanvas) {
      const ctx = coinsCanvas.getContext("2d");
      coinsCanvas.width = coinsCanvas.offsetWidth;
      coinsCanvas.height = coinsCanvas.offsetHeight;
      const w = coinsCanvas.width;
      const h = coinsCanvas.height;

      const symbols = ["₹", "$", "₹", "$", "₹", "$", "₹", "$", "₹", "$"];
      const coins = symbols.map((symbol, i) => ({
        x: 30 + (i % 5) * (w / 5) + Math.random() * 30,
        y: -80 - Math.random() * 500,
        vy: 1.2 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.4,
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 2.5,
        size: 30 + Math.random() * 22,
        opacity: 0.75 + Math.random() * 0.25,
        symbol,
      }));

      let coinsFrame;
      const drawCoins = () => {
        ctx.clearRect(0, 0, w, h);
        coins.forEach((coin) => {
          coin.y += coin.vy;
          coin.x += coin.vx;
          coin.rotation += coin.vr;
          if (coin.y > h + 80) {
            coin.y = -80;
            coin.x = 30 + Math.random() * (w - 60);
          }
          if (coin.x < 0 || coin.x > w) coin.vx *= -1;

          ctx.save();
          ctx.translate(coin.x, coin.y);
          ctx.rotate((coin.rotation * Math.PI) / 180);
          ctx.globalAlpha = coin.opacity;

          ctx.beginPath();
          ctx.arc(0, 0, coin.size / 2, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(
            -coin.size * 0.2, -coin.size * 0.2, 0, 0, 0, coin.size / 2
          );
          grad.addColorStop(0, coin.symbol === "₹" ? "rgba(160,170,255,0.95)" : "rgba(210,150,255,0.95)");
          grad.addColorStop(0.6, coin.symbol === "₹" ? "rgba(99,102,241,0.75)" : "rgba(168,85,247,0.75)");
          grad.addColorStop(1, coin.symbol === "₹" ? "rgba(60,52,137,0.5)" : "rgba(100,40,180,0.5)");
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.shadowColor = coin.symbol === "₹" ? "rgba(129,140,248,0.8)" : "rgba(168,85,247,0.8)";
          ctx.shadowBlur = 16;
          ctx.strokeStyle = coin.symbol === "₹" ? "rgba(129,140,248,0.9)" : "rgba(168,85,247,0.9)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.shadowBlur = 0;

          ctx.fillStyle = "rgba(255,255,255,0.98)";
          ctx.font = `bold ${coin.size * 0.48}px Syne, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(coin.symbol, 0, 1);
          ctx.restore();
        });
        coinsFrame = requestAnimationFrame(drawCoins);
      };
      drawCoins();
    }

    // Circular orbit animation with ₹ and $ symbols
    const circleCanvas = circleCanvasRef.current;
    if (circleCanvas) {
      const ctx = circleCanvas.getContext("2d");
      const size = circleCanvas.offsetWidth;
      circleCanvas.width = size;
      circleCanvas.height = size;
      const cx = size / 2;
      const cy = size / 2;
      const outerRadius = size * 0.42;
      const innerRadius = size * 0.26;

      // 8 orbiting symbols alternating ₹ and $
      const orbitSymbols = ["₹", "$", "₹", "$", "₹", "$", "₹", "$"];
      let angle = 0;

      let circleFrame;
      const drawCircle = () => {
        ctx.clearRect(0, 0, size, size);

        // Outer orbit ring
        ctx.beginPath();
        ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(99,102,241,0.12)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Inner orbit ring
        ctx.beginPath();
        ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(168,85,247,0.12)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Center glow
        const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerRadius * 0.7);
        centerGrad.addColorStop(0, "rgba(99,102,241,0.15)");
        centerGrad.addColorStop(1, "rgba(99,102,241,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, innerRadius * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = centerGrad;
        ctx.fill();

        // Outer orbiting symbols (₹ and $)
        orbitSymbols.forEach((symbol, i) => {
          const symAngle = angle + (i / orbitSymbols.length) * Math.PI * 2;
          const x = cx + outerRadius * Math.cos(symAngle);
          const y = cy + outerRadius * Math.sin(symAngle);
          const scale = (Math.sin(symAngle * 1.5) + 1) / 2;
          const coinSize = 20 + scale * 10;
          const opacity = 0.5 + scale * 0.5;
          const isRupee = symbol === "₹";

          ctx.save();
          ctx.globalAlpha = opacity;

          // Coin background
          ctx.beginPath();
          ctx.arc(x, y, coinSize / 2, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(
            x - coinSize * 0.15, y - coinSize * 0.15, 0,
            x, y, coinSize / 2
          );
          grad.addColorStop(0, isRupee ? "rgba(160,170,255,0.95)" : "rgba(210,150,255,0.95)");
          grad.addColorStop(0.6, isRupee ? "rgba(99,102,241,0.8)" : "rgba(168,85,247,0.8)");
          grad.addColorStop(1, isRupee ? "rgba(60,52,137,0.6)" : "rgba(100,40,180,0.6)");
          ctx.fillStyle = grad;
          ctx.shadowColor = isRupee ? "rgba(129,140,248,0.9)" : "rgba(168,85,247,0.9)";
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Coin border
          ctx.strokeStyle = isRupee ? "rgba(129,140,248,0.9)" : "rgba(168,85,247,0.9)";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Symbol text
          ctx.fillStyle = "rgba(255,255,255,1)";
          ctx.font = `bold ${coinSize * 0.52}px Syne, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(symbol, x, y + 1);

          ctx.restore();
        });

        // Inner orbiting symbols (opposite direction, smaller)
        orbitSymbols.forEach((symbol, i) => {
          const symAngle = -angle * 1.5 + (i / orbitSymbols.length) * Math.PI * 2;
          const x = cx + innerRadius * Math.cos(symAngle);
          const y = cy + innerRadius * Math.sin(symAngle);
          const scale = (Math.sin(symAngle * 2) + 1) / 2;
          const coinSize = 12 + scale * 6;
          const opacity = 0.3 + scale * 0.4;
          const isRupee = symbol === "₹";

          ctx.save();
          ctx.globalAlpha = opacity;

          ctx.beginPath();
          ctx.arc(x, y, coinSize / 2, 0, Math.PI * 2);
          ctx.fillStyle = isRupee ? "rgba(129,140,248,0.7)" : "rgba(168,85,247,0.7)";
          ctx.shadowColor = isRupee ? "rgba(129,140,248,0.6)" : "rgba(168,85,247,0.6)";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.font = `bold ${coinSize * 0.55}px Syne, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(symbol, x, y + 1);

          ctx.restore();
        });

        angle += 0.025;
        circleFrame = requestAnimationFrame(drawCircle);
      };
      drawCircle();
    }

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#050510",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden"
    }}>

      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      <div style={{
        position: "fixed", top: "-20%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%",
        background: `radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)`,
        filter: "blur(60px)", zIndex: 0, animation: "blob1 12s ease-in-out infinite"
      }} />
      <div style={{
        position: "fixed", bottom: "-20%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%",
        background: `radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)`,
        filter: "blur(60px)", zIndex: 0, animation: "blob2 15s ease-in-out infinite"
      }} />

      <div style={{
        position: "relative", zIndex: 1, width: "100%", maxWidth: "1000px",
        padding: "0 40px", display: "flex", alignItems: "center", gap: "48px"
      }}>

        {/* LEFT - Falling coins */}
        <div style={{
          flex: "0 0 280px", height: "520px", position: "relative",
          animation: "slideUp 0.5s ease forwards", opacity: 0,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "24px", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", bottom: 0, left: "50%",
            transform: "translateX(-50%)", width: "200px", height: "80px",
            background: `radial-gradient(ellipse, ${theme.primary}25 0%, transparent 70%)`,
            pointerEvents: "none", zIndex: 2
          }} />
          <canvas ref={coinsCanvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
          <div style={{
            position: "absolute", bottom: "16px", left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(99,102,241,0.15)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "20px", padding: "6px 18px", whiteSpace: "nowrap", zIndex: 3
          }}>
            <span style={{ color: "#818cf8", fontSize: "11px", fontFamily: "'Syne', sans-serif", fontWeight: "600" }}>
              Processing Transactions
            </span>
          </div>
        </div>

        {/* RIGHT - Circle orbit + progress */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          animation: "slideUp 0.6s ease 0.15s forwards", opacity: 0
        }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "36px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "14px",
              background: theme.gradient,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", fontWeight: "800", color: "white",
              boxShadow: `0 0 30px ${theme.glow}`,
              animation: "pulse-glow 2s ease-in-out infinite"
            }}>F</div>
            <h1 style={{ fontSize: "22px", fontWeight: "800", color: "white", fontFamily: "'Syne', sans-serif" }}>
              FinanceIQ
            </h1>
          </div>

          {/* Circle orbit */}
          <div style={{ position: "relative", marginBottom: "36px" }}>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "260px", height: "260px", borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.primary}18 0%, transparent 70%)`,
              filter: "blur(20px)", pointerEvents: "none",
              animation: "pulse-glow 3s ease-in-out infinite"
            }} />
            <canvas ref={circleCanvasRef} style={{
              width: "240px", height: "240px", display: "block", position: "relative", zIndex: 1
            }} />
          </div>

          {/* Loading dots + text */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "4px" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: theme.primary,
                  animation: `pulse-glow 1s ease-in-out ${i * 0.2}s infinite`
                }} />
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", fontFamily: "'Syne', sans-serif" }}>
              {loadingTexts[currentText]}
            </p>
          </div>

          {/* Progress bar */}
          <div style={{ width: "100%", maxWidth: "380px" }}>
            <div style={{
              width: "100%", height: "6px", borderRadius: "10px",
              background: "rgba(255,255,255,0.06)", overflow: "hidden", marginBottom: "10px"
            }}>
              <div style={{
                height: "100%", borderRadius: "10px",
                background: theme.gradient, width: `${progress}%`,
                transition: "width 0.1s ease",
                boxShadow: `0 0 15px ${theme.primary}`
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", fontFamily: "'Syne', sans-serif" }}>
                Loading dashboard
              </span>
              <span style={{ color: theme.primary, fontSize: "12px", fontFamily: "'Syne', sans-serif", fontWeight: "700" }}>
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}