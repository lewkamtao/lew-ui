<script setup lang="ts">
const value = ref('')
</script>

<template>
    <lew-textarea
        width="300px"
        v-model="value"
        placeholder="Limit the number of characters"
        show-count
        :max-length="300"
        clearable
    />
</template>
