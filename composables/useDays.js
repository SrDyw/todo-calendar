import useDate from "./useDate";

export default function useDays() {
  const getDaysFromLocal = async (month, year) => {
    const dateData = useDate(month, year);

    const prevMonthData = [];
    const currMonthData = [];
    const nextMonthData = [];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const getDataFromLocaStorage = (d, m, y) => {
          return process.browser
            ? localStorage.getItem(`${d}-${m}-${y}`)
            : null;
        };

        for (let day of dateData.lastDaysOfPrevMonth) {
          const m = month == 0 ? 11 : month - 1;
          prevMonthData.push({
            monthTag: "prevMonthData",
            dayNumber: day,
            month: m,
            year,
            activity: JSON.parse(getDataFromLocaStorage(day, m, year)),
          });
        }
        for (let day = 1; day <= dateData.daysInMonth; day++) {
          let activity = null;
          try {
            activity = JSON.parse(getDataFromLocaStorage(day, month, year));
            activity.todoList = JSON.parse(activity.todoList);
            console.log(activity);
          } catch {}

          currMonthData.push({
            monthTag: "currMonthData",
            dayNumber: day,
            month,
            year,
            activity,
          });
        }

        for (let day = 1; day <= dateData.firstDaysOfNextMonth.length; day++) {
          const m = month == 11 ? 0 : month + 1;

          nextMonthData.push({
            dayNumber: day,
            monthTag: "nextMonthData",
            month: month == 11 ? 0 : month + 1,
            year,
            activity: JSON.parse(getDataFromLocaStorage(day, m, year)),
          });
        }

        resolve({
          prevMonthData,
          currMonthData,
          nextMonthData,
        });
      }, 500);
    });
  };

  return { getDaysFromLocal };

  // Create a timeout for simulate a async petition
}
