<script setup lang="ts">
const options = ref([
  { label: '标准配送', value: 'standard' },
  { label: '快速配送', value: 'express' },
  { label: '次日达', value: 'nextDay' },
  { label: '同城急送', value: 'sameDay' }
])

const selectedShipping = ref('')
</script>

<template>
  <lew-flex style="width: 320px" direction="y">
    <lew-select
      v-model="selectedShipping"
      clearable
      size="small"
      placeholder="选择配送方式"
      :options="options"
    />
    <lew-select
      v-model="selectedShipping"
      clearable
      size="medium"
      placeholder="选择配送方式"
      :options="options"
    />
    <lew-select
      v-model="selectedShipping"
      clearable
      size="large"
      placeholder="选择配送方式"
      :options="options"
    />
  </lew-flex>
</template>
