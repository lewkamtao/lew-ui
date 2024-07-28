<script setup lang="ts">
import { clear } from 'console'
import { inputNumberProps } from './props'

const emit = defineEmits(['clear', 'blur', 'focus', 'change', 'input', 'ok'])

const props = defineProps(inputNumberProps)
</script>

<template>
  <lew-input
    v-bind="{
      ...props,
      autoWidth: true,
      type: 'number',
    }"
  />
</template>
