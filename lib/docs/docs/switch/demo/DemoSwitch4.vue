<script setup lang="ts">
const value1 = ref(true)
const value2 = ref(false)
</script>

<template>
  <lew-flex x="start">
    <lew-switch
      v-tooltip="{
        content: '只读，值为 true'
      }"
      v-model="value1"
      readonly
    />
    <lew-switch
      v-tooltip="{
        content: '只读，值为 false'
      }"
      v-model="value2"
      readonly
    />
    <lew-switch
      v-tooltip="{
        content: '禁用，值为 true'
      }"
      v-model="value1"
      disabled
    />
    <lew-switch
      v-tooltip="{
        content: '禁用，值为 false'
      }"
      v-model="value2"
      disabled
    />
  </lew-flex>
</template>
