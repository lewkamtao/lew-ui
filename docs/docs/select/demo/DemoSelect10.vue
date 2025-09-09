<script setup lang="ts">
import { LewSelect } from 'lew-ui'

const selectValue = ref()

// 模拟表单方法
const formMethods = {
  async loadOptions() {
    await new Promise(resolve => setTimeout(resolve, 3000))
    return [
      { label: 'La Mer', value: 'la_mer' },
      { label: 'La Prairie', value: 'la_prairie' },
      { label: 'SK-II', value: 'sk_ii' },
      { label: 'Estée Lauder', value: 'estee_lauder' },
      { label: 'Lancôme', value: 'lancome' },
      { label: 'Sisley', value: 'sisley' },
      { label: 'Dior', value: 'dior' },
      { label: 'Chanel', value: 'chanel' },
      { label: 'Clé de Peau', value: 'cle_de_peau' },
      { label: 'Guerlain', value: 'guerlain' },
    ]
  },
}

// 提供表单方法给子组件
provide('formMethods', formMethods)
</script>

<template>
  <div class="demo-select">
    <LewSelect
      v-model="selectValue"
      init-method-id="loadOptions"
      placeholder="Select a brand"
      width="300px"
      searchable
    />
    <div class="demo-result">
      选中值: {{ selectValue }}
    </div>
  </div>
</template>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-result {
  font-size: 14px;
  color: #666;
}
</style>
