<script setup>
const isOpen = ref(false);
</script>

<template>
  <UButton
    @click="isOpen = true"
    class="flex justify-center items-center w-12 h-12 toggle-btn"
    variant="ghost"
    icon="i-heroicons-bars-3"
  >
  </UButton>
  <div>
    <USlideover v-model="isOpen">
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Todo Calendar
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
    </USlideover>
  </div>
</template>

<style scoped>
@media (min-width: 768px) {
  .toggle-btn {
    position: fixed;
    top: 10px;
    right: 10px;
  }
}

@media (max-width: 768px) {
  .toggle-btn {
    position: fixed;
    top:50%;
    transform: translateY(-50%);
    right: -30px;
    border-radius: 50%;
    border: 5px solid #363c4f;
    width: 75px !important;
    height: 75px;
    aspect-ratio: 1;
    background: white;
  }
}
</style>
