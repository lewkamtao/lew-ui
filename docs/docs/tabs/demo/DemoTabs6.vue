<script setup lang="ts">
interface TabOption {
  label: string
  value: string
  disabled?: boolean
}

// 主题：Luxury Brands
const options: TabOption[] = [
  { label: 'Louis Vuitton', value: 'louis_vuitton' },
  { label: 'Chanel', value: 'chanel' },
  { label: 'Gucci', value: 'gucci' },
  { label: 'Hermès', value: 'hermes', disabled: true },
  { label: 'Prada', value: 'prada' },
  { label: 'Dior', value: 'dior', disabled: true },
  { label: 'Rolex', value: 'rolex' },
  { label: 'Cartier', value: 'cartier', disabled: true },
  { label: 'Versace', value: 'versace' },
]

const modelValue = ref('gucci')
</script>

<template>
  <lew-tabs v-model="modelValue" width="auto" :options="options" />
</template>
