<script setup lang="ts">
const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
function open1(): void {
  visible1.value = true
}
function open2(): void {
  visible2.value = true
}
function open3(): void {
  visible3.value = true
}
function open4(): void {
  visible4.value = true
}
</script>

<template>
  <lew-flex gap="20" x="start">
    <lew-drawer v-model:visible="visible1" position="right" />
    <lew-button text="右边" @click="open1" />

    <lew-drawer v-model:visible="visible2" position="bottom" />
    <lew-button text="下边" @click="open2" />

    <lew-drawer v-model:visible="visible3" position="left" />
    <lew-button text="左边" @click="open3" />

    <lew-drawer v-model:visible="visible4" position="top" />
    <lew-button text="上边" @click="open4" />
  </lew-flex>
</template>
