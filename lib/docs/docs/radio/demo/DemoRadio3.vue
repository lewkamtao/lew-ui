<script setup lang="ts">
const clothingBrandOptions = ref([
  { label: 'Nike', value: 'nike' },
  { label: 'Adidas', value: 'adidas' },
  { label: 'Puma', value: 'puma' },
  { label: 'Under Armour', value: 'under_armour' },
  { label: 'Reebok', value: 'reebok' },
]);

const selectedBrand = ref('');
</script>

<template>
  <lew-radio-group
    v-model="selectedBrand"
    block
    :iconable="false"
    :options="clothingBrandOptions"
  />
</template>
