<script setup lang="ts">
const techOptions = ref([
  { label: '人工智能', value: 'ai' },
  { label: '区块链', value: 'blockchain' },
  { label: '虚拟现实', value: 'vr' },
  { label: '量子计算', value: 'quantum' }
])

const selectedTech = ref([])
</script>

<template>
  <lew-checkbox-group v-model="selectedTech" direction="y" :options="techOptions" />
</template>
