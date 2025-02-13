<script setup lang="ts">
const fruitOptions = ref([
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Grape', value: 'grape' }
])

const selectedFruits = ref(['apple', 'banana'])

const handleFruitChange = (selectedValues: string[]) => {
  console.log('选中的水果:', selectedValues)
}
</script>

<template>
  <lew-checkbox-group
    v-model="selectedFruits"
    readonly
    :options="fruitOptions"
    @change="handleFruitChange"
  />
</template>
