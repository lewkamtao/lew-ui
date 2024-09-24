<script setup lang="ts">
const isSuperheroFan = ref(false)
const isTimeTravel = ref(false)
const isAlien = ref(false)
</script>

<template>
  <lew-flex x="start" gap="15" direction="y">
    <lew-checkbox
      v-model="isSuperheroFan"
      size="small"
      label="是否阅读隐私协议"
    />
    <lew-checkbox
      v-model="isTimeTravel"
      disabled
      round
      label="是否阅读隐私协议"
    />
    <lew-checkbox
      v-model="isAlien"
      size="large"
      round
      label="是否阅读隐私协议"
    />
  </lew-flex>
</template>
