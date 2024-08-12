<script setup lang="ts">
import options from './form_20240714_155154_quvi8vkan.json'
const bindOptions = options
</script>

<template>
  <lew-flex x="start" y="start" :gap="50">
    <lew-form v-bind="bindOptions" />
  </lew-flex>
</template>
