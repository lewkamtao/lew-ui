<script setup lang="ts">
const src = ref('')

setTimeout(() => {
  src.value
    = 'https://cdn.jsdelivr.net/gh/lewkamtao/LewCloud@master/lew/apple_leader_1_ctd06i_.jpeg'
}, 2500)
</script>

<template>
  <lew-flex wrap x="start" y="end" gap="20px">
    <lew-avatar shape="circle" :src="src" :loading="!src" />
    <lew-avatar
      shape="circle"
      src="https://cdn.jsdelivr.net/gh/lewkamtao/LewCloud@master/lew/apple_leader_2_2s0nai_.jpeg"
      alt="avatar"
    />
    <lew-avatar
      shape="circle"
      src="https://cdn.jsdelivr.net/gh/lewkamtao/LewCloud@master/lew/apple_leader_3_kntap6_.jpeg"
      alt="avatar"
    />
  </lew-flex>
</template>
