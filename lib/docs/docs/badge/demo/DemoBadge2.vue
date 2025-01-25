<script setup lang="ts">
import { Activity, Home, Search } from 'lucide-vue-next'
</script>
<template>
  <lew-flex wrap x="start" gap="30">
    <lew-badge round color="blue" processing>
      <Activity :size="18" />
    </lew-badge>
    <lew-badge round processing>
      <Home :size="27" />
    </lew-badge>
    <lew-badge round color="green" processing>
      <Search :size="36" />
    </lew-badge>
  </lew-flex>
</template>
