export const useUtils = () => {
  const sayHello = (msg: string) => {
    console.log(msg);
  };

  return {
    sayHello,
  };
};
