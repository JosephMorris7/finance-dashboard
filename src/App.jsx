import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Landing from "./pages/Landing";
import { useEffect, useRef } from "react";

function CursorGlow() {
  const cursorRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const { theme } = useApp();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = e.clientX + "px";
        cursorGlowRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Cursor dot */}
      <div ref={cursorRef} style={{
        position: "fixed", width: "12px", height: "12px", borderRadius: "50%",
        background: "white", pointerEvents: "none", zIndex: 99999,
        transform: "translate(-50%, -50%)",
        boxShadow: `0 0 15px ${theme.primary}, 0 0 30px ${theme.primary}`,
        transition: "transform 0.1s ease",
        mixBlendMode: "screen"
      }} />

      {/* Cursor outer ring */}
      <div ref={cursorGlowRef} style={{
        position: "fixed", width: "500px", height: "500px", borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.primary}35 0%, ${theme.secondary}15 40%, transparent 70%)`,
        pointerEvents: "none", zIndex: 99998,
        transform: "translate(-50%, -50%)",
        transition: "left 0.12s ease, top 0.12s ease, background 1s ease",
      }} />
    </>
  );
}

function AppContent() {
  const { theme } = useApp();

  return (
    <div style={{
      minHeight: "100vh", background: "#050510",
      position: "relative", overflow: "hidden",
      cursor: "none"
    }}>

      {/* Global cursor */}
      <CursorGlow />

      {/* Blob 1 */}
      <div style={{
        position: "fixed", top: "-30%", left: "-20%",
        width: "900px", height: "900px", borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.primary}55 0%, ${theme.primary}22 40%, transparent 70%)`,
        pointerEvents: "none", zIndex: 0,
        animation: "blob1 12s ease-in-out infinite",
        filter: "blur(8px)", transition: "background 1s ease"
      }} />

      {/* Blob 2 */}
      <div style={{
        position: "fixed", top: "10%", right: "-25%",
        width: "800px", height: "800px", borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.secondary}55 0%, ${theme.secondary}22 40%, transparent 70%)`,
        pointerEvents: "none", zIndex: 0,
        animation: "blob2 15s ease-in-out infinite",
        filter: "blur(8px)", transition: "background 1s ease"
      }} />

      {/* Blob 3 */}
      <div style={{
        position: "fixed", bottom: "-25%", left: "20%",
        width: "700px", height: "700px", borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.accent}55 0%, ${theme.accent}22 40%, transparent 70%)`,
        pointerEvents: "none", zIndex: 0,
        animation: "blob3 18s ease-in-out infinite",
        filter: "blur(8px)", transition: "background 1s ease"
      }} />

      {/* Center glow */}
      <div style={{
        position: "fixed", top: "30%", left: "35%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.secondary}33 0%, transparent 70%)`,
        pointerEvents: "none", zIndex: 0,
        animation: "blob1 20s ease-in-out infinite reverse",
        filter: "blur(5px)", transition: "background 1s ease"
      }} />

      {/* Dark overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "rgba(5,5,16,0.45)"
      }} />

      {/* Grid overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(${theme.primary}09 1px, transparent 1px),
          linear-gradient(90deg, ${theme.primary}09 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        transition: "all 1s ease"
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<><Navbar /><main style={{ maxWidth: "1280px", margin: "0 auto" }}><Dashboard /></main></>} />
          <Route path="/transactions" element={<><Navbar /><main style={{ maxWidth: "1280px", margin: "0 auto" }}><Transactions /></main></>} />
          <Route path="/insights" element={<><Navbar /><main style={{ maxWidth: "1280px", margin: "0 auto" }}><Insights /></main></>} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}