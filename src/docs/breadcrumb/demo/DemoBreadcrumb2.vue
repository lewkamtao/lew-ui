<script lang="ts" setup>
import { ref } from 'vue';

const options = ref([
    {
        label: 'Avatar',
        to: '/Avatar',
    },
    {
        label: 'Breadcrumb',
        to: '/Breadcrumb',
        active: true,
    },
    {
        label: 'Input',
        to: '/Input',
    },
    {
        label: 'Dialog',
        to: '/Dialog',
    },
    {
        label: 'Flex',
        to: '/Flex',
    },
]);
</script>

<template>
    <lew-breadcrumb :options="options"> </lew-breadcrumb>
</template>
