<script setup lang="ts">
const src = ref('')

setTimeout(() => {
  src.value
    = 'https://app.tngeek.com/api_sso/open/file/b4c64ae_cat-8321993_1280.webp'
}, 2500)
</script>

<template>
  <lew-flex wrap x="start" y="end" gap="20px">
    <lew-image
      preview-group-key="cover1"
      object-position="top"
      width="150px"
      height="150px"
      :src="src"
    />
    <lew-image
      preview-group-key="cover"
      object-position="center"
      width="150px"
      height="150px"
      src="https://app.tngeek.com/api_sso/open/file/1f3e439_goat-9017896_1280.webp"
    />
  </lew-flex>
</template>
