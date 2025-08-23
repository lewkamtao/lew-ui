<script setup lang="ts">
const value = ref('')

function change(e: any) {
  console.log(e)
}
</script>

<template>
  <lew-date-picker v-model="value" width="300px" @change="change" />
</template>
