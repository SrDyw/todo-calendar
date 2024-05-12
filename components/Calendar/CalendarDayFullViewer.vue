<script setup>
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
</script>

<template>
  <div class="calendar-full-viewer">
    <UModal v-model="isOpen" fullscreen>
      <UCard
        :ui="{
          base: 'h-full flex flex-col',
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
              Event {{ data.activity.title }}
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

        <Placeholder class="h-full" />
      </UCard>
    </UModal>
  </div>
</template>
