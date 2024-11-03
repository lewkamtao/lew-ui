<script setup lang="ts">
import options from './form_20240714_155154_quvi8vkan.json'
let values = ref({
  checkbox_1: '123',
  dropdown_single_1: '123',
  checkbox_2: '123',
  tabs_1: '123',
  checkbox_3: '123'
})
</script>

<template>
  <lew-flex x="start" y="start" :gap="50">
    <lew-desc :values v-bind="options" />
  </lew-flex>
</template>
