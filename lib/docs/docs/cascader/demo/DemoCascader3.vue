<script setup lang="ts">
import { cityTree } from '@/lib/data'
const v = ref()
</script>

<template>
  <lew-flex direction="y" style="width: 300px">
    <lew-cascader v-model="v" free :showAllLevels="false" :options="cityTree" />
  </lew-flex>
</template>
