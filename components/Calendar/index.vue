<script setup>
import { ref, onMounted } from "vue";
import { weekDays, months } from "@/constants.js";
import useCalendar from "@/composables/useCalendar.js";

import CalendarDay from "@/components/Calendar/CalendarDay.vue";

const {
  month,
  year,
  curr_day,
  currentMonth,
  daysInMonth,

  lastDayOfPrevMonth,
  firstWeekDay,
  lastWeekDay,
  prefix,
  currentYear,
  lastWeekDayOfPrevMonth,
  updateCalendar,
  setupCalendar,
  isLoadingData,
  daysData,
} = useCalendar();

const mutableDaysData = ref(daysData);

onMounted(() => {
  setupCalendar();
});
updateCalendar();

const dayViewerOpen = ref(false);
const dayPickedData = ref();

const handleOnDayClick = (payload) => {
  const { data } = payload;
  if (data) {
    dayViewerOpen.value = true;
    dayPickedData.value = data;
  }
};

const onDayChange = (payload) => {
  // const [day] = mutableDaysData.value.filter((d) => d.dayNumber === payload.dayNumber);
  const m = mutableDaysData.value[payload.monthTag];
  let monthClone = [...m];

  monthClone[payload.index] = payload;
  mutableDaysData.value[payload.monthTag] = monthClone;
};
</script>

<template>
  <div>
    <UModal v-model="dayViewerOpen">
      <CalendarDayViewer :data="dayPickedData" @on-day-change="onDayChange" />
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        class="absolute right-0"
        @click="dayViewerOpen = false"
      />
    </UModal>
  </div>
  <div class="wrapper">
    <div class="header">
      <p
        class="loading-msg"
        :class="isLoadingData ? 'loading-active' : 'loading-inactive'"
      >
        Cargando nuevos datos
        <span style="--i: 0">.</span>
        <span style="--i: 0.2">.</span>
        <span style="--i: 0.4">.</span>
      </p>

      <span class="wrapper-btn" id="wr-left">
        <UIcon name="i-material-symbols:arrow-back-ios" dynamic />
      </span>
      <h2 class="date">
        {{ months[month] }} {{ year }}
        <span class="todays-date"
          >Todays's {{ months[currentMonth] }} {{ curr_day }}{{ prefix }}
          {{ currentYear }}</span
        >
      </h2>
      <span class="wrapper-btn" id="wr-right">
        <UIcon name="i-material-symbols:arrow-forward-ios" dynamic />
      </span>
    </div>
    <div class="calendar">
      <ul class="week-days">
        <li v-for="day in weekDays" :key="day">{{ day }}</li>
      </ul>
      <ul class="days">
        <!-- Prev Month Days -->
        <CalendarDay
          v-for="dayNumber in lastWeekDayOfPrevMonth"
          :key="dayNumber"
          :day="lastDayOfPrevMonth - (lastWeekDayOfPrevMonth - dayNumber)"
          :is-out-month="true"
          :data="{
            ...mutableDaysData?.prevMonthData[dayNumber - 1],
            index: dayNumber - 1,
          }"
          :pan="1"
          :loading="isLoadingData"
          :is-hidden="lastWeekDayOfPrevMonth >= 7"
          @onDayClick="handleOnDayClick"
        />

        <!-- Current Month Days -->
        <CalendarDay
          v-for="dayNumber in daysInMonth"
          :key="dayNumber"
          :day="dayNumber"
          :is-active="
            dayNumber === curr_day &&
            currentYear == year &&
            currentMonth == month
          "
          :pan="dayNumber - 1"
          :data="{
            ...mutableDaysData?.currMonthData[dayNumber - 1],
            index: dayNumber - 1,
          }"
          :loading="isLoadingData"
          @onDayClick="handleOnDayClick"
        />

        <!-- First next Month days -->
        <CalendarDay
          v-for="dayNumber in lastWeekDay"
          :key="dayNumber"
          :day="dayNumber"
          :is-out-month="true"
          :loading="isLoadingData"
          :pan="dayNumber - 1"
          :data="{
            ...mutableDaysData?.nextMonthData[dayNumber - 1],
            index: dayNumber - 1,
          }"
          :is-hidden="lastWeekDay >= 7"
          @onDayClick="handleOnDayClick"
        />
      </ul>
    </div>
  </div>
</template>

<style>
:root {
  --font-color: #838383;
  --active-color: rgb(228, 116, 191);
  --round: 5px;
  --translation-value: 10px;
  --translation-duration: 0.5s;
}

.wrapper {
  background: white;
  color: var(--font-color);
  padding: 15px;
  margin: 5px;
  max-width: 900px;
  /* min-height: 535px; */
  /* height: 80vh; */
  transition: height 0.2s;
  border-radius: var(--round);
}

.wrapper .header {
  color: black;
  font-weight: bolder;
  font-size: 1.5rem;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.loading-msg {
  position: absolute;
  bottom: -30px;
  right: 50%;
  transform: translateX(50%);
  font-size: 0.85rem;
  color: rgb(87, 201, 87);
  font-weight: lighter;
}

.loading-msg > span {
  position: relative;

  animation: loading 1s ease-in-out infinite;
  animation-delay: calc(var(--i) * 1s);
}

.loading-active {
  bottom: -30px;

  opacity: 1;
  transition: 0.4s;
}
.loading-inactive {
  bottom: -35px;
  opacity: 0;
  transition: 0.4s;
}
@keyframes loading {
  0%,
  40%,
  100% {
    top: 0;
  }
  50% {
    top: -2px;
  }
}
.date {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.date span {
  font-weight: lighter;
  font-size: 0.75rem;
  letter-spacing: 2px;
  cursor: pointer;
  color: var(--font-color);
  transition: 0.2s;
}
.date span:hover {
  color: hotpink;
}

.wrapper-btn {
  display: flex;
  width: 40px;
  height: 40px;
  cursor: pointer;

  justify-content: center;
  align-items: center;
  border-radius: var(--round);
  user-select: none;
  color: var(--font-color);
  background: transparent;
  transition: 0.2s;
  overflow: hidden;
}

.wrapper-btn:hover {
  color: white;
  background: var(--active-color);
}

.calendar {
  padding: 20px;
  text-align: center;
}

.calendar-smooth-left {
  animation: fade_left forwards var(--translation-duration) ease-in-out;
}

.calendar-smooth-right {
  animation: fade_left reverse var(--translation-duration) ease-in-out;
}

@keyframes fade_left {
  0%,
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
  50% {
    transform: translate(0, var(--translation-value));
    opacity: 0;
  }
  60% {
    transform: translate(10px, 0);
    opacity: 0;
  }
}

.week-days {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  color: var(--font-color);
  font-weight: 500;
}

.calendar li {
  width: calc(100% / 7);
}

.days {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
}
</style>
