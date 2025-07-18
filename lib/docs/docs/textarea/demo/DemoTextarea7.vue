<script setup lang="ts">
const v = ref('')
function ok(v: string) {
  LewMessage.success(`The input content is: ${v}`)
}
</script>

<template>
  <lew-textarea v-model="v" width="300px" ok-by-enter clearable @ok="ok" />
</template>
