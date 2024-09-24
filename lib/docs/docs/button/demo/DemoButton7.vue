<script setup lang="ts">
import { Home } from 'lucide-vue-next'
</script>

<template>
  <lew-flex x="start" y="end" gap="10px">
    <lew-button size="mini">
      <Home :size="14" />
      迷你
    </lew-button>
    <lew-button size="small">
      <Home :size="16" />
      小型
    </lew-button>
    <lew-button size="medium">
      <Home :size="18" />
      中型
    </lew-button>
    <lew-button size="large">
      <Home :size="20" />
      大型
    </lew-button>
  </lew-flex>
</template>
