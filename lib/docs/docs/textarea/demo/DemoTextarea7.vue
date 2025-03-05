<script setup lang="ts">
const v = ref('')
const ok = (v: string) => {
  LewMessage.success(`The input content is: ${v}`)
}
</script>

<template>
  <lew-textarea width="300px" v-model="v" ok-by-enter @ok="ok" clearable />
</template>
