<script setup>
import { defineComponent } from "@vue/composition-api";

import { ref, computed } from "vue";
const props = defineProps({
  day: Number,
  isActive: Boolean,
  isOutMonth: Boolean,
  data: Object,
  loading: Boolean,
  isHidden: Boolean,
});

const viewerOpen = ref(false);

if (props.data.activity) {
  console.log(props.data);
}

const displayData = computed(() => {
  return props.data && props.data.activity
    ? props.data.activity.title
    : "No event here";
});

const emit = defineEmits(["onDayClick"]);
const onDayClick = () => {
  emit("onDayClick", {
    data: props.data,
  });
};
</script>

<template>
  <li
    :class="{ active: isActive, inactive: isOutMonth }"
    v-if="!isHidden"
    @click="onDayClick"
  >
    <UTooltip :text="!loading ? displayData : 'Loading'">
      <span>
        {{ day }}
      </span>
    </UTooltip>
    <span
      class="bottom-line"
      :class="{ 'with-task': props.data && props.data.activity }"
      :style="'--i:' + day"
    ></span>
  </li>
  <div>
    <UModal v-model="viewerOpen">
      <div class="p-4">
        <Placeholder class="h-48" />
      </div>
    </UModal>
  </div>
</template>
<style scoped>
.days li {
  text-align: end;

  border: 1px solid #fafafa;
  transition: 0.2s;
  background: transparent;
  position: relative;
  color: black;
}

.days li:hover {
  border: 1px solid #bdbdbd;
  background: #e9e9e9;
}
.days .inactive {
  color: #969696;
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

.days li > div {
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 15px;
  padding-right: 10px;
}
@media (max-height: 600px) {
  .days li > div {

    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 10px;
  }
}

.days li > div span {
  width: 100%;
  height: 100%;
}

.bottom-line {
  position: absolute;
  height: 5px;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  opacity: 0.5;
  bottom: -3px;
  transition: 0.2s;
  transition-delay: calc(var(--i) * 0.05);
  opacity: 0;
}
.active .with-task {
  background: white;
  opacity: 1;
}
.inactive .with-task {
  opacity: 0.3;
}

.with-task {
  background: #211736;
  bottom: 3px;
  transition: 0.2s;
  transition-delay: calc(var(--i) * 0.005s);
  opacity: 0.5;
}
</style>
