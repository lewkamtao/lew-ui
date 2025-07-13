<script setup lang="ts">
let key = ref(0)
</script>

<template>
    <lew-image
        :key="key"
        :width="150"
        :height="150"
        loading
        :src="`https://cdn.pixabay.com/photo/2020/07/23/14/51/cat-paw-5431547_1280.jpg?key=${key}`"
    />
</template>
