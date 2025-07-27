<script setup lang="ts">
import { cityTree } from 'docs/lib/data'

const v = ref<string>('')
function change(e: any) {
  console.log(e)
}
</script>

<template>
  <lew-tree-select
    v-model="v"
    key-field="value"
    size="medium"
    searchable
    label-field="label"
    :data-source="cityTree"
    @change="change"
  />
</template>
