export default function useEvents() {
  const registerEvent = async (data) => {
    // Create the backend query for register event

    // Simulate the api response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const event = {
          title: data.title,
          description: data.description,
          todoList: [],
        };

        const dayData = {
          ...data.payload,
          activity: {
            ...event,
            todoList: [],
          },
        };

        localStorage.setItem(
          `${data.payload.dayNumber}-${data.payload.month}-${data.payload.year}`,
          JSON.stringify(event)
        );

        resolve(dayData);
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
