<script setup lang="ts">
import { ref } from 'vue';

let options = ref([
    { label: '宋朝', value: 1 },
    { label: '唐朝', value: 2 },
    { label: '明朝', value: 3 },
    { label: '清朝', value: 4 },
]);

let value = ref([]);
</script>

<template>
    <lew-checkbox-group
        v-model="value"
        size="small"
        direction="x"
        :options="options"
    />
    <br />
    <lew-checkbox-group
        v-model="value"
        size="medium"
        direction="x"
        :options="options"
    />
    <br />
    <lew-checkbox-group
        v-model="value"
        size="large"
        direction="x"
        :options="options"
    />
</template>
