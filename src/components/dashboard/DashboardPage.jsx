"use client";
import React from "react";
import Header from "../layout/Header";
import ExpenseOverview from "./ExpenseOverview";
import TransactionList from "../transactions/TransactionList";
import FinancialSummary from "../budget/FinancialSummary";

function DashboardPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <Header />
      <section className="p-4 sm:p-6 md:p-8 mx-auto max-w-none max-md:max-w-[991px] max-sm:max-w-screen-sm">
        <ExpenseOverview />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          <div className="md:col-span-8">
            <TransactionList />
          </div>
          <div className="md:col-span-4 mt-6 md:mt-0">
            <FinancialSummary />
          </div>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
