<script setup lang="ts">
const v = ref([25, 50])
</script>

<template>
  <lew-slider-range
    v-model="v"
    width="500px"
    readonly
    range
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
