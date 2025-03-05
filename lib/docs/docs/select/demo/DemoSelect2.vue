<script setup lang="ts">
import { schools } from '@/lib/data'

const schoolsOptions = schools.map((e) => {
  return { label: e, value: e }
})

const options = ref(schoolsOptions)
const value = ref('')

const filterFn = (params: any) => {
  // Custom filter method
  const { keyword, options } = params
  const result = options.filter((e: any) => {
    return e.label.indexOf(keyword) >= 0
  })
  return result
}

const searchFn = (event: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = options.value.filter(
        (e) => e.label.indexOf(event.keyword) >= 0
      )
      resolve(res)
    }, 500)
  })
}
</script>

<template>
  <lew-flex style="width: 320px" :gap="20" direction="y">
    <lew-select
      v-model="value"
      searchable
      :defaultValue="value"
      :options="options"
      clearable
      placeholder="Default Filter"
    />
    <lew-select
      v-model="value"
      searchable
      :options="options"
      :defaultValue="value"
      :searchMethod="filterFn"
      placeholder="Custom Filter Method"
    />
    <lew-select
      v-model="value"
      searchable
      :defaultValue="value"
      :searchMethod="searchFn"
      placeholder="Simulated Request"
    />
  </lew-flex>
</template>
