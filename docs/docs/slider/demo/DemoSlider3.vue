<script setup lang="ts">
const v = ref(40)
</script>

<template>
  <lew-slider
    v-model="v"
    style="width: 700px"
    step="5"
    max="70"
    min="30"
    :options="[
      {
        label: '低',
        value: 0,
      },
      {
        label: '中',
        value: 50,
      },
      {
        label: '高',
        value: 100,
      },
    ]"
  />
</template>
