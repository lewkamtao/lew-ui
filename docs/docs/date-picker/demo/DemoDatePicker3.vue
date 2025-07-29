<script setup lang="ts">
const value = ref('')

function change(e: any) {
  LewMessage.info(e.date)
}
</script>

<template>
  <lew-date-picker
    v-model="value"
    value-format="YYYY 年 MM 月 DD 日"
    clearable
    @change="change"
  />
</template>
