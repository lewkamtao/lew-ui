<script setup lang="ts">
import { LewTag } from 'lew-ui'
import RenderComponent from 'lew-ui/utils/RenderComponent.vue'
import { h } from 'vue'
</script>

<template>
  <lew-flex wrap x="start" y="end" gap="20">
    <lew-avatar
      shape="circle"
      src="https://cdn.jsdelivr.net/gh/lewkamtao/LewCloud@master/lew/apple_leader_1_ctd06i_.jpeg"
      alt="avatar"
    />
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
    <RenderComponent :render-fn="h(LewTag, '123')" />
  </lew-flex>
</template>
