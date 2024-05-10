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
      <h2>{{ data.dayNumber }}{{ prefix }} of {{months[data.month]}}</h2>
    </div>
  </div>
</template>

<style scoped>
.picker-wrapper {
  background: #242938;
  width: 100%;
  min-height: 400px;
  margin: auto;
  border-radius: 10px;
}

.picker-wrapper .header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bolder;
  padding: 10px;
}
</style>
