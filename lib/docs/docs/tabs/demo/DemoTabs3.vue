<script setup lang="ts">
interface TabOption {
  label: string;
  value: string;
}

// Start of Selection
const options: TabOption[] = [
  { label: 'Sales', value: 'sales' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Finance', value: 'finance' },
  { label: 'HR', value: 'hr' },
  { label: 'R&D', value: 'rd' },
  { label: 'Support', value: 'customer_service' },
  { label: 'Legal', value: 'legal' },
  { label: 'Procurement', value: 'procurement' },
  { label: 'Production', value: 'production' },
  { label: 'Quality', value: 'quality_control' },
];
const modelValue = ref('hr');
</script>

<template>
  <lew-tabs
    v-model="modelValue"
    style="width: 100%"
    :options="options"
    :itemWidth="120"
  />
</template>
