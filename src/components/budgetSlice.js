"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgets: [
    {
      id: 1,
      category: "Shopping",
      current: 450,
      total: 500,
      percentage: 90,
      color: "bg-indigo-600",
    },
    {
      id: 2,
      category: "Food & Drinks",
      current: 280,
      total: 400,
      percentage: 70,
      color: "bg-green-500",
    },
    {
      id: 3,
      category: "Transportation",
      current: 120,
      total: 200,
      percentage: 60,
      color: "bg-yellow-500",
    },
    {
      id: 4,
      category: "Entertainment",
      current: 75,
      total: 150,
      percentage: 50,
      color: "bg-red-500",
    },
  ],
  loading: false,
  error: null,
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    updateBudget: (state, action) => {
      const { id, current, total } = action.payload;
      const index = state.budgets.findIndex((budget) => budget.id === id);

      if (index !== -1) {
        const percentage = Math.round((current / total) * 100);
        state.budgets[index] = {
          ...state.budgets[index],
          current,
          total,
          percentage,
        };
      }
    },
    addBudget: (state, action) => {
      const { category, current, total, color } = action.payload;
      const percentage = Math.round((current / total) * 100);

      state.budgets.push({
        id: Date.now(),
        category,
        current,
        total,
        percentage,
        color,
      });
    },
    removeBudget: (state, action) => {
      state.budgets = state.budgets.filter(
        (budget) => budget.id !== action.payload,
      );
    },
  },
});

export const { updateBudget, addBudget, removeBudget } = budgetSlice.actions;

export const selectBudgets = (state) => state.budget.budgets;
export const selectBudgetByCategory = (state, category) =>
  state.budget.budgets.find((budget) => budget.category === category);

export default budgetSlice.reducer;
