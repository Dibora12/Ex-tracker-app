"use client";
import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import budgetReducer from "./budgetSlice";
import expensesReducer from "./expensesSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budget: budgetReducer,
    expenses: expensesReducer,
  },
});
