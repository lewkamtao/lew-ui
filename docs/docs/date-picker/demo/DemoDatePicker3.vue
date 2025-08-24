<script setup lang="ts">
const value = ref('')
</script>

<template>
  <lew-date-picker
    v-model="value"
    width="300px"
    value-format="YYYY 年 MM 月 DD 日"
    clearable
  />
</template>
