<script setup lang="ts">
import { cityTree } from 'docs/lib/data'

function change(_e: any) {
  // console.log(_e)
}
const v = ref()
</script>

<template>
  <div style="width: 300px">
    <lew-cascader-multiple v-model="v" free :options="cityTree" @change="change" />
  </div>
</template>
