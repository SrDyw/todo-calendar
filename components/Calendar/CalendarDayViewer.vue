<script setup>
import { ref, onMounted } from "vue";
import { useUtils } from "~/composables/useUtils";
import { months } from "~/constants";

const props = defineProps({
  data: Object,
});
const { getDayPrefix } = useUtils();
const prefix = getDayPrefix(props.data?.dayNumber);

const todoList = props.data.activity?.todoList;
const filteredTodoList = ref(null);
const leftActivities = ref(0);

if (todoList) {
  const sortedTodoList = todoList.sort(
    (a, b) => a.initialHour - b.initialHour >= 0
  ); // Sort by due date ascending

  // Get current hour
  const now = new Date();
  // let currentHour = 5;
  let currentHour = now.getHours();

  let minDistance = 24;
  let breakPointIndex = -1;

  function getHour(timeString) {
    // Divide la cadena en horas y minutos
    let [hour, minute] = timeString.split(":");

    // Convierte la hora a un número y la devuelve
    return parseInt(hour);
  }
  for (let i = 0; i < sortedTodoList.length; i++) {
    const hour = getHour(sortedTodoList[i].endHour);
    if (currentHour >= hour) continue;

    const distance = Math.abs(hour - currentHour);
    if (distance < minDistance) {
      minDistance = distance;
      breakPointIndex = i;
    }
  }
  filteredTodoList.value = sortedTodoList.slice(
    breakPointIndex,
    breakPointIndex + 3
  );

  leftActivities.value = todoList.length - (breakPointIndex + 3);
}
</script>

<template>
  <div class="picker-wrapper">
    <div class="header">
      <h2>
        {{ data.dayNumber }}{{ prefix }}
        <span class="opacity-50">of {{ months[data.month] }}</span>
      </h2>
      <div v-if="data.activity" class="w-full day-basic-info">
        <h2>{{ data.activity.title }}</h2>
        <h3>{{ data.activity.description }}</h3>
      </div>
    </div>
    <div class="no-section">
      <div class="no-data" v-if="data.activity == null">
        <p>There is not events here...</p>
        <UButton
          icon="i-heroicons-pencil-square"
          size="sm"
          color="primary"
          variant="solid"
          label="Add one"
          :trailing="false"
        />
      </div>

      <div class="no-activities" v-if="data.activity?.todoList.length == 0">
        <p>There is not activities for this event</p>
        <UButton
          icon="i-heroicons-pencil-square"
          size="sm"
          color="primary"
          variant="solid"
          label="Add one"
          :trailing="false"
        />
      </div>
    </div>

    <div class="todo-list" v-if="filteredTodoList?.length > 0">
      <CalendarDayViewerTodo
        v-for="todo of filteredTodoList"
        :key="todo"
        :data="todo"
      />
      <div class="buttom-more">
        <CalendarDayFullViewer :leftActivities="leftActivities" :data="data" />
      </div>
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
  padding: 10px;
  background: #0208167a;
}
.day-basic-info h2 {
  font-size: 1.1rem;
  font-weight: bold;
}

.day-basic-info h3 {
  font-size: 1rem;
  font-weight: normal;
  padding: 10px;
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

.buttom-more {
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
