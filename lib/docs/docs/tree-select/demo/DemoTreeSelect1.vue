<script setup lang="ts">
import { cityTree } from '@/lib/data'
const v = ref<string>('')
const change = (e: any) => {
  console.log(e)
}
</script>

<template>
  <lew-flex direction="y" gap="20px" style="width: 300px">
    <lew-tree-select
      v-model="v"
      size="small"
      keyField="value"
      labelField="label"
      :data-source="cityTree"
      @change="change"
    />
    <lew-tree-select
      v-model="v"
      keyField="value"
      size="medium"
      searchable
      labelField="label"
      :data-source="cityTree"
      @change="change"
    />
    <lew-tree-select
      v-model="v"
      size="large"
      keyField="value"
      labelField="label"
      :data-source="cityTree"
      @change="change"
    />
  </lew-flex>
</template>
