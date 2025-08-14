<script setup lang="ts">
const tags = ['Javascript', 'Typescript', 'Vue', 'React', 'Angular', 'Node.js', 'Python']

function close() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}
</script>

<template>
  <lew-flex>
    <lew-tag v-for="tag in tags" :key="tag" :close="close">
      {{ tag }}
    </lew-tag>
  </lew-flex>
</template>
