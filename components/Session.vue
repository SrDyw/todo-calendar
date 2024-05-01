<template>
  <section id="session">
    <h2 class="text-3xl font-extrabold text-center">Pokemon VGC 2024</h2>
    <div class="info flex justify-center items-center flex-col p-4 gap-7">
      <div class="image w-[250px] aspect-[1]">
        <img src="/sesion-logo.png" alt="" class="object-cover w-full" />
      </div>
      <p class="px-6 text-white text-center mb-10 z-10">
        This year Pokémon has been growing a lot. Competitive Pokémon, called
        VGC, is booming thanks to the Twitch Cup that has made it known, Chuso,
        Daz and Sekiam who have explained and broadcast it many times and,
        lately, Movistar KOI signing Riopaser and PokeAlex.
      </p>
    </div>
    <div class="pikaimage">
      <img src="/pikachu.png" alt="" srcset="" />
    </div>
  </section>
</template>

<style scoped>
#session {
  background: #0c2261;
  position: relative;
}
#session::after {
  content: "";
  position: absolute;
  bottom: 100%;
  height: 100px;
  width: 100%;
  transform: translateY(1px);
  background: #0c2261;
  clip-path: polygon(100% 50%, 100% 100%, 0 100%);
}

.pikaimage {
  position: absolute;
  width: 200px;
  height: auto;
  left: 10px;
  bottom: 0
}
.pikaimage img {
  object-fit: cover;
  width: 100%;
  color: black;
  opacity: 0.6;
  mask-image: linear-gradient(black 50%, transparent);
}
</style>
