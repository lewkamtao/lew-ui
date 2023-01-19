<script setup lang="ts">
const options = ref([
    { label: '宋朝', value: '1' },
    { label: '唐朝', value: '2' },
    { label: '明朝', value: '3' },
    { label: '清朝', value: '4' },
]);

const value = ref('');
</script>

<template>
    <lew-flex direction="y" x="start">
        <lew-title size="14px">无图标</lew-title>
        <lew-radio-group
            v-model="value"
            block
            :iconable="false"
            :options="options"
        ></lew-radio-group>
        <br />
        <br />
        <lew-title size="14px">有图标</lew-title>
        <lew-radio-group
            v-model="value"
            block
            :options="options"
        ></lew-radio-group>
    </lew-flex>
</template>
