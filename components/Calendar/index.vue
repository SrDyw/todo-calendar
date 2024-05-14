<script setup>
import { ref, onMounted } from "vue";
import { weekDays, months } from "@/constants.js";
import useCalendar from "@/composables/useCalendar.js";

import CalendarDay from "@/components/Calendar/CalendarDay.vue";
import useDays from "~/composables/useDays";

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
  smoothTransitionBtwDates,
} = useCalendar();

const { getDaysFromLocal } = useDays();
const currentDateData = ref();

const timerToFetchCurrentDate = ref(null);
const fetchCurrentDDate = () => {
  const getLocalData = () => {
    getDaysFromLocal(currentMonth, currentYear).then((data) => {
      currentDateData.value = data;
    });
  };

  getLocalData();

  timerToFetchCurrentDate.value = setInterval(() => {
    getLocalData();
  }, 1000 * 10); // Every 10s
};

const mutableDaysData = ref(daysData);

onMounted(() => {
  setupCalendar();
  fetchCurrentDDate();
});

onBeforeUnmount(() => {
  clearInterval(timerToFetchCurrentDate.value);
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
  if (m) {
    let monthClone = [...m];

    monthClone[payload.index] = payload;
    mutableDaysData.value[payload.monthTag] = monthClone;
  }
};

const years = Array.from({ length: 100 }, (_, i) => 2001 + i);
const gotoModalIsOpen = ref(false);

const monthSelected = ref(months[currentMonth]);
const yearSelected = ref(currentYear);

const travelToSelectedDate = () => {
  smoothTransitionBtwDates(
    months.indexOf(monthSelected.value),
    yearSelected.value
  );
  gotoModalIsOpen.value = false;
};

const todaysEvent = ref(null);
const { getHour } = useUtils();
watch(currentDateData, (newVal) => {
  const today = new Date();
  const monthData = currentDateData.value["currMonthData"];
  const dayData = monthData[today.getDate() - 1];
  let todo = null;
  if (dayData.activity) {
    for (let t of dayData.activity.todoList) {
      if (getHour(t.initialHour) == today.getHours()) {
        todo = t;
      }
    }
    todaysEvent.value = { ...dayData.activity, todo };
  }
});
</script>

<template>
  <div>
    <UModal v-model="gotoModalIsOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Go to
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="gotoModalIsOpen = false"
            />
          </div>
        </template>

        <div class="flex gap-4 w-full">
          <USelectMenu
            v-model="monthSelected"
            :options="months"
            class="w-full"
          />
          <USelectMenu v-model="yearSelected" :options="years" class="w-full" />
        </div>

        <template #footer>
          <div class="flex items-center justify-between">
            <UButton
              variant="solid"
              color="primary"
              label="Travel"
              @click="travelToSelectedDate"
              block
            >
              <template #trailing>
                <UIcon
                  name="i-heroicons-arrow-right-20-solid"
                  class="w-5 h-5"
                />
              </template>
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <UModal v-model="dayViewerOpen">
      <CalendarDayViewer
        :data="dayPickedData"
        @on-day-change="onDayChange"
        @on-event-remove="dayViewerOpen = false"
      />
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
        <p @click="gotoModalIsOpen = true">{{ months[month] }} {{ year }}</p>
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
    <div class="footer flex items-center justify-center">
      <span v-if="todaysEvent">Today's Event</span>
      <h2 class="text-4xl font-bold">{{ todaysEvent?.title }}</h2>
      <p>{{ todaysEvent?.todo?.tag }}</p>
    </div>
  </div>
</template>

<style>
:root {
  --font-color: #838383;
  --active-color: #4ade80;
  --round: 5px;
  --translation-value: 10px;
  --translation-duration: 0.5s;
}
.footer {
  flex-direction: column;
  text-align: center;
}
.footer h2 {
  color: var(--active-color);
}
.footer p {
  font-weight: bold;
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

  display: flex;
  align-items: center;
  flex-direction: column;
}

@media (max-width: 320px) {
  .wrapper {
    padding: 5px;
  }
}

.wrapper .header {
  color: black;
  font-weight: bolder;
  font-size: 1.5rem;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
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

.date > p {
  cursor: pointer;
  transition: 0.2s;
}

.date > p:hover {
  color: #4ade80;
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
  color: #4ade80;
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

.footer {
  width: 100%;
  height: 100%;
}
</style>
