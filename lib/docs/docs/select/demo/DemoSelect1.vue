<script setup lang="ts">
import { SelectOptions } from 'lew-ui'
const options = ref<SelectOptions[]>([])

const value = ref('testValue')
const label = ref('')
setTimeout(() => {
  label.value = '菜市场'
  options.value = [
    { label: '标准配送', value: 'standard' },
    { label: '快速配送', value: 'express' },
    { label: '次日达', value: 'nextDay' },
    { label: '同城急送', value: 'sameDay' }
  ]
}, 500)
</script>

<template>
  <lew-flex style="width: 320px" direction="y">
    <lew-select
      v-model="value"
      :defaultValue="label"
      clearable
      size="small"
      placeholder="选择配送方式"
      :options="options"
    />
    <lew-select
      v-model="value"
      clearable
      size="medium"
      placeholder="选择配送方式"
      :options="options"
    />
    <lew-select
      v-model="value"
      clearable
      size="large"
      placeholder="选择配送方式"
      :options="options"
    />
  </lew-flex>
</template>
