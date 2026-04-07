# FinanceIQ - Finance Dashboard UI

A clean and interactive finance dashboard built as part of a Frontend Developer Internship assignment.

## Live Demo
> Add your Vercel link here after deployment

## Features

- **Dashboard Overview** — Summary cards showing Total Balance, Income, and Expenses
- **Charts** — Monthly Income vs Expenses line chart and Spending by Category pie chart
- **Transactions** — Full transaction list with search, filter, and sort
- **Role Based UI** — Viewer and Admin roles with different permissions
  - Viewer: can only view data
  - Admin: can add, edit, and delete transactions + export CSV
- **Insights** — Top spending category, monthly trend, savings rate
- **Dark Mode** — Toggle between light and dark theme
- **Data Persistence** — Transactions saved to localStorage
- **Export CSV** — Admin can export transactions as CSV file

## Tech Stack

- React.js
- Tailwind CSS
- Recharts
- Lucide React
- React Router DOM
- Vite

## Setup Instructions

1. Clone the repository
   git clone <your-repo-link>

2. Go into the project folder
   cd finance-dashboard

3. Install dependencies
   npm install

4. Run the development server
   npm run dev

5. Open your browser and go to
   http://localhost:5173

## Project Structure

src/
├── components/
│   ├── layout/        # Navbar, RoleSwitcher
│   ├── dashboard/     # SummaryCard, Charts
│   ├── transactions/  # TransactionTable, TransactionModal
│   └── insights/      # InsightsPanel
├── context/           # AppContext (global state)
├── data/              # Mock transaction data
├── pages/             # Dashboard, Transactions, Insights
└── utils/             # Helper functions

## State Management

Used React Context API to manage:
- Transaction data
- Selected role (Viewer / Admin)
- Search query and filters
- Dark mode toggle

## Future Improvements

- Connect to a real backend API
- Add authentication
- Add more advanced analytics
- Add budget tracking feature