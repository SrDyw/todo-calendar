import useDate from "./useDate";

export default async function useDays(month, year) {
  // Create a timeout for simulate a async petition
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dateData = useDate(month, year);

      const getDataTest = (title, todoList = []) =>
        Math.random() > 0.2
          ? {
              title: title,
              description:
                "lorem apsdasdp dpoklsamd oa oad asod os od od asold asokc asodki adodkms aosk doaskd asdsadoka sdkoa sdoaskd aoksd opak doka sdok ",
              todoList: todoList,
            }
          : null;

      const prevMonthData = [];
      const currMonthData = [];
      const nextMonthData = [];

      console.log(dateData.lastDaysOfPrevMonth);

      for (let day of dateData.lastDaysOfPrevMonth) {
        prevMonthData.push({
          dayNumber: day,
          activity: getDataTest("Random title " + day),
        });
      }
      for (let day = 1; day <= dateData.daysInMonth; day++) {
        currMonthData.push({
          dayNumber: day,
          activity: getDataTest("Random title " + day),
        });
      }

      for (let day = 1; day <= dateData.firstDaysOfNextMonth.length; day++) {
        nextMonthData.push({
          dayNumber: day,
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
}
