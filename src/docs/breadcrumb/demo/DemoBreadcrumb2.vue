<script lang="ts" setup>
import { ref } from 'vue';

const options = ref([
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
    <lew-breadcrumb :options="options"> </lew-breadcrumb>
</template>
