// En un archivo llamado useCalendar.js
import { ref } from "vue";
import { weekDays, months } from "@/constants.js";
import useDate from "./useDate";
import useDays from "./useDays";
import { useUtils } from "./useUtils";
import { defaultDayData } from "../constants";

export default function useCalendar() {
  const date = new Date();

  const daysInMonth = ref(0);
  const lastDayOfPrevMonth = ref(0);
  const firstWeekDay = ref(0);
  const lastWeekDay = ref(0);
  const month = ref(date.getMonth());
  const year = ref(date.getFullYear());
  const prefix = ref("th");
  const curr_day = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const lastWeekDayOfPrevMonth = ref(0);
  const daysData = ref(defaultDayData);

  const isLoadingData = ref(false);

  const updateCalendar = () => {
    isLoadingData.value = true;
    daysData.value = null;

    const { getDayPrefix } = useUtils();

    const { getDaysFromLocal } = useDays();

    getDaysFromLocal(month.value, year.value).then((data) => {
      daysData.value = data;
      isLoadingData.value = false;
    });

    const dateData = useDate(month.value, year.value);
    daysInMonth.value = dateData.daysInMonth;

    lastDayOfPrevMonth.value = dateData.lastDayOfPrevMonth;
    firstWeekDay.value = dateData.firstWeekDay;
    lastWeekDay.value = dateData.lastWeekDay;

    prefix.value = getDayPrefix(curr_day);
    lastWeekDayOfPrevMonth.value = dateData.lastWeekDayOfPrevMonth;
  };
  const smoothTransitionBtwDates = (targetMonth, targetYear) => {
    const calendar = document.querySelector(".calendar");
    let timeOutToReset = null,
      timeOutToChange = null;
    const baseTimeTransition = 0.5;
    const smoothTags = ["calendar-smooth-left", "calendar-smooth-right"];
    if (
      !calendar.classList.contains(smoothTags[0]) &&
      !calendar.classList.contains(smoothTags[1])
    ) {
      if (
        targetYear < year.value ||
        (targetYear == year.value && targetMonth < month.value)
      )
        calendar.classList.add(smoothTags[0]);
      else calendar.classList.add(smoothTags[1]);

      timeOutToChange = setTimeout(() => {
        month.value = targetMonth;
        year.value = targetYear;
        updateCalendar();
        clearTimeout(timeOutToChange);
      }, baseTimeTransition * 500);

      timeOutToReset = setTimeout(() => {
        calendar.classList.remove(smoothTags[0]);
        calendar.classList.remove(smoothTags[1]);

        clearTimeout(timeOutToReset);
      }, baseTimeTransition * 1000);
    }
  };
  const setupCalendar = () => {
    const wr_btns = document.querySelectorAll(".wrapper-btn");
    const todays_date = document.querySelector(".todays-date");
    wr_btns.forEach((w) => {
      w.addEventListener("click", () => {
        if (w.id == "wr-left") {
          if (month.value > 0)
            smoothTransitionBtwDates(month.value - 1, year.value);
          else smoothTransitionBtwDates(11, year.value - 1);
        }
        if (w.id == "wr-right") {
          if (month.value < 11)
            smoothTransitionBtwDates(month.value + 1, year.value);
          else smoothTransitionBtwDates(0, year.value + 1);
        }
      });
    });

    todays_date.addEventListener("click", () => {
      smoothTransitionBtwDates(date.getMonth(), date.getFullYear());
    });
  };

  return {
    daysInMonth,
    lastDayOfPrevMonth,
    firstWeekDay,
    lastWeekDay,
    month,
    weekDays,
    year,
    prefix,
    curr_day,
    currentMonth,
    currentYear,
    lastWeekDayOfPrevMonth,
    daysData,
    isLoadingData,
    updateCalendar,
    setupCalendar,
    smoothTransitionBtwDates,
  };
}
