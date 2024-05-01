<script setup>
import { navsize } from "../global.config";
import { onMounted, onUnmounted, ref } from "vue";

const data = 60;
const isScrolled = ref(false);
const lastScrollPosition = ref(0);

const handleScroll = () => {
  isScrolled.value = window.scrollY > navsize;
  const mainNav = document.querySelector(".main-nav");
  const scrollingDown = window.scrollY  - lastScrollPosition.value > 0;
  lastScrollPosition.value = window.scrollY;

  // console.log(scrollingDown);
  if (window.scrollY > navsize) {
    // Add fixed class to make it sticky
    mainNav.classList.add("scrolled");
  } else {
    mainNav.classList.remove("scrolled");
    
  }

  if (scrollingDown) {
    // Add fixed class to make it sticky
    mainNav.classList.add("scrolled-position");
  } else {
    mainNav.classList.remove("scrolled-position");
    
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<template>
  <header
    :style="{ height: `${data}px` }"
    class="main-nav fixed w-full flex justify-start items-center z-50"
  >
    <ul class="flex gap-5 p-5 text-white font-bold justify-center items-center">
      <li>
        <a href="#landing">Home</a>
      </li>
      <li>
        <a href="#session">Session</a>
      </li>
      <li>
        <a href="#teams">Teams</a>
      </li>
    </ul>
    <div class="trigger"></div>
  </header>
  <div :style="{ height: `${data}px` }" class="nav-fill"></div>
</template>

<style scoped>
header {
  background: linear-gradient(45deg, #111626, #000000);
  top: 0;
  /* background: #111626; */
  /* backdrop-filter: blur(10px); */
  transition: .2s ease-in-out;
}

.scrolled{
  background: #2e5ee2;
}

.scrolled-position {
  top: -100px;
}
</style>
