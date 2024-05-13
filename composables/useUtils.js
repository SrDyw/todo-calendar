export const useUtils = () => {
  const getDayPrefix = (day) => {
    if (day === 1) return "st";
    if (day === 2) return "nd";
    if (day === 3) return "rd";
    return "th";
  };

  function getHour(timeString) {
    // console.log(timeString);
    // Divide la cadena en horas y minutos
    let [hour, minute] = timeString.split(":");

    // Convierte la hora a un número y la devuelve
    return parseInt(hour);
  }

  return {
    getDayPrefix,
    getHour
  };
};
