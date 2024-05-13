<script setup>
import { useUtils } from "~/composables/useUtils";

const isOpen = ref(false);
const props = defineProps({
  leftActivities: Number,
  data: Object,
  openOnChange: Boolean,
});

const onOpenModal = () => {
  console.log("pan con queso");
};
const { openOnChange } = toRefs(props);

watch(openOnChange, (a, b) => {
  isOpen.value = true;
});

const { getHour } = useUtils();
const fullDayTodo = ref([]);

// const todoList = [
//   {
//     tag: "Clean House",
//     numericHour: {
//       initialHour: 8,
//       endHour: 10,
//     },
//     initialHour: "08:00",
//     endHour: "10:00",
//     done: true,
//   },
//   {
//     tag: "Grocery Shopping",
//     numericHour: {
//       initialHour: 10,
//       endHour: 12,
//     },
//     initialHour: "10:00",
//     endHour: "12:00",
//     done: false,
//   },
//   {
//     tag: "Work on Project",
//     numericHour: {
//       initialHour: 13,
//       endHour: 15,
//     },
//     initialHour: "13:00",
//     endHour: "15:00",
//     done: false,
//   },
//   {
//     tag: "Gym Workout",
//     numericHour: {
//       initialHour: 16,
//       endHour: 18,
//     },
//     initialHour: "16:00",
//     endHour: "18:00",
//     done: false,
//   },
//   {
//     tag: "Cook Dinner",
//     numericHour: {
//       initialHour: 19,
//       endHour: 21,
//     },
//     initialHour: "19:00",
//     endHour: "21:00",
//     done: false,
//   },
//   {
//     tag: "Read a Book",
//     numericHour: {
//       initialHour: 22,
//       endHour: 24,
//     },
//     initialHour: "22:00",
//     endHour: "24:00",
//     done: false,
//   },
// ];

const todoList = props.data.activity?.todoList;

const getTodo = (hour) => {
  if (todoList)
    for (let todo of todoList) {
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

const onClickOnEventData = ref(false);
const onClickOnEvent = (data) => {
  onClickOnEventData.value = {
    changer: !onClickOnEventData.value.changer,
    payload: data,
  };
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
                class="activity-hour flex gap-4"
                :class="{
                  'todo-inactive': !todo.tag,
                  'todo-active': todo.tag,
                }"
                @click="() => onClickOnEvent(todo)"
              >
                <UCheckbox
                  v-model="todo.done"
                  name="notifications"
                  label=""
                  :disabled="!todo.tag"
                />
                <p>
                  {{ todo.initialHour }}
                  {{ todo.tag }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </UCard>
      <calendar-add-activity
        :on-click-on-event-data="onClickOnEventData"
        :data="data"
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
.activity-hour {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.activity-hour:hover {
  background: #ffffff33;
}

.todo-inactive {
  opacity: 0.5;
}
</style>
