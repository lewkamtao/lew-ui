<script setup lang="ts">
import { SelectOptions } from 'lew-ui';
const options = ref<SelectOptions[]>([
  { label: 'BMW', value: 'bmw' },
  { label: 'Mercedes-Benz', value: 'mercedes' },
  { label: 'Audi', value: 'audi' },
  { label: 'Porsche', value: 'porsche' },
  { label: 'Ferrari', value: 'ferrari' },
  { label: 'Lamborghini', value: 'lamborghini' },
]);
const value = ref('porsche');
</script>

<template>
  <lew-select
    style="width: 320px"
    v-model="value"
    disabled
    placeholder="Select brand"
    :options="options"
  />
</template>
