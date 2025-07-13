<script setup lang="ts">
const v = ref('Selecting text after gathering')
</script>

<template>
    <lew-textarea width="300px" v-model="v" select-by-focus />
</template>
