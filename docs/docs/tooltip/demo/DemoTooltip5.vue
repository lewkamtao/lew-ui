<script setup lang="ts">
import LewSwitch from 'lew-ui/components/form/switch/src/LewSwitch.vue'
import { h } from 'vue'

const modelValue = ref(true)

function content() {
  return h(LewSwitch, {
    modelValue,
  }, [])
}
</script>

<template>
  <lew-flex x="center" gap="50">
    <lew-tag
      v-tooltip="{
        content,
        allowHTML: true,
      }"
      oversize
      color="red"
      round
      text="Allow HTML"
    />
  </lew-flex>
</template>
