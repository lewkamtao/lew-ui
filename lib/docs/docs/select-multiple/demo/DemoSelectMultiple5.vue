<script setup lang="ts">
const options = [
  { label: 'Chanel', value: 'chanel' },
  { label: 'Gucci', value: 'gucci' },
  { label: 'Dior', value: 'dior', disabled: true },
  { label: 'Louis Vuitton', value: 'louis_vuitton' },
  { label: 'Prada', value: 'prada' },
  { label: 'Hermès', value: 'hermes', disabled: true },
  { label: 'Burberry', value: 'burberry' },
  { label: 'Versace', value: 'versace' },
  { label: 'Balenciaga', value: 'balenciaga' },
  { label: 'Fendi', value: 'fendi', disabled: true },
];
const value = ref(['chanel', 'gucci', 'louis_vuitton']);
</script>

<template>
  <lew-select-multiple
    v-model="value"
    :options="options"
    placeholder="Select Luxury Brands"
    value-layout="tag"
    readonly
  />
</template>
