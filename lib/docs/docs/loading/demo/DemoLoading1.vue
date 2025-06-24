<script setup lang="ts">
const visible = ref(false)

const openLoading = () => {
  visible.value = true
  setTimeout(() => {
    visible.value = false
    LewMessage.success('Loading complete.')
  }, 2000)
}
</script>

<template>
  <lew-flex v-loading="{ visible }" class="demo-card" y="start" x="start">
    <lew-button @click="openLoading">Click to open loading</lew-button>
  </lew-flex>
</template>

<style lang="scss" scoped>
.demo-card {
  width: 100%;
  height: 500px;
  border: 2px solid var(--lew-bgcolor-5);
  background-color: var(--lew-bgcolor-0);
  overflow: hidden;
  background-image: linear-gradient(var(--lew-bgcolor-5) 1px, transparent 1px),
    linear-gradient(90deg, var(--lew-bgcolor-5) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: center center;
  padding: 20px;
  box-sizing: border-box;
}
</style>
