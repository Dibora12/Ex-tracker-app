import React from "react";

function ActivityItem({ title, time, icon }) {
  return (
    <div className="flex items-center gap-[12px] p-[8px] rounded-[6px] border border-[#E5E7EB] bg-white shadow-sm">
      <div className="w-[40px] h-[40px] rounded-full bg-[#F3F4F6] flex items-center justify-center">
        <img src={icon} alt="Activity icon" className="w-[20px] h-[20px]" />
      </div>
      <div>
        <p className="text-[14px] font-medium text-[#111827]">{title}</p>
        <p className="text-[12px] text-[#6B7280]">{time}</p>
      </div>
    </div>
  );
}

export default ActivityItem;
