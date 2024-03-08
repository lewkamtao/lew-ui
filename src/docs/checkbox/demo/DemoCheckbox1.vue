<script setup lang="ts">
    const options = ref([
        { label: '宋朝', value: 1 },
        { label: '唐朝', value: 2 },
        { label: '明朝', value: 3 },
        { label: '清朝', value: 4 }
    ]);

    const value = ref([]);
</script>

<template>
    <lew-checkbox-group v-model="value" size="small" :options="options" />
    <lew-checkbox-group v-model="value" size="medium" :options="options" />
    <lew-checkbox-group v-model="value" size="large" :options="options" />
</template>
