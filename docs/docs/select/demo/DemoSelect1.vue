<script setup lang="ts">
import type { LewSelectOption } from 'lew-ui'

const options = ref<LewSelectOption[]>([
  {
    label: 'Standard Delivery',
    value: 'standard',
  },
  { label: 'Express Delivery', value: 'express' },
  { label: 'Next Day Delivery', value: 'nextDay' },
  { label: 'Same Day Delivery', value: 'sameDay' },
])

const value = ref()
</script>

<template>
  <lew-select
    v-model="value"
    width="300px"
    clearable
    searchable
    placeholder="Select delivery method"
    :options="options"
  />
</template>
