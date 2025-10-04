<script setup lang="ts">
import { cityTree } from "docs/lib/data";

function change(e: any, items: any) {
  console.log(e, items);
}
const v = ref();
</script>

<template>
  <div style="width: 300px">
    <lew-cascader v-model="v" multiple :options="cityTree" @change="change" />
  </div>
</template>
