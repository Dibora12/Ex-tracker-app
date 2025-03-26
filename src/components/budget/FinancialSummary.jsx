"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTotalBalance,
  selectPreviousMonthPercentage,
  addExpense,
} from "../../store/slices/expensesSlice";
import { addTransaction } from "../../store/slices/transactionsSlice";
import { updateBudget } from "../../store/slices/budgetSlice";
import CategoryBreakdown from "./CategoryBreakdown";
import BudgetStatus from "./BudgetStatus";

function FinancialSummary() {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: "Shopping",
    description: "",
    amount: "",
  });

  const totalBalance = useSelector(selectTotalBalance);
  const previousMonthPercentage = useSelector(selectPreviousMonthPercentage);
  const dispatch = useDispatch();

  const handleAddExpense = () => {
    if (!showExpenseForm) {
      setShowExpenseForm(true);
      return;
    }

    if (!newExpense.description || !newExpense.amount) return;

    const amount = parseFloat(newExpense.amount);
    if (isNaN(amount) || amount <= 0) return;

    // Add transaction
    dispatch(
      addTransaction({
        category: newExpense.category,
        description: newExpense.description,
        amount: -amount, // Negative for expenses
        date: "Today",
        icon: getCategoryIcon(newExpense.category),
      }),
    );

    // Update budget for this category
    dispatch(
      updateBudget({
        id: getCategoryId(newExpense.category),
        current: getCategoryCurrentAmount(newExpense.category) + amount,
        total: getCategoryTotalAmount(newExpense.category),
      }),
    );

    // Add expense to update total balance
    dispatch(addExpense({ amount }));

    // Reset form
    setNewExpense({
      category: "Shopping",
      description: "",
      amount: "",
    });
    setShowExpenseForm(false);
  };

  // Helper functions to get category details
  // In a real app, these would use selectors to get data from the store
  const getCategoryIcon = (category) => {
    const icons = {
      Shopping: "ti-shopping-cart",
      "Food & Drinks": "ti-restaurant",
      Transportation: "ti-car",
      Entertainment: "ti-device-tv",
    };
    return icons[category] || "ti-receipt";
  };

  const getCategoryId = (category) => {
    const ids = {
      Shopping: 1,
      "Food & Drinks": 2,
      Transportation: 3,
      Entertainment: 4,
    };
    return ids[category] || 1;
  };

  const getCategoryCurrentAmount = (category) => {
    const amounts = {
      Shopping: 450,
      "Food & Drinks": 280,
      Transportation: 120,
      Entertainment: 75,
    };
    return amounts[category] || 0;
  };

  const getCategoryTotalAmount = (category) => {
    const totals = {
      Shopping: 500,
      "Food & Drinks": 400,
      Transportation: 200,
      Entertainment: 150,
    };
    return totals[category] || 0;
  };

  return (
    <section className="p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      <h2 className="mb-1 sm:mb-2 text-xl sm:text-2xl font-medium leading-8">
        ${totalBalance.toFixed(2)}
      </h2>
      <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-500">
        vs last month {previousMonthPercentage > 0 ? "+" : ""}
        {previousMonthPercentage.toFixed(1)}%
      </p>

      {showExpenseForm ? (
        <div className="mb-6 sm:mb-8 space-y-3">
          <select
            className="w-full p-2 border rounded-lg text-sm"
            value={newExpense.category}
            onChange={(e) =>
              setNewExpense({ ...newExpense, category: e.target.value })
            }
          >
            <option value="Shopping">Shopping</option>
            <option value="Food & Drinks">Food & Drinks</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <input
            type="text"
            placeholder="Description"
            className="w-full p-2 border rounded-lg text-sm"
            value={newExpense.description}
            onChange={(e) =>
              setNewExpense({ ...newExpense, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-2 border rounded-lg text-sm"
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense({ ...newExpense, amount: e.target.value })
            }
          />
          <button
            onClick={handleAddExpense}
            className="py-2 sm:py-3 w-full text-sm sm:text-base text-white bg-black rounded-lg"
          >
            Add Expense
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddExpense}
          className="py-2 sm:py-3 mb-6 sm:mb-8 w-full text-sm sm:text-base text-white bg-black rounded-lg"
        >
          + Add New Expense
        </button>
      )}

      <CategoryBreakdown />
      <BudgetStatus />
    </section>
  );
}

export default FinancialSummary;
