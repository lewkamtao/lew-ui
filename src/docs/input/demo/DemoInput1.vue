<script setup lang="ts">
    const value = ref('');
</script>

<template>
    <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
        <lew-input v-model="value" size="small" placeholder="小" />
        <lew-input v-model="value" size="medium" placeholder="中" />
        <lew-input v-model="value" size="large" placeholder="大" />
    </lew-flex>
</template>
