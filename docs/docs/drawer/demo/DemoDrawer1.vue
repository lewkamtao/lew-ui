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
    <lew-drawer v-model:visible="visible1" title="New Product" position="right">
      <lew-image
        preview-group-key="cover"
        object-position="top"
        :width="150"
        :height="150"
        src="https://app.tngeek.com/api_sso/open/file/b4c64ae_cat-8321993_1280.webp"
      />
    </lew-drawer>
    <lew-button text="Right" @click="open1" />
    <lew-drawer
      v-model:visible="visible2"
      title="New Product"
      position="bottom"
    />
    <lew-button text="Bottom" @click="open2" />
    <lew-drawer
      v-model:visible="visible3"
      title="New Product"
      position="left"
    />
    <lew-button text="Left" @click="open3" />
    <lew-drawer v-model:visible="visible4" title="New Product" position="top" />
    <lew-button text="Top" @click="open4" />
  </lew-flex>
</template>

<style lang="scss" scoped>
.title {
  padding: 10px;
  background-color: var(--lew-bgcolor-3);
  border-radius: 5px;
  color: #f93;
}
</style>
