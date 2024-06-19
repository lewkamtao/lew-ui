<script setup lang="ts">
const value = ref('')

const change = (e: any) => {
  LewMessage.info(e.date)
}
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-date-picker v-model="value" @change="change" />
  </lew-flex>
</template>
