"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [
    {
      id: 1,
      category: "Shopping",
      description: "Grocery Store",
      amount: -85.0,
      formattedAmount: "-$85.00",
      date: "Today",
      icon: "ti-shopping-cart",
    },
    {
      id: 2,
      category: "Restaurant",
      description: "Lunch",
      amount: -32.5,
      formattedAmount: "-$32.50",
      date: "Yesterday",
      icon: "ti-restaurant",
    },
  ],
  loading: false,
  error: null,
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const newTransaction = {
        id: Date.now(),
        ...action.payload,
        formattedAmount: formatAmount(action.payload.amount),
      };
      state.transactions.unshift(newTransaction);
    },
    removeTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload,
      );
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id,
      );
      if (index !== -1) {
        state.transactions[index] = {
          ...state.transactions[index],
          ...action.payload,
          formattedAmount: formatAmount(
            action.payload.amount || state.transactions[index].amount,
          ),
        };
      }
    },
  },
});

// Helper function to format amount
const formatAmount = (amount) => {
  const prefix = amount < 0 ? "-$" : "+$";
  return `${prefix}${Math.abs(amount).toFixed(2)}`;
};

export const { addTransaction, removeTransaction, updateTransaction } =
  transactionsSlice.actions;

export const selectTransactions = (state) => state.transactions.transactions;
export const selectRecentTransactions = (state) =>
  state.transactions.transactions.slice(0, 5);
export const selectTransactionsTotal = (state) =>
  state.transactions.transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

export default transactionsSlice.reducer;
