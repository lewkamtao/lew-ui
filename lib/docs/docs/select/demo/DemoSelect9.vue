<script setup lang="ts">
import { schools } from '@/lib/data'

const value = ref([])

const initOptionsMethod = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = schools.map((e) => {
        return { label: e, value: e }
      })
      resolve(res)
    }, 1000)
  })
}

const updateKey = ref(0)

const load = () => {
  updateKey.value++
}
</script>
<template>
  <lew-select
    v-model="value"
    :key="updateKey"
    searchable
    clearable
    :initOptionsMethod="initOptionsMethod"
    placeholder="load options"
  />
  <lew-button type="ghost" style="margin-top: 20px" @click="load">
    load again {{ updateKey }}
  </lew-button>
</template>
