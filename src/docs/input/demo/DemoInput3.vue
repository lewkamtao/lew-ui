<script setup lang="ts">
const value = ref('')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input
      v-model="value"
      type="password"
      placeholder="密码可见"
      show-password
      :max-length="30"
    />
  </lew-flex>
</template>
