<script setup lang="ts">
const techOptions = ref([
    { label: 'Artificial Intelligence', value: 'ai' },
    { label: 'Blockchain', value: 'blockchain' },
    { label: 'Virtual Reality', value: 'vr' },
    { label: 'Quantum Computing', value: 'quantum' },
])

const selectedTech = ref([])
</script>

<template>
    <lew-checkbox-group
        v-model="selectedTech"
        direction="y"
        :options="techOptions"
    />
</template>
