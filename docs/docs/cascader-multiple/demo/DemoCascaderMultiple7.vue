<script setup lang="ts">
import { cityTree } from "docs/lib/data";

const v = ref([26]);
</script>

<template>
  <div style="width: 300px">
    <lew-cascader-multiple v-model="v" disabled :options="cityTree" />
  </div>
</template>
