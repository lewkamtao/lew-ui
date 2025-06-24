<script setup lang="ts">
const inputValue = ref('');
const maxLength = ref(50);
</script>

<template>
  <lew-flex :gap="20" x="start" direction="y">
    <lew-input
      v-model="inputValue"
      placeholder="Please enter content"
      clearable
      show-count
      :max-length="maxLength"
    />
    <lew-input
      v-model="inputValue"
      placeholder="Please enter content"
      show-count
    />
  </lew-flex>
</template>
