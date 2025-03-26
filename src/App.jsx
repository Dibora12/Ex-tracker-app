import React from "react";
import DashboardOverview from "./components/Dashboardoverview";
import ExpenseForm from "./components/ExpenseFOrm";
import "./index.css";
function App() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <DashboardOverview />
      <ExpenseForm />
    </div>
  );
}

export default App;
