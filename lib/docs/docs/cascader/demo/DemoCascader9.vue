<script setup lang="ts">
import { cityTree } from '@/lib/data'
const v = ref()
</script>

<template>
  <div style="width: 300px">
    <lew-cascader v-model="v" :options="cityTree" />
  </div>
</template>
