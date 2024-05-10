import { ref } from "vue";
import { weekDays, months } from "@/constants.js";

export default function useDate(month, year) {
  const date = new Date();
  const lastDateOfMonth = new Date(year, month + 1, 0);
  const lastDateOfPrevMonth = new Date(year, month, 0);

  const daysInMonth = lastDateOfMonth.getDate();
  const lastDayOfPrevMonth = lastDateOfPrevMonth.getDate();
  const firstWeekDay = lastDateOfMonth.getDay();
  const lastWeekDay = 6 - new Date(year, month, daysInMonth).getDay();

  const curr_day = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const lastWeekDayOfPrevMonth = lastDateOfPrevMonth.getUTCDay() + 1;

  const lastDaysOfPrevMonth = [];
  const firstDaysOfNextMonth = [];

  for (let d = 0; d < lastWeekDayOfPrevMonth; d++) {
    lastDaysOfPrevMonth.push(
      lastDayOfPrevMonth - (lastWeekDayOfPrevMonth - d) + 1
    );
  }
  for (let d = 1; d <= lastWeekDay; d++) {
    firstDaysOfNextMonth.push(d);
  }
  const getDayPrefix = (day) => {
    if (day === 1) return "st";
    if (day === 2) return "nd";
    if (day === 3) return "rd";
    return "th";
  };

  return {
    date,
    daysInMonth,
    lastDateOfMonth,
    firstWeekDay,
    lastWeekDay,
    curr_day,
    currentMonth,
    currentYear,
    lastWeekDayOfPrevMonth,
    lastDayOfPrevMonth,
    lastWeekDayOfPrevMonth,
    lastDaysOfPrevMonth,
    firstDaysOfNextMonth,
    getDayPrefix,
  };
}
