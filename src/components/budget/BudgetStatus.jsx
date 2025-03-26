"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectBudgets } from "../../store/slices/budgetSlice";

function BudgetStatus() {
  const budgets = useSelector(selectBudgets);

  return (
    <div>
      <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-medium leading-7">
        Budget Status
      </h3>
      <div className="space-y-3 sm:space-y-4">
        {budgets.slice(0, 2).map((budget) => (
          <div key={budget.id}>
            <div className="flex justify-between mb-1.5 sm:mb-2 text-xs sm:text-sm leading-5">
              <div>{budget.category}</div>
              <div>
                ${budget.current}/${budget.total}
              </div>
            </div>
            <div className="h-1.5 sm:h-2 bg-gray-100 rounded-full">
              <div
                className={`h-full ${budget.color} rounded-full`}
                style={{ width: `${budget.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BudgetStatus;
