<script setup lang="ts">
const beautyBrandOptions = ref([
  { label: 'Chanel', value: 'chanel' },
  { label: 'Dior', value: 'dior' },
  { label: 'MAC', value: 'mac' },
  { label: 'Estée Lauder', value: 'estee_lauder' },
  { label: 'Lancôme', value: 'lancome' },
]);

const selectedBrand = ref('chanel');
</script>

<template>
  <lew-radio-group
    v-model="selectedBrand"
    block
    disabled
    :options="beautyBrandOptions"
  />
</template>
