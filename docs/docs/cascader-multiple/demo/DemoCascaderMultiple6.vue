<script setup lang="ts">
import { cityTree } from 'docs/lib/data'

const v = ref(26)
</script>

<template>
  <div style="width: 300px">
    <lew-cascader v-model="v" readonly :options="cityTree" />
  </div>
</template>
