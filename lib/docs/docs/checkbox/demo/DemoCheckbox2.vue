<script setup lang="ts">
const productOptions = ref([
  { label: '智能手机', value: 'smartphone' },
  { label: '平板电脑', value: 'tablet' },
  { label: '笔记本电脑', value: 'laptop' },
  { label: '智能手表', value: 'smartwatch' }
])

const selectedProducts = ref([])
</script>

<template>
  <lew-checkbox-group v-model="selectedProducts" direction="y" :options="productOptions" />
</template>
