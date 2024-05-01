<script setup>
    const route = useRoute();
</script>


<template>
    <h1>Welcome user number {{$route.params.id}}</h1>
</template>