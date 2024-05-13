import { useUtils } from "./useUtils";

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

  const deleteEvent = async (data) => {
    // Simulate the api response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        localStorage.removeItem(
          `${data.payload.dayNumber}-${data.payload.month}-${data.payload.year}`
        );
        resolve({ ...data });
      }, Math.random() * 2000);
    });
  };

  const modifyEvent = async (data) => {
    // Create the backend query for modify event
    const { getHour } = useUtils();
    // Simulate the api response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const key = `${data.payload.dayNumber}-${data.payload.month}-${data.payload.year}`;
        let item = JSON.parse(localStorage.getItem(key));

        let todoList = item.todoList;
        let activiySetted = false;
        for (let i = 0; i < todoList.length; i++) {
          if (getHour(todoList[i].initialHour) == data.todoData.initialHour) {
            todoList[i] = data.todoData;
            activiySetted = true;
            break;
          }
        }
        if (!activiySetted) {
          todoList.push(data.todoData);
        }
        item.todoList = todoList;

        console.log(item);
        localStorage.setItem(key, JSON.stringify(item));
        resolve({ ...data, todoList: [] });
      }, Math.random() * 2000);
    });
  };

  return {
    registerEvent,
    deleteEvent,
    modifyEvent,
  };
}
