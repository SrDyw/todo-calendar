<script setup>
import useEvents from "~/composables/useEvents";

const props = defineProps({
  data: Object,
  payload: Object,
});

const { data, payload } = toRefs(props);

const emit = defineEmits(["onEventChange"]);

const updateTodoStatus = () => {
  const todo = data.value;
  const todoList = payload.value.activity.todoList;

  const { modifyEvent } = useEvents();

  const todoListClone = [...todoList];
  for (let i = 0; i < todoListClone.length; i++) {
    if (todoListClone[i].initialHour == todo.initialHour) {
      todoListClone[i] = todo;
      break;
    }
  }

  modifyEvent({
    payload: props.payload,
    todoData: todo,
  }).then(() => {
    todoList.value = todoListClone;

    emit("onEventChange", {
      ...payload.value,
      activity: {
        ...payload.value.activity,
        todoList: todoListClone,
      },
    });
  });
};
</script>

<template>
  <div class="todo-list-hour" v-if="data">
    <UCheckbox
      v-model="data.done"
      name="notifications"
      label=""
      @click="updateTodoStatus"
    />
    <div class="todo-content" :class="{ 'is-crossed': data.done }">
      <span class="cross-out" v-if="data.done"></span>
      <p class="todo-info">
        <span>
          {{ data.initialHour }}
        </span>
        {{ data.tag }}
      </p>
      <span class="todo-timeline"></span>
      <span>{{ data.endHour }}</span>
    </div>
  </div>
</template>

<style scoped>
.todo-list-hour {
  display: flex;
  justify-content: center;
  align-items: center;
}
.todo-content {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  font-size: 0.9rem;
  font-weight: bold;
  width: 100%;
  position: relative;
}

.todo-list-hour .todo-timeline {
  height: 2px;
  width: 100%;
  border-top: 2px dashed white;
  position: relative;
  top: 2px;
}

.todo-list-hour .todo-timeline::after {
  content: "";
  position: absolute;
  height: 4px;
  width: 40px;
  background: #0c1222;
  top: -2px;
  left: 0;
  -webkit-mask-image: linear-gradient(to right, black, transparent);
  mask-image: linear-gradient(to right, black, transparent);
}

.todo-list-hour .todo-timeline::before {
  content: "";
  position: absolute;
  height: 4px;
  width: 40px;
  background: #0c1222;
  top: -2px;
  right: 0;
  -webkit-mask-image: linear-gradient(to left, black, transparent);
  mask-image: linear-gradient(to left, black, transparent);
}

.todo-list-hour span {
  font-weight: 400;
  opacity: 0.75;
}
.is-crossed {
  opacity: 0.3;
}
.cross-out {
  position: absolute;
  width: 98%;
  border-top: 2px solid white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 50%);
  z-index: 1;
}
</style>
