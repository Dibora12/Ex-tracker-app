"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectRecentTransactions,
  removeTransaction,
} from "./transactionsSlice";
import TransactionItem from "./TransactionItem";

function TransactionList() {
  const transactions = useSelector(selectRecentTransactions);
  const dispatch = useDispatch();

  const handleRemoveTransaction = (id) => {
    dispatch(removeTransaction(id));
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-medium leading-7">
          Recent Transactions
        </h2>
        <button className="text-sm sm:text-base text-gray-500">View all</button>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onRemove={() => handleRemoveTransaction(transaction.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default TransactionList;
