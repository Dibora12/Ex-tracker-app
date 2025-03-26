import React, { useState } from "react";
import MetricCard from "./MetricCard";
import RevenueChart from "./RevenueChart";
import ActivityItem from "./ActivityItem";
import "./dashboard.css";

function DashboardOverview() {
  const [selectedMetric, setSelectedMetric] = useState(0);

  const metrics = [
    {
      label: "Total Revenue",
      value: "$54,239",
      change: 12.5,
      icon: "https://placehold.co/24x24",
    },
    {
      label: "Active Users",
      value: "2,435",
      change: -4.2,
      icon: "https://placehold.co/24x24",
    },
    {
      label: "Conversion Rate",
      value: "3.2%",
      change: 8.1,
      icon: "https://placehold.co/24x24",
    },
    {
      label: "Avg Order Value",
      value: "$89.43",
      change: 2.3,
      icon: "https://placehold.co/24x24",
    },
  ];

  const chartData = [
    { date: "Jan", value: 30 },
    { date: "Feb", value: 45 },
    { date: "Mar", value: 35 },
    { date: "Apr", value: 60 },
    { date: "May", value: 48 },
    { date: "Jun", value: 75 },
  ];

  const [activities, setActivities] = useState([
    { title: "New order received", time: "2 minutes ago", icon: "https://placehold.co/20x20" },
    { title: "Payment processed", time: "15 minutes ago", icon: "https://placehold.co/20x20" },
    { title: "New user registered", time: "1 hour ago", icon: "https://placehold.co/20x20" },
  ]);

  // Function to handle CSV export
  const handleExport = () => {
    const csvData = [
      ["Metric", "Value", "Change (%)"],
      ...metrics.map(({ label, value, change }) => [label, value, change]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dashboard_metrics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to add a new recent activity
  const handleAddActivity = () => {
    const newActivity = {
      title: "User upgraded plan",
      time: "Just now",
      icon: "https://placehold.co/20x20",
    };
    setActivities((prevActivities) => [newActivity, ...prevActivities]); // Add new activity at the top
  };

  return (
    <main className="min-h-screen w-screen bg-[#F9FAFB] font-[Inter] text-[#111827] dashboard-container">
      <div className="max-w-[1440px] mx-auto p-[24px]">
        {/* Header */}
        <header className="flex items-center justify-between mb-[32px]">
          <h1 className="text-[24px] font-semibold">Dashboard Overview</h1>
          <div className="flex items-center gap-[12px]">
            <button 
              onClick={handleExport}
              className="px-[16px] py-[8px] rounded-[6px] bg-white border-[1px] border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dashboard-btn secondary-btn"
            >
              Export
            </button>
            <button 
              onClick={handleAddActivity}
              className="px-[16px] py-[8px] rounded-[6px] bg-[#4F46E5] text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] dashboard-btn primary-btn"
            >
              Add New
            </button>
          </div>
        </header>

        {/* Metrics Section */}
        <section className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-[24px] mb-[32px]">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
              isSelected={selectedMetric === index}
              onHover={() => setSelectedMetric(index)}
            />
          ))}
        </section>

        {/* Charts & Recent Activity Section */}
        <section className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-[24px]">
          {/* Revenue Chart */}
          <article className="bg-white p-[24px] rounded-[8px] border-[1px] border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.1)] col-span-2 max-sm:col-span-1">
            <h3 className="text-[16px] font-semibold mb-[24px]">
              Revenue Overview
            </h3>
            <RevenueChart data={chartData} />
          </article>

          {/* Recent Activity */}
          <aside className="bg-white p-[24px] rounded-[8px] border-[1px] border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <h3 className="text-[16px] font-semibold mb-[16px]">
              Recent Activity
            </h3>
            <div className="flex flex-col gap-[16px]">
              {activities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  title={activity.title}
                  time={activity.time}
                  icon={activity.icon}
                />
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default DashboardOverview;
