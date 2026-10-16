// utils/formatDate.js
/**
 * Formats a date string or Date object to "Day Month, YYYY"
 * Example: 16 October, 2026
 * 
 * @param {string|Date} dateInput - The date to format
 * @returns {string} - Formatted date
 */
export function formatDate(dateInput: string | Date): string {
  try {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  } catch (error) {
    console.error("Date formatting error:", error instanceof Error ? error.message : String(error));
    return "";
  }
}
