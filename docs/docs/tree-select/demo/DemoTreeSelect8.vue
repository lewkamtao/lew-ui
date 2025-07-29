<script setup lang="ts">
import { cityTree } from 'docs/lib/data'

const v = ref<string>('')
</script>

<template>
  <lew-tree-select
    v-model="v"
    key-field="value"
    label-field="label"
    clearable
    :data-source="cityTree"
  />
</template>
