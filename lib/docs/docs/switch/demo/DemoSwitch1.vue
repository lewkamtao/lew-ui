<script setup lang="ts">
const value = ref(false)
const change = (e: boolean) => {
  console.log(e)
}
</script>

<template>
  <lew-flex x="start" y="end">
    <lew-switch size="small" v-model="value" @change="change" />
    <lew-switch size="medium" v-model="value" @change="change" />
    <lew-switch size="large" v-model="value" @change="change" />
  </lew-flex>
</template>
