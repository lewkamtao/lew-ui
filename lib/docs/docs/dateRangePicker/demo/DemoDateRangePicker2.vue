<script setup lang="ts">
const dateRangeValue = ref({})
</script>

<template>
  <lew-flex style="width: 275px" direction="y" x="start">
    <lew-date-range-picker v-model="dateRangeValue" clearable />
  </lew-flex>
</template>
