import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  total: 0,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      state.total += action.payload.amount;
    },
    deleteTransaction: (state, action) => {
      const index = state.transactions.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        state.total -= state.transactions[index].amount;
        state.transactions.splice(index, 1);
      }
    },
  },
});

export const { addTransaction, deleteTransaction } = expenseSlice.actions;
export default expenseSlice.reducer;
