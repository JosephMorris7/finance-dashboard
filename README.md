# FinanceIQ - Finance Dashboard UI

A stunning, interactive finance dashboard built as a Frontend Developer Internship assignment for Zorvyn. Built with React.js, Tailwind CSS, and Recharts.

## Live Demo
> Add your Vercel link here after deployment

## Screenshots
> Add screenshots here after deployment

---

## Features

### Core Features
- **Dashboard Overview** — Summary cards showing Total Balance, Income, and Expenses with 3D floating images
- **Interactive Charts** — Monthly Income vs Expenses line chart and Spending by Category pie chart
- **Flip Card** — Click the pie chart card to flip and reveal a 3D bar chart
- **Transactions Page** — Full transaction list with search, filter by type, and sort by date or amount
- **Role Based UI** — Viewer and Admin roles with different permissions
  - Viewer: can only view data
  - Admin: can add, edit, delete transactions and export CSV
- **Insights Page** — Top spending category, monthly trend, savings rate, and financial health summary

### Design & UX
- **Stunning Landing Page** — Hero section with 3D coin animation and particle effects
- **Loading Screen** — Beautiful loading animation with falling coins and circular orbit animation
- **Dark Glassmorphism Design** — Premium dark theme with glass effect cards
- **Animated Background** — Fluid blob animations with moving gradient mesh
- **Glowing Cursor** — Custom cursor with glow effect that follows your mouse
- **Theme Switcher** — 3 beautiful color themes (Cosmic, Ocean, Matrix)
- **Hover Animations** — Glowing border effects on all cards
- **Smooth Transitions** — Page animations and slide-up effects

### Optional Enhancements
- **Dark Mode** — Full dark theme throughout
- **Data Persistence** — Transactions saved to localStorage
- **Export CSV** — Admin can export all transactions as CSV file
- **3D Images** — Floating 3D images on summary cards

---

## Tech Stack

| Technology | Usage |
|------------|-------|
| React.js | Frontend framework |
| Tailwind CSS | Styling |
| Recharts | Charts and data visualization |
| Lucide React | Icons |
| React Router DOM | Navigation |
| Vite | Build tool |

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or above)
- npm

### Installation

1. Clone the repository:
git clone https://github.com/YOURUSERNAME/finance-dashboard.git

2. Navigate to the project folder:
cd finance-dashboard

3. Install dependencies:
npm install

4. Run the development server:
npm run dev

5. Open your browser and go to:
http://localhost:5173

---

## Project Structure
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── RoleSwitcher.jsx
│   ├── dashboard/
│   │   ├── SummaryCard.jsx
│   │   ├── SpendingLineChart.jsx
│   │   └── CategoryPieChart.jsx
│   ├── transactions/
│   │   ├── TransactionTable.jsx
│   │   └── TransactionModal.jsx
│   └── insights/
│       └── InsightsPanel.jsx
├── context/
│   └── AppContext.jsx
├── data/
│   └── mockTransactions.js
├── pages/
│   ├── Landing.jsx
│   ├── LoadingScreen.jsx
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   └── Insights.jsx
├── App.jsx
└── main.jsx

---

## State Management

Used **React Context API** to manage global state:
- Transaction data (with localStorage persistence)
- Selected role (Viewer / Admin)
- Search query and filters
- Theme selection (Cosmic / Ocean / Matrix)
- Sort preferences

---

## Role Based UI

| Feature | Viewer | Admin |
|---------|--------|-------|
| View Dashboard | ✅ | ✅ |
| View Transactions | ✅ | ✅ |
| View Insights | ✅ | ✅ |
| Add Transaction | ❌ | ✅ |
| Edit Transaction | ❌ | ✅ |
| Delete Transaction | ❌ | ✅ |
| Export CSV | ❌ | ✅ |

---

## Mock Data

The project uses 20 mock transactions across 3 months (January - March 2024) covering categories:
- Income, Housing, Food, Utilities, Health, Entertainment, Travel

---

## Future Improvements

- Connect to a real backend API
- Add user authentication
- Add budget tracking and alerts
- Add more chart types
- Add date range filtering
- Add multi-currency support
- Add bill reminders
- Mobile app version

---

## Author

Built with ❤️ by Joseph Morris 
