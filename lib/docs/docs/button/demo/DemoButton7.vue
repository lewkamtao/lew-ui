<script setup lang="ts">
import { Star, Heart, Bell, User } from 'lucide-vue-next'
</script>

<template>
  <lew-flex x="start" y="end" gap="10px">
    <lew-button size="mini">
      <Star :size="14" />
      Mini
    </lew-button>
    <lew-button size="small">
      <Heart :size="16" />
      Small
    </lew-button>
    <lew-button size="medium">
      <Bell :size="18" />
      Medium
    </lew-button>
    <lew-button size="large">
      <User :size="20" />
      Large
    </lew-button>
  </lew-flex>
</template>
