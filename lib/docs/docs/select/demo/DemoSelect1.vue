<script setup lang="ts">
import { SelectOptions } from 'lew-ui';
const options = ref<SelectOptions[]>([
  { label: 'Standard Delivery', value: 'standard' },
  { label: 'Express Delivery', value: 'express' },
  { label: 'Next Day Delivery', value: 'nextDay' },
  { label: 'Same Day Delivery', value: 'sameDay' },
]);

const value = ref('');
</script>

<template>
  <lew-select
    v-model="value"
    clearable
    placeholder="Select delivery method"
    :options="options"
  />
</template>
