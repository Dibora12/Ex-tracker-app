"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "./expensesSlice";

function CategoryBreakdown() {
  const categories = useSelector(selectCategories);

  // Calculate stroke dasharray values based on percentages
  const getStrokeDasharray = (percentage) => {
    return `${percentage} 100`;
  };

  // Get color code from Tailwind class
  const getColorCode = (colorClass) => {
    const colorMap = {
      "bg-indigo-600": "#4F46E5",
      "bg-green-500": "#22C55E",
      "bg-yellow-500": "#EAB308",
      "bg-red-500": "#EF4444",
    };
    return colorMap[colorClass] || "#4F46E5";
  };

  // Calculate rotation for each segment
  const getRotation = (index) => {
    if (index === 0) return "0";

    let totalPercentage = 0;
    for (let i = 0; i < index; i++) {
      totalPercentage += categories[i].percentage;
    }

    return `rotate(-${totalPercentage * 3.6} 50 50)`;
  };

  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-medium leading-7">
        Category Breakdown
      </h3>
      <div className="mx-auto h-[48] w-[48]">
        <div className="relative size-full">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {categories.map((category, index) => (
              <circle
                key={index}
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={getColorCode(category.color)}
                strokeWidth="20"
                strokeDasharray={getStrokeDasharray(category.percentage)}
                transform={getRotation(index)}
              />
            ))}
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mt-3 sm:mt-4">
        {categories.map((category, index) => (
          <div key={index} className="flex gap-2 items-center">
            <div
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${category.color} rounded-full`}
            />
            <div className="text-xs sm:text-sm leading-5">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryBreakdown;
