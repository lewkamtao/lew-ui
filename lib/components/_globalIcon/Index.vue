<script lang="ts" setup>
import {
  CircleCheck,
  Info,
  TriangleAlert,
  CircleAlert,
  BellRing,
  X,
  Copy
} from 'lucide-vue-next'
defineProps({
  type: {
    type: String,
    default: 'info'
  }
})
const iconMap = {}
</script>

<template>
  <component :is="iconMap[type]"></component>
</template>
