<script setup lang="ts">
import { cityTree } from 'docs/lib/data'

const v = ref<string>('')

function change(e: any) {
  console.log(e)
}
</script>

<template>
  <lew-flex direction="y" gap="20px" style="width: 300px">
    <lew-tree-select
      v-model="v"
      key-field="value"
      label-field="label"
      :data-source="cityTree"
      expand-all
      @change="change"
    />
  </lew-flex>
</template>
