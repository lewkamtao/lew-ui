<script setup lang="ts">
import options from './form_20240714_155154_quvi8vkan.json'
let dataSource = ref({
  checkbox_1: '用户选择的选项1',
  dropdown_single_1: '用户选择的下拉选项',
  checkbox_2: '用户选择的选项2',
  tabs_1: '当前选中的标签',
  checkbox_3: '用户选择的选项3'
})
</script>

<template>
  <lew-flex x="start" y="start" :gap="50">
    <lew-desc :dataSource v-bind="options" />
  </lew-flex>
</template>
