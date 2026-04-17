<script setup lang="ts">
const inputValue = ref('')
const maxLength = ref(50)
</script>

<template>
  <lew-flex gap="20px" x="start" direction="y">
    <lew-input
      v-model="inputValue"
      width="300px"
      placeholder="Please enter content"
      clearable
      show-count
      :max-length="maxLength"
    />
    <lew-input
      v-model="inputValue"
      width="300px"
      placeholder="Please enter content"
      show-count
    />
  </lew-flex>
</template>
