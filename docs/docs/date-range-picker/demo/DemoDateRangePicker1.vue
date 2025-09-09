<script setup lang="ts">
const dateRangeValue = ref<{ start?: string, end?: string }>({})
</script>

<template>
  <lew-flex style="width: 275px" direction="y" x="start">
    <lew-date-range-picker v-model="dateRangeValue" size="small" />
    <lew-date-range-picker v-model="dateRangeValue" size="medium" />
    <lew-date-range-picker v-model="dateRangeValue" size="large" />
  </lew-flex>
</template>
