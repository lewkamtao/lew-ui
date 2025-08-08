<script setup lang="ts">
import type { LewSelectOption } from 'lew-ui'

const options = ref<LewSelectOption[]>([
  { label: 'BMW', value: 'bmw' },
  { label: 'Mercedes-Benz', value: 'mercedes' },
  { label: 'Audi', value: 'audi' },
  { label: 'Porsche', value: 'porsche' },
  { label: 'Ferrari', value: 'ferrari' },
  { label: 'Lamborghini', value: 'lamborghini' },
])
const value = ref('porsche')
</script>

<template>
  <lew-select
    v-model="value"
    style="width: 320px"
    disabled
    placeholder="Select brand"
    :options="options"
  />
</template>
