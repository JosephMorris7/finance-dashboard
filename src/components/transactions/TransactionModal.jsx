import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { X } from "lucide-react";

export default function TransactionModal({ onClose, editData }) {
  const { addTransaction, editTransaction } = useApp();

  const [form, setForm] = useState({
    date: "",
    description: "",
    amount: "",
    category: "Food",
    type: "expense",
  });

  useEffect(() => {
    if (editData) setForm({ ...editData, amount: String(editData.amount) });
  }, [editData]);

  const categories = ["Food", "Housing", "Utilities", "Health", "Entertainment", "Travel", "Income", "Other"];

  const handleSubmit = () => {
    if (!form.date || !form.description || !form.amount) return;
    const txn = { ...form, amount: Number(form.amount) };
    if (editData) editTransaction(editData.id, txn);
    else addTransaction(txn);
    onClose();
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px",
    borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)", color: "white",
    fontSize: "14px", outline: "none", transition: "border 0.2s",
    boxSizing: "border-box"
  };

  const labelStyle = {
    fontSize: "12px", fontWeight: "500",
    color: "rgba(255,255,255,0.4)", marginBottom: "6px",
    display: "block", textTransform: "uppercase", letterSpacing: "0.5px"
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(15,15,35,0.95)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px", padding: "32px",
        width: "100%", maxWidth: "440px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 60px rgba(99,102,241,0.2)"
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <h2 style={{ color: "white", fontSize: "18px", fontWeight: "600" }}>
            {editData ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.06)", border: "none",
            width: "32px", height: "32px", borderRadius: "10px",
            cursor: "pointer", color: "rgba(255,255,255,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Date</label>
            <input type="date" value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              style={{ ...inputStyle, colorScheme: "dark" }} />
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <input type="text" placeholder="e.g. Grocery shopping"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Amount (₹)</label>
            <input type="number" placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ ...inputStyle, cursor: "pointer" }}>
              {categories.map((c) => (
                <option key={c} value={c} style={{ background: "#0f0f23" }}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Type</label>
            <div style={{ display: "flex", gap: "10px" }}>
              {["expense", "income"].map((type) => (
                <button key={type} onClick={() => setForm({ ...form, type })}
                  style={{
                    flex: 1, padding: "10px", borderRadius: "12px",
                    border: form.type === type
                      ? type === "income" ? "1px solid rgba(52,211,153,0.4)" : "1px solid rgba(248,113,113,0.4)"
                      : "1px solid rgba(255,255,255,0.08)",
                    background: form.type === type
                      ? type === "income" ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)"
                      : "rgba(255,255,255,0.04)",
                    color: form.type === type
                      ? type === "income" ? "#34d399" : "#f87171"
                      : "rgba(255,255,255,0.4)",
                    fontSize: "13px", fontWeight: "500",
                    cursor: "pointer", textTransform: "capitalize", transition: "all 0.2s"
                  }}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "12px", borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "transparent", color: "rgba(255,255,255,0.5)",
            fontSize: "14px", fontWeight: "500", cursor: "pointer"
          }}>
            Cancel
          </button>
          <button onClick={handleSubmit} style={{
            flex: 1, padding: "12px", borderRadius: "12px", border: "none",
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            color: "white", fontSize: "14px", fontWeight: "600",
            cursor: "pointer", boxShadow: "0 0 20px rgba(99,102,241,0.3)"
          }}>
            {editData ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}