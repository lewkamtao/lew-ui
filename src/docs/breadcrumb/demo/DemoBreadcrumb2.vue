<script lang="ts" setup>
import { ref } from 'vue';

const list = ref([
    {
        label: 'Home',
        path: '/',
    },
    {
        label: 'Brand',
        path: '/',
        active: true,
    },
    {
        label: 'User',
        path: '/',
        active: true,
    },
    {
        label: 'Topics',
        path: '/',
    },
    {
        label: 'Detail',
        path: '/',
    },
]);
</script>

<template>
    <lew-breadcrumb :list="list"> </lew-breadcrumb>
</template>
