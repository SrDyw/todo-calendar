export default function useEvents() {
  const registerEvent = async (data) => {
    // Create the backend query for register event

    // Simulate the api response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(data);
        resolve({ ...data, todoList: [] });
      }, Math.random() * 2000);
    });
  };

  const modifyEvent = async (data) => {
    // Create the backend query for modify event

    // Simulate the api response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ ...data, todoList: [] });
      }, Math.random() * 2000);
    });
  };

  return {
    registerEvent,
  };
}
