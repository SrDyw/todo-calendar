<script setup>
useHead({
  title: "Todo Calendar - List your Activities",
  meta: [
    {
      name: "description",
      content:
        "In this app you can create a orginized task list through a calendar for keeping a better and more clean schedule",
    },
  ],
});
</script>

<template>
  <div class="content">
    <Calendar />
  </div>
</template>

<style>
.content {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  /* padding-top: 70px; */
  background: #363c4f;
}
</style>
