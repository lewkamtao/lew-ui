<script setup lang="ts">
const fruitOptions = ref([
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
])

const selectedFruits = ref([])
</script>

<template>
  <lew-flex direction="y" :gap="10">
    <lew-checkbox-group v-model="selectedFruits" size="small" :options="fruitOptions" />
    <lew-checkbox-group v-model="selectedFruits" size="medium" :options="fruitOptions" />
    <lew-checkbox-group v-model="selectedFruits" size="large" :options="fruitOptions" />
  </lew-flex>
</template>
