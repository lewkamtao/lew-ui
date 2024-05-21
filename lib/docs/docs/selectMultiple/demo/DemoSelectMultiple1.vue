<script setup lang="ts">
import { schools } from '@/lib/data'

const schoolsOptions = schools.map((e, i) => {
  return { label: e, value: i + 1 }
})

const options = ref(schoolsOptions)

const value = ref([])
</script>

<template>
  <lew-flex style="width: 320px" direction="y">
    <lew-select-multiple
      v-model="value"
      size="small"
      :options="options"
      placeholder="小"
      clearable
    />
    <lew-select-multiple
      v-model="value"
      valueLayout="tag"
      :options="options"
      placeholder="中"
      clearable
    />
    <lew-select-multiple
      v-model="value"
      size="large"
      :options="options"
      placeholder="大"
      clearable
    />
  </lew-flex>
</template>
