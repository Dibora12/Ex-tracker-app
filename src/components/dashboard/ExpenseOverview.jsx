"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectMonthlyData } from "../../store/slices/expensesSlice";

function ExpenseOverview() {
  const [timeframe, setTimeframe] = useState("Monthly");
  const monthlyData = useSelector(selectMonthlyData);

  // Generate SVG path from monthly data
  const generateChartPath = () => {
    if (!monthlyData || monthlyData.length === 0) return "";

    // Find max value for scaling
    const maxAmount = Math.max(...monthlyData.map((item) => item.amount));

    // Calculate points
    const points = monthlyData.map((item, index) => {
      const x = 50 + (700 * index) / (monthlyData.length - 1);
      // Invert Y axis (SVG 0,0 is top-left)
      const y = 250 - (200 * item.amount) / maxAmount;
      return { x, y };
    });

    // Create SVG path
    let path = `M${points[0].x},${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      // Use quadratic curves for smoother lines
      const cpX = (points[i].x + points[i - 1].x) / 2;
      path += ` Q${cpX},${points[i - 1].y} ${points[i].x},${points[i].y}`;
    }

    return path;
  };

  const handleExport = () => {
    alert("Exporting data...");
    // In a real app, this would generate a CSV or PDF
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    // In a real app, this would fetch different data based on timeframe
  };

  return (
    <section className="p-4 sm:p-6 mb-4 sm:mb-6 md:mb-8 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-medium leading-7">
          Expense Overview
        </h2>
        <div className="flex gap-2 sm:gap-4 items-center w-full sm:w-auto">
          <div className="relative">
            <select
              value={timeframe}
              onChange={(e) => handleTimeframeChange(e.target.value)}
              className="appearance-none px-3 sm:px-4 py-1.5 sm:py-2 rounded border border-solid text-sm sm:text-base bg-white pr-8"
            >
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <i
                className="ti ti-chevron-down text-gray-500"
                aria-hidden="true"
              />
            </div>
          </div>
          <button
            onClick={handleExport}
            className="flex gap-1 sm:gap-2 items-center px-3 sm:px-4 py-1.5 sm:py-2 text-white bg-black rounded text-sm sm:text-base"
          >
            <i className="ti ti-download" aria-hidden="true" />
            <span>Export</span>
          </button>
        </div>
      </div>
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px]">
        <div className="absolute inset-0 bg-gray-100" />
        <div className="absolute inset-0 p-4">
          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-gray-500 absolute bottom-0 left-0 right-0">
            {monthlyData.map((item, index) => (
              <div key={index}>{item.month}</div>
            ))}
          </div>
        </div>
        <div>
          <svg viewBox="0 0 800 300" className="w-full h-full">
            <path
              d={generateChartPath()}
              fill="none"
              stroke="#4F46E5"
              strokeWidth="2"
            ></path>
            {/* Add dots for data points */}
            {monthlyData.map((item, index) => {
              const x = 50 + (700 * index) / (monthlyData.length - 1);
              const maxAmount = Math.max(...monthlyData.map((d) => d.amount));
              const y = 250 - (200 * item.amount) / maxAmount;
              return <circle key={index} cx={x} cy={y} r="4" fill="#4F46E5" />;
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}

export default ExpenseOverview;
