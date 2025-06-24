<script setup lang="ts">
import { Activity, Send, Search } from 'lucide-vue-next';
</script>

<template>
  <lew-flex x="start" y="end">
    <lew-button type="fill" singleIcon size="small" round>
      <Activity :size="16" />
    </lew-button>
    <lew-button type="light" round singleIcon> <Send :size="16" /> </lew-button>
    <lew-button type="ghost" round singleIcon>
      <Search :size="16" />
    </lew-button>
  </lew-flex>
</template>
