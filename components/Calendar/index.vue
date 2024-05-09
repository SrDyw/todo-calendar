<script setup>
import { ref, onMounted } from "vue";

const date = new Date();

const daysInMonth = ref(0);
const lastDayOfPrevMonth = ref(0);
const firstWeekDay = ref(0);
const lastWeekDay = ref(0);
const month = ref(date.getMonth());
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const year = ref(date.getFullYear());
const curr_day = ref(0);
const prefix = ref("th");
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
// Create an array with all month of the year
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const updateCalendar = () => {
  const lastDateOfMonth = new Date(year.value, month.value + 1, 0);
  const lastDateOfPrevMonth = new Date(year.value, month.value, 0);
  daysInMonth.value = lastDateOfMonth.getDate();

  lastDayOfPrevMonth.value = lastDateOfPrevMonth.getDate();
  firstWeekDay.value = lastDateOfMonth.getDay();
  lastWeekDay.value =
    7 - new Date(year.value, month.value + 1, daysInMonth.value).getDay();
  curr_day.value = date.getDate();
  prefix.value = "th";
  if (curr_day === 1) prefix.value = "st";
  if (curr_day === 2) prefix.value = "nd";
  if (curr_day === 3) prefix.value = "rd";
};
onMounted(() => {
  const calendar = document.querySelector(".calendar");
  let timeOutToReset = null,
    timeOutToChange = null;
  const smoothTransitionBtwDates = (targetMonth, targetYear) => {
    const baseTimeTransition = 0.5;
    const smoothTags = ["calendar-smooth-left", "calendar-smooth-right"];
    if (
      !calendar.classList.contains(smoothTags[0]) &&
      !calendar.classList.contains(smoothTags[1])
    ) {
      if (
        targetYear < year.value ||
        (targetYear == year.value && targetMonth < month.value)
      )
        calendar.classList.add(smoothTags[0]);
      else calendar.classList.add(smoothTags[1]);

      timeOutToChange = setTimeout(() => {
        month.value = targetMonth;
        year.value = targetYear;
        updateCalendar();
        clearTimeout(timeOutToChange);
      }, baseTimeTransition * 500);

      timeOutToReset = setTimeout(() => {
        calendar.classList.remove(smoothTags[0]);
        calendar.classList.remove(smoothTags[1]);

        clearTimeout(timeOutToReset);
      }, baseTimeTransition * 1000);
    }
  };

  const wr_btns = document.querySelectorAll(".wrapper-btn");
  const todays_date = document.querySelector(".todays-date");
  wr_btns.forEach((w) => {
    w.addEventListener("click", () => {
      if (w.id == "wr-left") {
        if (month.value > 0)
          smoothTransitionBtwDates(month.value - 1, year.value);
        else smoothTransitionBtwDates(11, year.value - 1);
      }
      if (w.id == "wr-right") {
        if (month.value < 11)
          smoothTransitionBtwDates(month.value + 1, year.value);
        else smoothTransitionBtwDates(0, year.value + 1);
      }
    });
  });

  todays_date.addEventListener("click", () => {
    smoothTransitionBtwDates(date.getMonth(), date.getFullYear());
  });
});

updateCalendar();
</script>

<template>
  <div class="wrapper">
    <div class="header">
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
        <li v-for="day in firstWeekDay" :key="day" class="inactive">
            {{ lastDayOfPrevMonth - (firstWeekDay - day) }}
        </li>

        <!-- Current Month Days -->
        <li
          v-for="day in daysInMonth"
          :key="day"
          :class="{
            active:
              day === curr_day && currentYear == year && currentMonth == month,
          }"
        >
          {{ day }}
        </li>

        <li v-for="day in lastWeekDay" :key="day" class="inactive">
          {{ day }}
        </li>
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
  height: 80vh;
  transition: 0.2s;
  border-radius: var(--round);
}

.wrapper .header {
  color: black;
  font-weight: bolder;
  font-size: 1.5rem;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
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
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateX(var(--translation-value));
    opacity: 0;
  }
  60% {
    transform: translateX(calc(-1 * var(--translation-value)));
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
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
.days li {
  text-align: end;
  padding-top: 30px;
  padding-right: 10px;
  border: 1px solid #fafafa;
  transition: 0.2s;
  background: transparent;
}

.days li:hover {
  border: 1px solid #bdbdbd;
  background: #e9e9e9;
}
.days .inactive {
  color: #afafaf;
}

.days .active {
  background: var(--active-color);
  color: white;
  font-weight: bolder;
  font-size: 1.25rem;
  border: 1px solid #e7e7e7;
}

.days .active:hover {
  background: rgb(221, 137, 214);
  border: 1px solid white;
}
</style>
