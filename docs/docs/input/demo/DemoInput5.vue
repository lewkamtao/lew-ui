<script setup lang="ts">
const v = ref('')
</script>

<template>
  <lew-flex style="width: 300px" gap="20px" x="start" direction="y">
    <lew-input
      v-model="v"
      type="password"
      placeholder="密码可见"
      show-password
      :max-length="30"
    />
  </lew-flex>
</template>
