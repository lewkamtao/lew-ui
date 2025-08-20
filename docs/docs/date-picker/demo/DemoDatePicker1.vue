<script setup lang="ts">
const value = ref('')

function change(e: any) {
  console.log(e)
}
</script>

<template>
  <lew-date-picker v-model="value" @change="change" />
</template>
