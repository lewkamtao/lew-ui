<script setup lang="ts">
import { magicNumberProps } from './magic-text'

defineProps(magicNumberProps)
</script>

<template>
  <div class="lew-magic-text">
    <slot />
  </div>
</template>

<style lang="scss" scoped></style>
