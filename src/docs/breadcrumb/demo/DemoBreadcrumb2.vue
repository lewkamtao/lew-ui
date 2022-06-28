<script lang="ts" setup>
import { ref } from 'vue';

const options = ref([
    {
        label: 'Avatar',
        path: '/Avatar',
    },
    {
        label: 'Breadcrumb',
        path: '/Breadcrumb',
        active: true,
    },
    {
        label: 'Input',
        path: '/Input',
    },
    {
        label: 'Dialog',
        path: '/Dialog',
    },
    {
        label: 'Flex',
        path: '/Flex',
    },
]);
</script>

<template>
    <lew-breadcrumb :options="options"> </lew-breadcrumb>
</template>
