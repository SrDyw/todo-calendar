<script setup>
import useEvents from "~/composables/useEvents";
import { useUtils } from "~/composables/useUtils";

const props = defineProps({
  data: Object,
  payload: Object,
});

const isOpen = ref(false);
const isLoading = ref(false);

const { deleteEvent, removeActivity } = useEvents();
const toast = useToast();
const emit = defineEmits(["onRemoveActivity"]);

const activityToRemoveIndex = ref(-1);
const { getHour } = useUtils();

const onRemoveEvent = (event) => {
  emit("onRemoveActivity", {
    event,
  });
};

async function onClickDeleteButton(event) {
  // Do something with data
  isLoading.value = true;
  const data = await removeActivity({
    payload: props.payload,
    todoData: props.data,
  });
  isLoading.value = false;
  isOpen.value = false;
  toast.add({ title: "Activity removed successfuly!", timeout: 2000 });

  onRemoveEvent(data);
}
</script>

<template>
  <UButton
    color="orange"
    variant="ghost"
    icon="i-heroicons-trash"
    @click="isOpen = true"
  />

  <UModal v-model="isOpen">
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
            Delete activity {{ data?.tag }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
            :loading="isLoading"
          />
        </div>
      </template>
      <p>
        Are you sure you want to <span class="text-red-500">delete</span> the
        activity named <span class="font-bold">{{ data?.tag }}</span
        >?
      </p>
      <template #footer>
        <UButton
          :label="`Delete event`"
          color="red"
          class="mr-3"
          @click="onClickDeleteButton"
          :loading="isLoading"
        />
        <UButton
          variant="ghost"
          :label="`Cancel`"
          color="gray"
          @click="isOpen = false"
          :disabled="isLoading"
        />
      </template>

      <Placeholder class="h-full" />
    </UCard>
  </UModal>
</template>
