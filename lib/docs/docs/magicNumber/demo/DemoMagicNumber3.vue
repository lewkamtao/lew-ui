<script lang="ts" setup>
const num = ref(987654321.13)
const num2 = ref(23321)
const change = () => {
  num.value += Number(Math.random() * 100000)
  num2.value += parseInt(String(Math.random() * 100000))

  num.value = Number(num.value.toFixed(2))
}
</script>

<template>
  <lew-flex x="start" direction="y">
    <lew-flex x="start" y="end">
      当前成交额： <lew-magic-number sep :value="num" :size="24" /> 元
    </lew-flex>
    <lew-flex x="start" y="end">
      当前访问量：<lew-magic-number sep :value="num2" :size="24" /> 万
    </lew-flex>
    <lew-button text="增加" @click="change"></lew-button>
  </lew-flex>
</template>
