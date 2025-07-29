<script setup lang="ts">
import { schools } from 'docs/lib/data'

const value = ref([])

function initMethod() {
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

function load() {
  updateKey.value++
}
</script>

<template>
  <lew-select-multiple
    :key="updateKey"
    v-model="value"
    searchable
    :init-method="initMethod"
    placeholder="load options"
  />
  <lew-button type="ghost" style="margin-top: 20px" @click="load">
    load again {{ updateKey }}
  </lew-button>
</template>
