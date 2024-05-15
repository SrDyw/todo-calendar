<script setup>
import useEvents from "~/composables/useEvents";

const props = defineProps({
  data: Object,
  onClickOnEventData: Object,
});

const { onClickOnEventData } = toRefs(props);

const isOpen = ref(false);
const isLoading = ref(false);


const hours = [];
for (let i = 0; i < 24; i++) hours.push(i.toString());
const state = reactive({
  tag: undefined,
  initialHour: hours[0],
  endHour: hours[1],
});


const initialHourFormated = ref('0');

const { modifyEvent } = useEvents();
const toast = useToast();
const emit = defineEmits(["onModifiedEvent"]);

const mode = ref("create"); // or 'edit'


watch(onClickOnEventData, (a, b) => {
  isOpen.value = true;
  const ihour = Number.parseInt(
    onClickOnEventData.value.payload.initialHour.split(":")[0]
  );

  state.tag = onClickOnEventData.value.payload.tag;
  state.initialHour = ihour;
  state.endHour = Math.min(ihour + 1, 23);
  mode.value = !state.tag ? "create" : "edit";

  initialHourFormated.value = ihour + "";
});

const onModifiedEvent = (event) => {
  emit("onModifiedEvent", {
    event,
  });
};

async function onSubmit(event) {
  isLoading.value = true;
  const response = await modifyEvent({
    todoData: {
      ...event.data,
      initialHour: event.data.initialHour.toString().padStart(2, "0") + ":00",
      endHour: event.data.endHour.toString().padStart(2, "0") + ":00",
      done: false
    },
    payload: props.data,
  });
  toast.add({ title: `Acitivity ${mode.value =='create' ? 'created' : 'modified'} successfuly`, timeout: 2000 });
  isLoading.value = false;
  isOpen.value = false;

  onModifiedEvent(response);
}

watch(initialHourFormated, (newVal) => state.initialHour = parseInt(newVal))

const initialHourSelected = ref(hours[0]);
const endHourSelected = ref(hours[1]);
</script>

<template>
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
            {{ mode == "create" ? "Create new activity" : "Modify activity" }}
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
      <UForm
        :state="state"
        class="space-y-4 flex flex-col gap-4 items-center justify-between"
        @submit="onSubmit"
      >
        <UFormGroup
          v-slot="{ error }"
          label="Tag"
          class="w-full"
          name="tag"
          :error="state.tag?.length > 25 && 'Your name is too long'"
          required
        >
          <UInput
            size="sm"
            color="white"
            :trailing="false"
            placeholder="Activity name..."
            class="w-full"
            v-model="state.tag"
            required
            help="This is a nice tag!"
            :trailing-icon="
              error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined
            "
          />
        </UFormGroup>
        <div class="hours flex gap-4 w-full">
          <UFormGroup label="Initial Hour" class="w-full" name="initialHour">
            <USelectMenu
              v-model="initialHourFormated"
              :options="hours"
              disabled
              trailing-icon=""
            />
          </UFormGroup>
          <UFormGroup
            label="End Hour"
            class="w-full"
            name="endHour"
            v-slot="{ error }"
            :error="
              state?.initialHour > state?.endHour && 'The hour range is invalid'
            "
          >
            <USelectMenu
              v-model="state.endHour"
              :options="hours"
              :trailing-icon="
                error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined
              "
            />
          </UFormGroup>
        </div>
        <UButton
          icon="i-heroicons-pencil-square"
          :label="mode == 'create' ? `Create activity` : 'Apply changes'"
          type="submit"
          :loading="isLoading"
          :disabled="
            state.tag?.length > 25 ||
            state?.initialHour > state?.endHour ||
            isLoading
          "
        />
      </UForm>
    </UCard>
  </UModal>
</template>
