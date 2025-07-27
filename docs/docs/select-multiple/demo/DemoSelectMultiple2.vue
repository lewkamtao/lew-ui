<script setup lang="ts">
import { schools } from 'docs/lib/data'

const schoolsOptions = schools.map((e) => {
  return { label: e, value: e }
})

const value = ref(['浙江大学', '中山大学'])
</script>

<template>
  <lew-select-multiple
    v-model="value"
    searchable
    :default-value="value"
    :options="schoolsOptions"
    placeholder="Default Filter"
  />
</template>

<style lang="scss" scoped>
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 220px;
  gap: 10px;
  text-align: center;
  color: #aaa;
}
</style>
