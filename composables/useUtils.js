export const useUtils = () => {
  const getDayPrefix = (day) => {
    if (day === 1) return "st";
    if (day === 2) return "nd";
    if (day === 3) return "rd";
    return "th";
  };

  return {
    getDayPrefix,
  };
};
