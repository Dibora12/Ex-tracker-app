import React, { useState } from "react";

function MetricCard({ label, value, change, icon, onEdit }) {
  const isPositive = change >= 0;

  return (
    <article className="bg-white p-[20px] rounded-[8px] border border-gray-300 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-gray-600 text-sm">{label}</h3>
        <img src={icon} alt={`${label} icon`} className="w-6 h-6" />
      </div>
      <p className="text-2xl font-semibold mb-2">${value}</p>
      <div
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
          isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        <span className="mr-1">{isPositive ? "↑" : "↓"}</span>
        <span>{Math.abs(change)}%</span>
      </div>

      {/* Edit Button */}
      <button
        onClick={onEdit}
        className="mt-3 block w-full text-sm text-blue-600 hover:text-blue-700"
      >
        Edit
      </button>
    </article>
  );
}

export default MetricCard;

