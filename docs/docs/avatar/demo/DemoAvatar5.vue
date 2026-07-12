<script setup lang="ts">
import { Star } from '@lucide/vue'
</script>

<template>
  <lew-flex wrap x="start" y="center" gap="20px">
    <lew-avatar shape="circle" :size="48">
      <lew-flex
        x="center"
        y="center"
        style="width: 100%; height: 100%; font-size: 12px; color: var(--lew-color-primary);"
      >
        Lew
      </lew-flex>
    </lew-avatar>
    <lew-avatar shape="circle" :size="48">
      <template #icon>
        <lew-flex x="center" y="center" style="width: 100%; height: 100%;">
          <Star :size="22" />
        </lew-flex>
      </template>
    </lew-avatar>
    <lew-avatar
      shape="circle"
      :size="48"
      src="https://invalid.lew-ui.local/avatar.png"
      name="Fallback"
    >
      <template #error>
        <lew-flex
          x="center"
          y="center"
          style="width: 100%; height: 100%; font-size: 12px;"
        >
          Err
        </lew-flex>
      </template>
    </lew-avatar>
  </lew-flex>
</template>
