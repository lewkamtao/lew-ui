<script setup lang="ts">
import { ref } from 'vue';

let options = ref([
    { label: '宋朝', value: 1 },
    { label: '唐朝', value: 2 },
    { label: '明朝', value: 3 },
    { label: '清朝', value: 4 },
    { label: '隋朝', value: 5 },
    { label: '秦朝', value: 6 },
]);

let value = ref([]);
</script>

<template>
    <lew-flex direction="column" x="start">
        <lew-title size="14px">无图标</lew-title>
        <lew-checkbox-group
            v-model="value"
            block
            round
            :iconable="false"
            direction="x"
            :options="options"
        ></lew-checkbox-group>
        <lew-checkbox-group
            v-model="value"
            block
            :iconable="false"
            direction="x"
            :options="options"
        ></lew-checkbox-group>
        <br />
        <br />
        <lew-title size="14px">有图标</lew-title>
        <lew-checkbox-group
            v-model="value"
            block
            round
            direction="x"
            :options="options"
        ></lew-checkbox-group
    ></lew-flex>
</template>
