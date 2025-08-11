<script setup lang="ts">
const selectValue = ref([])

const formMethods = {
  async loadProductOptions() {
    await new Promise(resolve => setTimeout(resolve, 1000))
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

provide('formMethods', formMethods)
</script>

<template>
  <div class="demo-select-multiple">
    <LewSelectMultiple
      v-model="selectValue"
      init-method-id="loadProductOptions"
      placeholder="Select a product"
      width="300px"
      searchable
      value-layout="tag"
    />
    <div class="demo-result">
      Selected value: {{ selectValue }}
    </div>
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
