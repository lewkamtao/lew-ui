<script setup lang="ts">
import { schools } from '@/lib/data'

const schoolsOptions = schools.map((e) => {
  return { label: e, value: e }
})

const value = ref('浙江大学')
</script>

<template>
  <lew-select
    v-model="value"
    searchable
    :default-value="value"
    :options="schoolsOptions"
    clearable
    placeholder="Default Filter"
  />
</template>
