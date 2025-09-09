<script setup lang="ts">
import type { LewSelectOption } from 'lew-ui'

const options = ref<LewSelectOption[]>([
  { label: 'Facial Cleanser', value: 'cleanser' },
  { label: 'Moisturizer', value: 'moisturizer' },
  { label: 'Sunscreen', value: 'sunscreen' },
  { label: 'Face Mask', value: 'mask' },
  { label: 'Eye Cream', value: 'eyeCream' },
  { label: 'Serum', value: 'serum' },
])
const value = ref('mask')
</script>

<template>
  <lew-select
    v-model="value"
    style="width: 320px"
    readonly
    placeholder="Select product"
    :options="options"
  />
</template>
