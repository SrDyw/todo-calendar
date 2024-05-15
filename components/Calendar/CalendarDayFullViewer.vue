<script setup>
import useEvents from "~/composables/useEvents";
import { useUtils } from "~/composables/useUtils";

const isOpen = ref(false);
const props = defineProps({
  leftActivities: Number,
  data: Object,
  openOnChange: Boolean,
});

const onOpenModal = () => {
  // console.log("pan con queso");
};
const { openOnChange } = toRefs(props);

watch(openOnChange, (a, b) => {
  isOpen.value = true;
});

const { getHour } = useUtils();
const fullDayTodo = ref([]);

const todoList = ref(props.data.activity?.todoList);
const updateTodoList = (list) => {
  const getTodo = (hour) => {
    if (list)
      for (let todo of list) {
        if (getHour(todo.initialHour) == hour) {
          return todo;
        }
      }
    return {
      initialHour: hour.toString().padStart(2, "0") + ":00",
    };
  };

  for (let h = 0; h < 24; h++) {
    fullDayTodo.value[h] = getTodo(h);
  }
};

updateTodoList(todoList.value);
watch(todoList, async (newVal) => updateTodoList(newVal));

const onClickOnEventData = ref(false);
const onClickOnEvent = (data) => {
  onClickOnEventData.value = {
    changer: !onClickOnEventData.value.changer,
    payload: data,
  };
};

const emit = defineEmits(["onEventChange"]);

const onEventChange = (data) => {
  todoList.value = data.event.activity?.todoList;
  console.log(data);
  emit("onEventChange", data.event);
};

const updateTodoStatus = (todo) => {
  const { modifyEvent } = useEvents();

  // console.log(todoList);
  // return;
  const todoListClone = [...todoList.value];
  for (let i = 0; i < todoListClone.length; i++) {
    if (todoListClone[i].initialHour == todo.initialHour) {
      todoListClone[i] = todo;
      break;
    }
  }

  modifyEvent({
    payload: props.data,
    todoData: todo,
  }).then(() => {
    console.log("modified");
    todoList.value = todoListClone;
    onEventChange({
      event: {
        ...props.data,
        activity: {
          ...props.data.activity,
          todoList: todoListClone,
        },
      },
    });
  });
};
</script>

<template>
  <div class="calendar-full-viewer">
    <UModal v-model="isOpen" fullscreen>
      <UCard
        :ui="{
          base: 'flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow',
          },
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              <span class="font-thin">Event</span> {{ data.activity.title }}
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div class="full-viewer-container flex flex-col relative">
          <div class="viewer-sidebar mb-4">{{ data.activity.description }}</div>
          <UAlert
            icon="i-heroicons-command-line"
            description="You can manage an hour by clicking on it"
            title="Note!"
            variant="solid"
            color="primary"
          />
          <div class="activities-wrapper w-full">
            <h2 class="text-3xl">Activities</h2>
            <ul class="h-[60vh]">
              <li
                v-for="todo of fullDayTodo"
                :key="todo"
                class="activity-hour flex gap-4 justify-center items-center"
                :class="{
                  'todo-inactive': !todo.tag,
                  'todo-active': todo.tag,
                }"
              >
                <UCheckbox
                  v-model="todo.done"
                  name="notifications"
                  label=""
                  :disabled="!todo.tag"
                  @click="() => updateTodoStatus(todo)"
                />
                <div
                  class="activity-hour-info flex justify-between items-center"
                >
                  <p
                    @click="() => onClickOnEvent(todo)"
                    class="w-full h-full p-[10px]"
                  >
                    {{ todo.initialHour }}
                    <span v-if="todo.tag">
                      -
                      {{ todo.endHour }}
                    </span>
                    <span class="todo-tag">
                      {{ todo.tag }}
                    </span>
                    <span v-if="!todo.tag" class="no-activity-here"
                      >No activity here</span
                    >
                  </p>
                  <div class="hour-delete-btn" v-if="todo.tag">
                    <calendar-delete-activity-modal
                      :data="todo"
                      :payload="data"
                      @onRemoveActivity="onEventChange"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </UCard>
      <calendar-add-activity
        :on-click-on-event-data="onClickOnEventData"
        :data="data"
        @on-modified-event="onEventChange"
      />
    </UModal>
  </div>
</template>

<style>
.viewer-sidebar {
  margin-bottom: 10px;
}

.activities-wrapper {
  /* height: 80vh; */
  padding: 10px;
}

.activities-wrapper > h2 {
  border-bottom: 1px solid #ffffff49;
}
.activities-wrapper > ul {
  overflow-y: scroll;
  position: relative;
}

.activities-wrapper::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  background: #111827;
  mask-image: linear-gradient(to top, #fff 50%, transparent);
  z-index: 1;
}

.activities-wrapper ul {
  padding-bottom: 20px;
}
.activities-wrapper ul::-webkit-scrollbar {
  background: transparent;
}

.activities-wrapper ul::-webkit-scrollbar-thumb {
  background: #4ade80;
  border-radius: 10px;
}

.activity-hour {
  padding: 5px;
  font-size: 16px;
  cursor: pointer;
}
.activity-hour-info {
  width: 100%;
  padding-inline: 5px;
  border-radius: 5px;
  transition: 0.1s;
}
.activity-hour-info .todo-tag {
  font-weight: bold;
  color: #69bb81;
  margin-left: 10px;
}
.no-activity-here {
  opacity: 0.5;
  margin-left: 10px;
}
.activity-hour-info:hover {
  background: #16213d;
}

.todo-inactive {
  opacity: 0.5;
}
</style>
