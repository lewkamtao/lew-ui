<script setup lang="ts">
import { Activity, Search, Send } from 'lucide-vue-next'
</script>

<template>
  <lew-flex x="start" y="end">
    <lew-button type="fill" single-icon size="small" round>
      <Activity :size="16" />
    </lew-button>
    <lew-button type="light" round single-icon>
      <Send :size="16" />
    </lew-button>
    <lew-button type="ghost" round single-icon>
      <Search :size="16" />
    </lew-button>
  </lew-flex>
</template>
