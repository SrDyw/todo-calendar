<script setup>
import { ref, onMounted } from "vue";
import { useUtils } from "~/composables/useUtils";
import { months } from "~/constants";

const props = defineProps({
  data: Object,
});
const dayData = ref(props.data);

const { getDayPrefix, getHour } = useUtils();
const prefix = getDayPrefix(dayData?.value.dayNumber);

const todoList = ref(dayData.value.activity?.todoList);
const filteredTodoList = ref(null);
const leftActivities = ref(0);

const updateTodoList = (list) => {
  if (todoList.value) {
    const sortedTodoList = todoList.value.sort(
      (a, b) => a.initialHour - b.initialHour >= 0
    ); // Sort by due date ascending

    // Get current hour
    const now = new Date();
    // let currentHour = 5;
    let currentHour = now.getHours();

    let minDistance = 24;
    let breakPointIndex = -1;

    for (let i = 0; i < sortedTodoList.length; i++) {
      const hour = getHour(sortedTodoList[i].endHour);
      // console.log(currentHour, hour);
      if (currentHour >= hour) continue;

      const distance = Math.abs(hour - currentHour);

      if (distance < minDistance) {
        minDistance = distance;
        breakPointIndex = i;
      }
    }
    if (breakPointIndex !== -1) {
      filteredTodoList.value = sortedTodoList.slice(
        breakPointIndex,
        breakPointIndex + 3
      );
    } else {
      filteredTodoList.value = sortedTodoList.slice(
        Math.max(sortedTodoList.length - 3, 0),
        sortedTodoList.length
      );
    }
  }
};

updateTodoList(todoList);

watch(todoList, (newValue, oldValue) => {
  updateTodoList(newValue);
});
const emit = defineEmits(["onDayChange", "onEventRemove"]);
const onDayChange = (payload) => {
  const date = new Date();
  // const month = payload

  emit("onDayChange", { ...payload });
};

const onCreatedEvent = (payload) => {
  dayData.value = payload.event;
  onDayChange(dayData.value);
};

const onRemoveEvent = (payload) => {
  dayData.value = { ...dayData.value, activity: null };
  onDayChange(dayData.value);
  emit("onEventRemove", {});
};

const onEventChange = (payload) => {
  dayData.value = payload;
  todoList.value = dayData.value.activity?.todoList;
  onDayChange(dayData.value);
};

let openFullViewModal;

const openFullViewModalOnChange = ref(false);

openFullViewModal = () => {
  openFullViewModalOnChange.value = !openFullViewModalOnChange.value;
};
</script>

<template>
  <div class="picker-wrapper">
    <div class="header">
      <h2>
        {{ dayData.dayNumber }}<sup class="mr-[1ch]">{{ prefix }}</sup>
        <span class="opacity-50">of {{ months[dayData.month] }}</span>
      </h2>

      <div v-if="dayData.activity" class="w-full day-basic-info relative">
        <h2>{{ dayData.activity.title }}</h2>
        <h3>{{ dayData.activity.description }}</h3>
        <CalendarDeleteEventModal
          :data="dayData"
          @on-remove-event="onRemoveEvent"
        />
      </div>
    </div>
    <div class="no-section">
      <div class="no-data" v-if="dayData.activity == null">
        <p>There is not events here...</p>
        <CalendarAddDayModal
          @on-created-event="onCreatedEvent"
          :data="dayData"
        />
      </div>

      <div class="no-activities" v-if="dayData.activity?.todoList.length == 0">
        <p>There is not activities for this event</p>
        <UButton
          icon="i-heroicons-pencil-square"
          size="sm"
          color="primary"
          variant="solid"
          label="Add one"
          :trailing="false"
          @click="openFullViewModal"
        />
      </div>
    </div>

    <div class="todo-list" v-if="filteredTodoList?.length > 0">
      <CalendarDayViewerTodo
        v-for="todo of filteredTodoList"
        :key="todo"
        :data="todo"
        :payload="data"
      />
      <UButton
        icon="i-heroicons-pencil-square"
        :label="`Event Dashboard`"
        @click="openFullViewModal"
      />
    </div>
    <div class="event-dashboard-container">
      <CalendarDayFullViewer
        :leftActivities="leftActivities"
        :data="dayData"
        :open-on-change="openFullViewModalOnChange"
        @on-event-change="onEventChange"
      />
    </div>
  </div>
</template>

<style scoped>
.picker-wrapper {
  background: #151b2c;
  width: 100%;
  min-height: 400px;
  margin: auto;
  border-radius: 10px;
  border: 1px solid #1c3997;
  position: relative;
  padding: 10px;
}

.picker-wrapper .header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bolder;
  flex-direction: column;
  margin-bottom: 10px;
}

.picker-wrapper .header h2 {
  margin-bottom: 10px;
}

.day-basic-info {
  /* border: 1px solid #ffffff23; */
  border-radius: 10px;
  padding: 20px;
  background: #0208167a;
}
.day-basic-info h2 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0 !important;
}

.day-basic-info h3 {
  font-size: 1rem;
  font-weight: normal;
  padding-inline: 10px;
  opacity: 0.5;
}

.no-data {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 10px;
}

.no-activities {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.todo-list {
  background: #0c1222;
  width: 100%;
  min-height: 100px;
  margin: auto;
  border-radius: 10px;
  border: 1px solid #1c3997;
  position: relative;
  padding: 20px;
}

.todo-list button {
  margin: auto;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.event-dashboard-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 20px);
}
</style>
