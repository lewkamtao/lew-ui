<script setup lang="ts">
import { cityTree } from "docs/lib/data";

const v = ref<string>("");
</script>

<template>
  <lew-tree-select
    v-model="v"
    width="300px"
    key-field="value"
    label-field="label"
    readonly
    :data-source="cityTree"
  />
</template>
