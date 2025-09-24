<script setup lang="ts">
import { cityTree } from "docs/lib/data";

const v = ref([]);
</script>

<template>
  <lew-cascader-multiple v-model="v" width="300px" free :options="cityTree" />
</template>
