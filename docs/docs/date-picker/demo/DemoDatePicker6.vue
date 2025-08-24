<script setup lang="ts">
const value = ref('2025-02-25')
</script>

<template>
  <lew-date-picker
    v-model="value"
    placeholder="禁用"
    disabled
    width="300px"
    value-format="YYYY 年 MM 月 DD 日"
    clearable
  />
</template>
