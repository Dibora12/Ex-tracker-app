/**
 * Get the appropriate icon for a category
 * @param {string} category - The category name
 * @returns {string} Icon class name
 */
export const getCategoryIcon = (category) => {
  const icons = {
    Shopping: "ti-shopping-cart",
    "Food & Drinks": "ti-restaurant",
    Transportation: "ti-car",
    Entertainment: "ti-device-tv",
    Housing: "ti-home",
    Utilities: "ti-bulb",
    Healthcare: "ti-first-aid",
    Education: "ti-book",
  };
  return icons[category] || "ti-receipt";
};

/**
 * Get the appropriate color for a category
 * @param {string} category - The category name
 * @returns {string} Tailwind color class
 */
export const getCategoryColor = (category) => {
  const colors = {
    Shopping: "bg-indigo-600",
    "Food & Drinks": "bg-green-500",
    Transportation: "bg-yellow-500",
    Entertainment: "bg-red-500",
    Housing: "bg-blue-500",
    Utilities: "bg-purple-500",
    Healthcare: "bg-pink-500",
    Education: "bg-teal-500",
  };
  return colors[category] || "bg-gray-500";
};

/**
 * Get all available expense categories
 * @returns {Array} Array of category objects with name and color
 */
export const getAllCategories = () => {
  return [
    { name: "Shopping", color: "bg-indigo-600" },
    { name: "Food & Drinks", color: "bg-green-500" },
    { name: "Transportation", color: "bg-yellow-500" },
    { name: "Entertainment", color: "bg-red-500" },
    { name: "Housing", color: "bg-blue-500" },
    { name: "Utilities", color: "bg-purple-500" },
    { name: "Healthcare", color: "bg-pink-500" },
    { name: "Education", color: "bg-teal-500" },
  ];
};
