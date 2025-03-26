"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalBalance: 2847.95,
  previousMonthPercentage: 12.5,
  monthlyData: [
    { month: "Jan", amount: 2100 },
    { month: "Feb", amount: 2400 },
    { month: "Mar", amount: 1800 },
    { month: "Apr", amount: 2200 },
    { month: "May", amount: 2600 },
    { month: "Jun", amount: 2300 },
    { month: "Jul", amount: 2500 },
    { month: "Aug", amount: 2847.95 },
  ],
  categories: [
    { name: "Shopping", percentage: 35, color: "bg-indigo-600" },
    { name: "Food & Drinks", percentage: 25, color: "bg-green-500" },
    { name: "Transportation", percentage: 20, color: "bg-yellow-500" },
    { name: "Entertainment", percentage: 15, color: "bg-red-500" },
  ],
  loading: false,
  error: null,
};

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    updateTotalBalance: (state, action) => {
      state.totalBalance = action.payload;
    },
    updateMonthlyData: (state, action) => {
      state.monthlyData = action.payload;
    },
    updateCategoryPercentages: (state, action) => {
      state.categories = action.payload;
    },
    addExpense: (state, action) => {
      // Update total balance
      state.totalBalance -= action.payload.amount;

      // Update current month data
      const currentMonth = new Date().toLocaleString("default", {
        month: "short",
      });
      const monthIndex = state.monthlyData.findIndex(
        (data) => data.month === currentMonth,
      );

      if (monthIndex !== -1) {
        state.monthlyData[monthIndex].amount -= action.payload.amount;
      }

      // Calculate new percentage compared to previous month
      const currentMonthAmount =
        state.monthlyData[state.monthlyData.length - 1].amount;
      const previousMonthAmount =
        state.monthlyData[state.monthlyData.length - 2].amount;
      state.previousMonthPercentage =
        ((currentMonthAmount - previousMonthAmount) / previousMonthAmount) *
        100;
    },
  },
});

export const {
  updateTotalBalance,
  updateMonthlyData,
  updateCategoryPercentages,
  addExpense,
} = expensesSlice.actions;

export const selectTotalBalance = (state) => state.expenses.totalBalance;
export const selectPreviousMonthPercentage = (state) =>
  state.expenses.previousMonthPercentage;
export const selectMonthlyData = (state) => state.expenses.monthlyData;
export const selectCategories = (state) => state.expenses.categories;

export default expensesSlice.reducer;
