<template>
    <div class="pokeball w-20 aspect-[1] m-4">
        <img src="/pokeball.png" alt="" class="w-full object-cover">
    </div>
</template>

<style scoped>
    .pokeball {
        animation: rotate  3s ease-in-out infinite;
    }
    @keyframes rotate {
        0%,100% {
            rotate:-15deg;
        }
        50% {
            rotate: 15deg;
        }
    }
</style>