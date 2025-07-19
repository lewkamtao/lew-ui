<script setup lang="ts">
import { cityTree } from '@/lib/data'

function change(_e: any) {
  // console.log(_e)
}
const v = ref()
</script>

<template>
  <div style="width: 300px">
    <lew-cascader v-model="v" free :options="cityTree" @change="change" />
  </div>
</template>
