import useDate from "./useDate";

export default function useDays(month, year) {
  const dateData = useDate(month, year);

  const prevMonthData = [];
  const currMonthData = [];
  const nextMonthData = [];

  const fillMonthDatas = () => {
    for (let day of dateData.lastDaysOfPrevMonth) {
      prevMonthData.push({
        monthTag: "prevMonthData",
        dayNumber: day,
        month: month == 0 ? 11 : month - 1,
        activity: null,
      });
    }
    for (let day = 1; day <= dateData.daysInMonth; day++) {
      currMonthData.push({
        monthTag: "currMonthData",
        dayNumber: day,
        month,
        activity: null,
      });
    }

    for (let day = 1; day <= dateData.firstDaysOfNextMonth.length; day++) {
      nextMonthData.push({
        dayNumber: day,
        monthTag: "nextMonthData",
        month: month == 11 ? 0 : month + 1,
        activity: null,
      });
    }
  };

  const getTestDays = async (month, year) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const getDataTest = (title, todoList = []) =>
          Math.random() > 0.2
            ? {
                title: title,
                description:
                  "lorem apsdasdp dpoklsamd oa oad asod os od od asold asokc asodki adodkms aosk doaskd asdsadoka sdkoa sdoaskd aoksd opak doka sdok ",
                todoList: todoList,
              }
            : null;

        const getTODOtest = () => {
          const todo = [];
          let hour = 0;
          while (hour <= 23) {
            let initialHour = (hour < 10 ? "0" : "") + hour + ":00";
            hour += Math.max(Math.floor(Math.random() * 23), 1);
            let endHour = Math.min(hour, 23) + ":00";

            todo.push({
              initialHour,
              endHour,
              tag: `Task ${hour}`,
            });
          }

          return todo;
        };

        for (let day of dateData.lastDaysOfPrevMonth) {
          prevMonthData.push({
            monthTag: "prevMonthData",
            dayNumber: day,
            month: month == 0 ? 11 : month - 1,
            activity: getDataTest("Random title " + day),
          });
        }
        for (let day = 1; day <= dateData.daysInMonth; day++) {
          currMonthData.push({
            monthTag: "currMonthData",
            dayNumber: day,
            month,
            activity: getDataTest(
              "Random title " + day,
              Math.random() > 0.25 ? getTODOtest() : []
            ),
          });
        }

        for (let day = 1; day <= dateData.firstDaysOfNextMonth.length; day++) {
          nextMonthData.push({
            dayNumber: day,
            monthTag: "nextMonthData",
            month: month == 11 ? 0 : month + 1,
            activity: getDataTest("Random title " + day),
          });
        }

        resolve({
          prevMonthData,
          currMonthData,
          nextMonthData,
        });
      }, Math.random() * 2000);
    });
  };

  const getDaysFromLocal = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fillMonthDatas();
        const data = localStorage.getItem(`${month}-${year}`);
        console.log({
          prevMonthData,
          currMonthData,
          nextMonthData,
        });

        resolve({
          prevMonthData,
          currMonthData,
          nextMonthData,
        });
      }, 500);
    });
  };

  return { getTestDays, getDaysFromLocal };

  // Create a timeout for simulate a async petition
}
