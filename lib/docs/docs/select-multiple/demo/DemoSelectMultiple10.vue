<script setup lang="ts">
import { LewSelectMultiple } from 'lew-ui'

const selectValue = ref([])

// 模拟表单方法
const formMethods = {
  async loadProductOptions() {
    // 模拟网络请求延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return [
      { label: 'iPhone 15', value: 'iphone15' },
      { label: 'MacBook Pro', value: 'macbook-pro' },
      { label: 'iPad Air', value: 'ipad-air' },
      { label: 'Apple Watch', value: 'apple-watch' },
      { label: 'AirPods Pro', value: 'airpods-pro' },
      { label: 'iMac', value: 'imac' },
    ]
  },
}

// 提供表单方法给子组件
provide('formMethods', formMethods)
</script>

<template>
  <div class="demo-select-multiple">
    <lew-select-multiple
      v-model="selectValue"
      init-options-method-id="loadProductOptions"
      placeholder="请选择产品"
      width="300px"
      searchable
      value-layout="tag"
    />
    <div class="demo-result">选中值: {{ selectValue }}</div>
  </div>
</template>

<style scoped>
.demo-select-multiple {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-result {
  font-size: 14px;
  color: #666;
}
</style>
