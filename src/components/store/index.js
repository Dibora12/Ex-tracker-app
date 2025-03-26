"use client";
import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactionsSlice";
import budgetReducer from "./slices/budgetSlice";
import expensesReducer from "./slices/expensesSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budget: budgetReducer,
    expenses: expensesReducer,
  },
});
