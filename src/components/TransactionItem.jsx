"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { updateTransaction } from "./transactionsSlice";

function TransactionItem({ transaction, onRemove }) {
  const { id, category, description, formattedAmount, date, icon } =
    transaction;
  const dispatch = useDispatch();

  const handleEdit = () => {
    // In a real app, you might open a modal here
    // For now, we'll just update with a dummy value
    dispatch(
      updateTransaction({
        id,
        description: `${description} (edited)`,
      }),
    );
  };

  return (
    <article className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
      <div className="flex gap-2 sm:gap-4 items-center">
        <div className="p-2 sm:p-3 bg-gray-100 rounded">
          <i className={`ti ${icon} text-sm sm:text-base`} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-medium">{category}</h3>
          <p className="text-xs sm:text-sm leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="text-sm sm:text-base font-medium">{formattedAmount}</p>
          <p className="text-xs sm:text-sm leading-5 text-gray-500">{date}</p>
        </div>
        <div className="flex flex-col gap-1">
          <button
            onClick={handleEdit}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Edit transaction"
          >
            <i className="ti ti-edit text-xs" aria-hidden="true" />
          </button>
          <button
            onClick={onRemove}
            className="text-gray-500 hover:text-red-500"
            aria-label="Remove transaction"
          >
            <i className="ti ti-trash text-xs" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default TransactionItem;
