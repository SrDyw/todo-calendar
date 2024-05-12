<script setup>
import useEvents from "~/composables/useEvents";

const isOpen = ref(false);
const isLoading = ref(false);
const state = reactive({
  title: undefined,
  description: undefined,
});

const { registerEvent } = useEvents();
const toast = useToast();
const emit = defineEmits(["onCreatedEvent"]);

const onCreatedEvent = (event) => {
  emit("onCreatedEvent", {
    event,
  });
};

async function onSubmit(event) {
  // Do something with data
  isLoading.value = true;
  const data = await registerEvent(event.data);
  isLoading.value = false;
  isOpen.value = false;
  toast.add({ title: "Event created successfuly!", timeout: 1600 });
  onCreatedEvent(data);
}
</script>

<template>
  <UButton
    icon="i-heroicons-pencil-square"
    :label="`Create one`"
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
            Create new event
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
      <UForm
        :state="state"
        class="space-y-4 flex flex-col gap-4 items-center justify-between"
        @submit="onSubmit"
      >
        <UFormGroup label="Title" class="w-full" name="title">
          <UInput
            size="sm"
            color="white"
            :trailing="false"
            placeholder="Event name..."
            class="w-full"
            v-model="state.title"
          />
          <!-- <template #help>
            A title for your event
            <UIcon name="i-heroicons-information-circle" />
          </template> -->
        </UFormGroup>
        <UFormGroup label="Description" class="w-full" name="description">
          <UTextarea
            class="w-full"
            color="white"
            variant="outline"
            placeholder="Event description..."
            v-model="state.description"
          />
          <!-- <template #help>
            A general description for today's event
            <UIcon name="i-heroicons-information-circle" />
          </template> -->
        </UFormGroup>
        <UButton
          icon="i-heroicons-pencil-square"
          :label="`Create event`"
          type="submit"
          :loading="isLoading"
        />
      </UForm>
      <Placeholder class="h-full" />
    </UCard>
  </UModal>
</template>
