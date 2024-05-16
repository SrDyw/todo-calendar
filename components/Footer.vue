<script setup>
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const appVersion = config.public.appVersion;

console.log(appVersion);
</script>

<template>
  <div class="app-info">
    <div class="left-side">
      <p>Created by</p>
      <a
        class="autor-info flex items-center justify-start gap-4"
        href="https://github.com/SrDyw"
        target="_blank"
      >
        <UAvatar
          size="sm"
          src="https://avatars.githubusercontent.com/u/96890386?v=4"
          alt="Avatar"
        />
        <p class="font-bold">Dayniel Martinez</p>
      </a>
    </div>
    <div class="right-side">
      {{ appVersion }}
    </div>
  </div>
</template>

<style scoped>
.app-info {
  position: absolute;
  width: 100%;
  bottom: 0;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-inline: 10px;
  padding-block: 5px;
}

.right-side {
  display: flex;
  justify-content: end;
  align-items: flex-end;
  font-weight: bold;
}

@media (max-height: 600px) {
  .app-info {
    font-size: 0.75rem;
  }
}
</style>
