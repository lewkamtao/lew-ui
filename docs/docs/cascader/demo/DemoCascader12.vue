<script setup lang="ts">
import { cityTree } from 'docs/lib/data'

function change(_e: any) {
  // console.log(_e)
}
const v = ref()
</script>

<template>
  <lew-cascader
    v-model="v"
    width="300px"
    :only-leaf-selectable="false"
    multiple
    :options="cityTree"
    @change="change"
  />
</template>
