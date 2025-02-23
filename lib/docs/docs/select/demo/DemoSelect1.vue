<template>
  <div style="width: 500px; height: 400px">
    <VirtList itemKey="id" :list="list" :minSize="20">
      <template #default="{ itemData, index }">
        <label class="lew-select-demo-1-item">
          <input type="checkbox" />
          {{ index }} - {{ itemData.id }} - {{ itemData.text }}
        </label>
      </template>
    </VirtList>
  </div>
</template>

<script setup lang="ts">
import { VirtList } from 'vue-virt-list'
const list = new Array(1000).fill(0).map((item, index) => ({
  id: index,
  text: `text${index}`
}))
</script>

<style scoped lang="scss">
.lew-select-demo-1 {
  width: 500px;
  height: 400px;

  &-item {
    padding: 10px;
    display: flex;
    align-items: center;
    height: 30px;
    border-bottom: 1px solid #ccc;
  }
}
</style>
