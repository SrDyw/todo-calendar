<script setup>
import useEvents from "~/composables/useEvents";

const props = defineProps({
  data: Object,
});

const isOpen = ref(false);
const isLoading = ref(false);

const { deleteEvent } = useEvents();
const toast = useToast();
const emit = defineEmits(["onRemoveEvent"]);

const onRemoveEvent = (event) => {
  emit("onRemoveEvent", {
    event,
  });
};

async function onClickDeleteButton(event) {
  // Do something with data
  isLoading.value = true;
  const data = await deleteEvent({ payload: props.data });
  isLoading.value = false;
  isOpen.value = false;
  toast.add({ title: "Event removed successfuly!", timeout: 2000 });
  onRemoveEvent(data);
}
</script>

<template>
  <UButton
    size="sm"
    color="red"
    variant="solid"
    label=""
    :trailing="false"
    class="absolute right-[5px] top-[5px]"
    @click="isOpen = true"
  >
    <UIcon name="i-heroicons-solid:trash" dynamic />
  </UButton>

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
            Delete event {{ data.activity?.title }}
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
        event named <span class="font-bold">{{ data.activity?.title }}</span
        >?
      </p>
      <template #footer>
        <UButton
          :label="`Delete event`"
          color="red"
          class="mr-3"
          @click="onClickDeleteButton"
          :disabled="isLoading"
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
