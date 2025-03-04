<script setup lang="ts">
interface TabOption {
  label: string
  value: string
}

const options: TabOption[] = [
  { label: 'Google', value: 'google' },
  { label: 'Amazon', value: 'amazon' },
  { label: 'Microsoft', value: 'microsoft' },
  { label: 'Apple', value: 'apple' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Tesla', value: 'tesla' },
  { label: 'Intel', value: 'intel' },
  { label: 'Nvidia', value: 'nvidia' }
]

const modelValue = ref('microsoft')
</script>

<template>
  <lew-tabs v-model="modelValue" width="auto" round :options="options" />
</template>
