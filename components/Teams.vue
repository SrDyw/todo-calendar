<template>
  <section id="teams">
    <h2
      class="text-center text-3xl font-bold flex justify-center items-center gap-4"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            d="M14.5 12a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 5 0m7.5 0c0 5.52-4.48 10-10 10S2 17.52 2 12S6.48 2 12 2s10 4.48 10 10m-2 0h-4c0-2.21-1.79-4-4-4s-4 1.79-4 4H4c0 4.41 3.59 8 8 8s8-3.59 8-8"
          />
        </svg>
      </span>
      Teams
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            d="M14.5 12a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 5 0m7.5 0c0 5.52-4.48 10-10 10S2 17.52 2 12S6.48 2 12 2s10 4.48 10 10m-2 0h-4c0-2.21-1.79-4-4-4s-4 1.79-4 4H4c0 4.41 3.59 8 8 8s8-3.59 8-8"
          />
        </svg>
      </span>
    </h2>
  </section>
</template>

<style scoped>
section {
  background-color: #111626;
  min-height: 100vh;
  position: relative;
}
section::after {
  content: "";
  width: 100%;
  height: 20px;
  position: absolute;
  left: 0;
  clip-path: polygon(0 0, 0 100%, 100% 100%);
  bottom: 100%;
  background: #111626;
}
section > h2 {
  letter-spacing: 3px;
}
</style>
