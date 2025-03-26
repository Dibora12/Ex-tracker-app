/**
 * Format a currency amount with dollar sign
 * @param {number} amount - The amount to format
 * @param {boolean} showSign - Whether to show + sign for positive amounts
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, showSign = false) => {
  const prefix = amount < 0 ? "-$" : showSign ? "+$" : "$";
  return `${prefix}${Math.abs(amount).toFixed(2)}`;
};

/**
 * Format a percentage value
 * @param {number} value - The percentage value
 * @param {boolean} showSign - Whether to show + sign for positive values
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, showSign = false) => {
  const prefix = value < 0 ? "" : showSign ? "+" : "";
  return `${prefix}${value.toFixed(1)}%`;
};

/**
 * Format a date to relative time (Today, Yesterday, etc.)
 * @param {Date} date - The date to format
 * @returns {string} Formatted relative date
 */
export const formatRelativeDate = (date) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date >= today) {
    return "Today";
  } else if (date >= yesterday) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString();
  }
};
