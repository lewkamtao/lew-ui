<script setup lang="ts">
const applianceFeatures = ref([
  { label: 'Refrigerator', value: 'refrigerator' },
  { label: 'Washing Machine', value: 'washingMachine' },
  { label: 'Microwave', value: 'microwave' },
  { label: 'Air Conditioner', value: 'airConditioner' },
  { label: 'Television', value: 'television' },
])

const selectedFeatures = ref(['refrigerator', 'washingMachine'])

const handleFeatureChange = (selectedValues: string[]) => {
  console.log('Selected appliances:', selectedValues)
}
</script>

<template>
  <lew-checkbox-group
    v-model="selectedFeatures"
    disabled
    :options="applianceFeatures"
    @change="handleFeatureChange"
  />
</template>
