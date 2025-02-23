<script setup lang="ts">
const value = ref('2025-02-25')

const change = (e: any) => {
  LewMessage.info(e.date)
}
</script>

<template>
  <lew-date-picker
    v-model="value"
    placeholder="禁用"
    disabled
    value-format="YYYY 年 MM 月 DD 日"
    clearable
    @change="change"
  />
</template>
