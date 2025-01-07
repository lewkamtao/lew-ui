<script setup lang="ts">
const value = ref('')

const change = (e: any) => {
  LewMessage.info(e.date)
}
</script>

<template>
  <lew-flex style="width: 275px" direction="y" x="start">
    <lew-date-picker v-model="value" size="small" @change="change" />
    <lew-date-picker v-model="value" size="medium" @change="change" />
    <lew-date-picker v-model="value" size="large" @change="change" />
  </lew-flex>
</template>
