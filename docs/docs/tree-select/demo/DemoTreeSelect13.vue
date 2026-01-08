<script setup lang="ts">
import { cityTree } from 'docs/lib/data'

const v = ref<any>([])
function change(e: any) {
  console.log(e)
}
</script>

<template>
  <lew-tree-select
    v-model="v"
    multiple
    key-field="value"
    width="300px"
    size="medium"
    searchable
    free
    label-field="label"
    :data-source="cityTree"
    @change="change"
  />
</template>
