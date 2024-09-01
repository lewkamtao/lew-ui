<script setup lang="ts">
const inputValue = ref('')
const maxLength = ref(50)
</script>

<template>
  <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
    <lew-input
      v-model="inputValue"
      placeholder="请输入内容"
      clearable
      show-count
      :max-length="maxLength"
    />
    <lew-input v-model="inputValue" placeholder="请输入内容" show-count />
  </lew-flex>
</template>
