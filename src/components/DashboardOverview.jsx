
import React, { useState } from "react";
import MetricCard from "./MetricCard";
import RevenueChart from "./RevenueChart";
import ActivityItem from "./ActivityItem";

function DashboardOverview() {
  const [metrics, setMetrics] = useState([
    { label: "Total Revenue", value: 54239, change: 12.5, icon: "https://placehold.co/24x24" },
    { label: "Active Users", value: 2435, change: -4.2, icon: "https://placehold.co/24x24" },
    { label: "Conversion Rate", value: 3.2, change: 8.1, icon: "https://placehold.co/24x24" },
    { label: "Avg Order Value", value: 89.43, change: 2.3, icon: "https://placehold.co/24x24" },
  ]);

  const [selectedMetric, setSelectedMetric] = useState(0);
  const [newMetric, setNewMetric] = useState({ label: "", value: "", change: "", icon: "https://placehold.co/24x24" });
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrEditMetric = () => {
    if (!newMetric.label || !newMetric.value || !newMetric.change) {
      alert("Please fill all fields");
      return;
    }

    if (editIndex !== null) {
      // Update an existing metric
      const updatedMetrics = [...metrics];
      updatedMetrics[editIndex] = { ...newMetric, value: parseFloat(newMetric.value), change: parseFloat(newMetric.change) };
      setMetrics(updatedMetrics);
      setEditIndex(null);
    } else {
      // Add new metric
      setMetrics([...metrics, { ...newMetric, value: parseFloat(newMetric.value), change: parseFloat(newMetric.change) }]);
    }

    setNewMetric({ label: "", value: "", change: "", icon: "https://placehold.co/24x24" });
  };

  const handleEdit = (index) => {
    setNewMetric(metrics[index]);
    setEditIndex(index);
  };

  return (
    <main className="min-h-screen w-screen bg-[#F9FAFB] font-[Inter] text-[#111827]">
      <div className="max-w-[1440px] mx-auto p-[24px]">
        <header className="flex items-center justify-between mb-[32px]">
          <h1 className="text-[24px] font-semibold">Dashboard Overview</h1>
          <button
            onClick={() => setEditIndex(null)}
            className="px-[16px] py-[8px] rounded-[6px] bg-[#4F46E5] text-white"
          >
            Add New
          </button>
        </header>

        {/* Add/Edit Form */}
        <div className="bg-white p-4 border rounded-md shadow-sm mb-4">
          <h3 className="text-lg font-medium mb-2">{editIndex !== null ? "Edit Metric" : "Add New Metric"}</h3>
          <input
            type="text"
            placeholder="Label"
            value={newMetric.label}
            onChange={(e) => setNewMetric({ ...newMetric, label: e.target.value })}
            className="border p-2 w-full rounded-md mb-2"
          />
          <input
            type="number"
            placeholder="Value"
            value={newMetric.value}
            onChange={(e) => setNewMetric({ ...newMetric, value: e.target.value })}
            className="border p-2 w-full rounded-md mb-2"
          />
          <input
            type="number"
            placeholder="Change (%)"
            value={newMetric.change}
            onChange={(e) => setNewMetric({ ...newMetric, change: e.target.value })}
            className="border p-2 w-full rounded-md mb-2"
          />
          <button
            onClick={handleAddOrEditMetric}
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
          >
            {editIndex !== null ? "Update Metric" : "Add Metric"}
          </button>
        </div>

        {/* Metric Cards */}
        <section className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-[24px] mb-[32px]">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              label={metric.label}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
              isSelected={selectedMetric === index}
              onHover={() => setSelectedMetric(index)}
              onEdit={() => handleEdit(index)}
            />
          ))}
        </section>

        {/* Chart and Activity Section */}
        <section className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-[24px]">
          <article className="bg-white p-[24px] rounded-[8px] border border-[#E5E7EB] shadow-sm col-span-2 max-sm:col-span-1">
            <h3 className="text-[16px] font-semibold mb-[24px]">Revenue Overview</h3>
            <RevenueChart />
          </article>

          <aside className="bg-white p-[24px] rounded-[8px] border border-[#E5E7EB] shadow-sm">
            <h3 className="text-[16px] font-semibold mb-[16px]">Recent Activity</h3>
            <div className="flex flex-col gap-[16px]">
              <ActivityItem title="New order received" time="2 minutes ago" icon="https://placehold.co/20x20" />
              <ActivityItem title="Payment processed" time="15 minutes ago" icon="https://placehold.co/20x20" />
              <ActivityItem title="New user registered" time="1 hour ago" icon="https://placehold.co/20x20" />
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default DashboardOverview;
