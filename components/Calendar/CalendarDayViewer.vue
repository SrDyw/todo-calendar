<script setup>
import { ref, onMounted } from "vue";
import { useUtils } from "~/composables/useUtils";
import { months } from "~/constants";

const props = defineProps({
  data: Object,
});
const { getDayPrefix } = useUtils();
const prefix = getDayPrefix(props.data?.dayNumber);
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
}

.picker-wrapper .header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bolder;
  padding: 20px;
  flex-direction: column;
}

.picker-wrapper .header h2 {
  margin-bottom: 10px;
}

.day-basic-info {
  border: 1px solid #ffffff23;
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
</style>
