<script setup lang="ts">
const getComponentName = () => {
  const { path } = useRoute()
  return path
    .replace('/', '')
    .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/^[A-Z]/, (letter) => letter.toLowerCase())
}
</script>

<template>
  <div>
    <lew-title>{{ $t(`components.${getComponentName()}.name`) }}</lew-title>
    <p class="sub-title">
      {{ $t(`components.${getComponentName()}.description`) }}
    </p>
  </div>
</template>
