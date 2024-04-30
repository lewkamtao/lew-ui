<script setup lang="ts">
const options = ref([
  { label: '宋朝', value: 1 },
  { label: '唐朝', value: 2 },
  { label: '明朝', value: 3 },
  { label: '清朝', value: 4 },
  { label: '隋朝', value: 5 },
  { label: '秦朝', value: 6 }
])

const value = ref([])
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-title :size="14">无图标</lew-title>
    <lew-checkbox-group
      v-model="value"
      block
      round
      :iconable="false"
      direction="x"
      :options="options"
    />
    <lew-checkbox-group v-model="value" block :iconable="false" direction="x" :options="options" />
    <br />
    <br />
    <lew-title :size="14">有图标</lew-title>
    <lew-checkbox-group v-model="value" block size="small" round direction="x" :options="options" />

    <lew-checkbox-group v-model="value" block round direction="x" :options="options" />

    <lew-checkbox-group v-model="value" block round size="large" direction="x" :options="options" />
    <br />
    <br />
    <lew-title :size="14">禁用</lew-title>
    <lew-checkbox-group
      v-model="value"
      block
      size="small"
      disabled
      direction="x"
      :options="options"
    />
    <br />
    <br />
    <lew-title :size="14">只读</lew-title>
    <lew-checkbox-group
      v-model="value"
      block
      size="small"
      readonly
      direction="x"
      :options="options"
    />
  </lew-flex>
</template>
