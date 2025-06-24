<script setup lang="ts">
import { cityTree } from '@/lib/data';

const v = ref<string>('');

const change = (e: any) => {
  console.log(e);
};
</script>

<template>
  <lew-flex direction="y" gap="20px" style="width: 300px">
    <lew-tree-select
      v-model="v"
      keyField="value"
      labelField="label"
      clearable
      :data-source="cityTree"
      @change="change"
    />
    <lew-tree-select
      v-model="v"
      keyField="value"
      labelField="label"
      readonly
      :data-source="cityTree"
      @change="change"
    />
    <lew-tree-select
      v-model="v"
      keyField="value"
      labelField="label"
      disabled
      :data-source="cityTree"
      @change="change"
    />
  </lew-flex>
</template>
