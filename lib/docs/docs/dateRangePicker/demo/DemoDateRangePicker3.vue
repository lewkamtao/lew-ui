<script setup lang="ts">
const dateRangeValue = ref({})
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-date-range-picker v-model="dateRangeValue" placeholderStart="只读" readonly clearable />
    <lew-date-range-picker v-model="dateRangeValue" placeholderStart="禁用" disabled clearable />
  </lew-flex>
</template>
