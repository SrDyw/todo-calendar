export const useUtils = () => {
  const getDayPrefix = (day) => {
    const lastDigit = day % 10;
    if (!(day > 10 && day < 14)) {
      if (lastDigit === 1) return "st";
      if (lastDigit === 2) return "nd";
      if (lastDigit === 3) return "rd";
    }
    return "th";
  };

  function getHour(timeString) {
    // console.log(timeString);
    // Divide la cadena en horas y minutos
    let [hour, minute] = timeString.split(":");

    // Convierte la hora a un número y la devuelve
    return parseInt(hour);
  }

  const getMonth = (index) => {};
  return {
    getDayPrefix,
    getHour,
  };
};
