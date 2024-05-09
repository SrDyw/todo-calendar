<script setup>
import { defineComponent } from "@vue/composition-api";

const props = defineProps({
  day: Number,
  isActive: Boolean,
  isOutMonth: Boolean,
});

</script>

<template>
  <li :class="{ active: isActive, inactive: isOutMonth }">{{ day }}</li>
</template>
