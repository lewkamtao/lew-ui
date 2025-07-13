<script lang="ts" setup>
const color = ref('#409EFF')
</script>

<template>
    <lew-flex direction="column" x="start" style="width: 300px">
        <lew-color-picker v-model="color" width="150px" />
        <lew-color-picker v-model="color" width="200px" />
        <lew-color-picker v-model="color" width="300px" />
    </lew-flex>
</template>
