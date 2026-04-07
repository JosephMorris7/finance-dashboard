import { useState } from "react";
import { useApp } from "../context/AppContext";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionModal from "../components/transactions/TransactionModal";
import { Plus, Search, Download, SlidersHorizontal } from "lucide-react";

export default function Transactions() {
  const { role, searchQuery, setSearchQuery, filterType, setFilterType, sortBy, setSortBy, transactions } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (txn) => {
    setEditData(txn);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditData(null);
  };

  const exportCSV = () => {
    const headers = ["Date,Description,Category,Type,Amount"];
    const rows = transactions.map(
      (t) => `${t.date},${t.description},${t.category},${t.type},${t.amount}`
    );
    const csv = [...headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "32px 24px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "700", color: "white", letterSpacing: "-0.5px", marginBottom: "8px" }}>
            Transactions
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
            Manage and explore your financial activity
          </p>
        </div>
        {role === "admin" && (
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={exportCSV} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 20px", borderRadius: "12px", border: "1px solid rgba(16,185,129,0.3)",
              background: "rgba(16,185,129,0.1)", color: "#34d399",
              fontSize: "14px", fontWeight: "500", cursor: "pointer", transition: "all 0.2s"
            }}>
              <Download size={16} />
              Export CSV
            </button>
            <button onClick={() => setShowModal(true)} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 20px", borderRadius: "12px", border: "none",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              color: "white", fontSize: "14px", fontWeight: "500",
              cursor: "pointer", transition: "all 0.2s",
              boxShadow: "0 0 20px rgba(99,102,241,0.3)"
            }}>
              <Plus size={16} />
              Add Transaction
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <Search size={15} style={{
            position: "absolute", left: "14px", top: "50%",
            transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)"
          }} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%", paddingLeft: "40px", paddingRight: "16px",
              paddingTop: "12px", paddingBottom: "12px",
              borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)", color: "white",
              fontSize: "14px", outline: "none",
              backdropFilter: "blur(20px)"
            }}
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            padding: "12px 16px", borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)", color: "white",
            fontSize: "14px", outline: "none", cursor: "pointer"
          }}
        >
          <option value="all" style={{ background: "#1a1a2e" }}>All Types</option>
          <option value="income" style={{ background: "#1a1a2e" }}>Income</option>
          <option value="expense" style={{ background: "#1a1a2e" }}>Expense</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "12px 16px", borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)", color: "white",
            fontSize: "14px", outline: "none", cursor: "pointer"
          }}
        >
          <option value="date" style={{ background: "#1a1a2e" }}>Sort by Date</option>
          <option value="amount" style={{ background: "#1a1a2e" }}>Sort by Amount</option>
        </select>
      </div>

      {/* Table */}
      <TransactionTable onEdit={handleEdit} />

      {showModal && (
        <TransactionModal onClose={handleClose} editData={editData} />
      )}
    </div>
  );
}