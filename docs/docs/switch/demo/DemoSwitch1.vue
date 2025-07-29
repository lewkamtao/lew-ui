<script setup lang="ts">
const value = ref(false)
function change(e: boolean) {
  console.log(e)
}
</script>

<template>
  <lew-flex x="start" y="end">
    <lew-switch v-model="value" size="small" @change="change" />
    <lew-switch v-model="value" size="medium" @change="change" />
    <lew-switch v-model="value" size="large" @change="change" />
  </lew-flex>
</template>
