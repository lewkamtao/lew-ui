<script setup lang="ts">
const smallInput = ref('')
const mediumInput = ref('')
const largeInput = ref('')
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input v-model="smallInput" size="small" placeholder="小尺寸输入框" />
    <lew-input
      v-model="mediumInput"
      size="medium"
      placeholder="中等尺寸输入框"
      clearable
    />
    <lew-input
      v-model="largeInput"
      size="large"
      placeholder="大尺寸输入框"
      show-password
    />
  </lew-flex>
</template>
