<script setup lang="ts">
const value = ref(false)
const change = (e: boolean) => {
  console.log(e)
}
</script>

<template>
  <lew-switch v-model="value" @change="change" />
</template>
