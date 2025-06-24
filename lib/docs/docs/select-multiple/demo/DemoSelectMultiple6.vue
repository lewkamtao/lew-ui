<script setup lang="ts">
const options = [
  { label: 'Novel', value: 'novel' },
  { label: 'Poetry', value: 'poetry' },
  { label: 'Sci. Popular', value: 'science', disabled: true },
  { label: 'Biography', value: 'biography' },
  { label: 'History', value: 'history' },
  { label: 'Philosophy', value: 'philosophy', disabled: true },
  { label: 'Art', value: 'art' },
  { label: 'Economics', value: 'economics' },
  { label: 'Psychology', value: 'psychology' },
  { label: 'Politics', value: 'politics', disabled: true },
];
const value = ref(['novel', 'poetry', 'biography']);
</script>

<template>
  <lew-select-multiple
    v-model="value"
    :options="options"
    placeholder="View Selected Genres"
    disabled
  />
</template>
