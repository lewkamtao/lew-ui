<script lang="ts" setup>
const color = ref('#409EFF')

const predefineColors = [
  '#409EFF',
  '#67C23A', 
  '#E6A23C',
  '#F56C6C',
  '#909399'
]
</script>

<template>
  <div style="width: 300px">
    <lew-color-picker v-model="color" show-alpha :predefine-colors="predefineColors" />
  </div>
</template>
