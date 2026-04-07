import { createContext, useContext, useState, useEffect } from "react";
import { mockTransactions } from "../data/mockTransactions";

const AppContext = createContext();

export const themes = {
  "blue-purple-pink": {
    name: "Cosmic",
    primary: "#6366f1",
    secondary: "#a855f7",
    accent: "#ec4899",
    gradient: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
    glow: "rgba(99,102,241,0.3)",
    orb1: "rgba(99,102,241,0.55)",
orb2: "rgba(168,85,247,0.50)",
orb3: "rgba(236,72,153,0.45)",
  },
  "cyan-blue-purple": {
    name: "Ocean",
    primary: "#22d3ee",
    secondary: "#60a5fa",
    accent: "#818cf8",
    gradient: "linear-gradient(135deg, #22d3ee, #60a5fa, #818cf8)",
    glow: "rgba(34,211,238,0.3)",
    orb1: "rgba(34,211,238,0.55)",
orb2: "rgba(96,165,250,0.50)",
orb3: "rgba(129,140,248,0.45)",
  },
  "green-teal-cyan": {
    name: "Matrix",
    primary: "#34d399",
    secondary: "#2dd4bf",
    accent: "#22d3ee",
    gradient: "linear-gradient(135deg, #34d399, #2dd4bf, #22d3ee)",
    glow: "rgba(52,211,153,0.3)",
    orb1: "rgba(52,211,153,0.55)",
orb2: "rgba(45,212,191,0.50)",
orb3: "rgba(34,211,238,0.45)",
  },
};

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : mockTransactions;
  });
  const [role, setRole] = useState("viewer");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [themeKey, setThemeKey] = useState("blue-purple-pink");

  const theme = themes[themeKey];

  const cycleTheme = () => {
    const keys = Object.keys(themes);
    const currentIndex = keys.indexOf(themeKey);
    const nextIndex = (currentIndex + 1) % keys.length;
    setThemeKey(keys[nextIndex]);
  };

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (txn) => {
    setTransactions((prev) => [{ ...txn, id: Date.now() }, ...prev]);
  };

  const editTransaction = (id, updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider value={{
      transactions, role, setRole,
      searchQuery, setSearchQuery,
      filterType, setFilterType,
      sortBy, setSortBy,
      theme, themeKey, cycleTheme,
      addTransaction, editTransaction, deleteTransaction,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);