<script setup lang="ts">
interface TabOption {
  label: string
  value: string
}

const options: TabOption[] = [
  { label: 'Nike', value: 'nike' },
  { label: 'Adidas', value: 'adidas' },
  { label: 'Puma', value: 'puma' },
  { label: 'Under Armour', value: 'under_armour' },
  { label: 'Reebok', value: 'reebok' },
]

const value = ref('adidas')
</script>

<template>
  <lew-tabs v-model="value" :options="options" />
</template>
