<script lang="ts" setup>
const num = ref(81414.2323)

const change = () => {
  num.value = Number((Math.random() * 100000).toFixed(2))
}
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-magic-number :value="num" :size="24" />
    <lew-magic-number :value="num" :size="28" />
    <lew-magic-number :value="num" :size="32" />
    <lew-button text="改变数值" @click="change" />
  </lew-flex>
</template>
