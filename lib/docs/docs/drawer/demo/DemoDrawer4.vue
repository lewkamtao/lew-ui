<script setup lang="ts">
const visible = ref(false)
const open = (): void => {
  visible.value = true
}
</script>
<template>
  <lew-flex gap="20" x="start">
    <lew-drawer title="新建商品" close-by-esc v-model:visible="visible" position="right">
    </lew-drawer>
    <lew-button text="右边" @click="open" />
  </lew-flex>
</template>
