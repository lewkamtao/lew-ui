<script setup lang="ts">
import { schools } from '@/lib/data'

const schoolsOptions = schools.map((e) => {
  return { label: e, value: e }
})
const options = ref(schoolsOptions)

const value = ref('')
</script>

<template>
  <lew-flex style="width: 320px" direction="y">
    <lew-select v-model="value" :options="options" placeholder="可清空的" clearable />
    <lew-select v-model="value" :options="options" placeholder="只读" readonly />
    <lew-select v-model="value" :options="options" placeholder="禁用" disabled />
  </lew-flex>
</template>
