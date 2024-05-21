<script setup lang="ts">
import { cityTree } from '@/lib/data'

const v = ref()

const change = (e: any) => {
  console.log(e)
}
</script>

<template>
  <lew-flex direction="y" gap="20px" style="width: 300px">
    <lew-cascader v-model="v" size="small" :options="cityTree" @change="change" />
    <lew-cascader v-model="v" :options="cityTree" />
    <lew-cascader v-model="v" size="large" :options="cityTree" />
  </lew-flex>
</template>
