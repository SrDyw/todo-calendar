

<template>
  <section id="landing" class="flex flex-col mb-[100px]">
    <!-- Hero -->
    <div class="banner">
      <img src="" alt="" />
    </div>
    <div class="landing-content flex justify-center items-center flex-col px-7">
      <h1 class="font-extrabold text-3xl text-center mb-4">
        The very best Pokemon Teams of the Sesion!
      </h1>
      <p class="text-center body-text text-lg">
        All of the most powerful team that you should know are here!
      </p>
      <Pokeball />
      <a
        href="#teams"
        class="bg-[#2a57c9] w-[200px] text-center p-4 rounded-xl text-xl"
      >
        View Teams!
      </a>
    </div>
  </section>
</template>

<style scoped>
.banner {
  background: linear-gradient(transparent, #111626), url("/banner.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 300px;
}
</style>
