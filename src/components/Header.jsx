import React from "react";

function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 h-14 sm:h-16">
        <div className="flex gap-2 sm:gap-4 items-center">
          <img src="logo.svg" alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8" />
          <h1 className="text-base sm:text-lg font-medium leading-7 text-gray-900">
            Logo
          </h1>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center">
          <button
            aria-label="Notifications"
            className="p-2 sm:p-3 md:p-4 bg-black rounded-lg"
          >
            <i
              className="ti ti-bell text-white text-sm sm:text-base"
              aria-hidden="true"
            />
          </button>
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-full"
            aria-label="User profile"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
