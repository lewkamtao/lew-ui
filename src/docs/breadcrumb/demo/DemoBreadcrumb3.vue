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
    },
    {
        label: 'Detail',
        path: '/',
        active: true,
    },
]);
</script>

<template>
    <lew-breadcrumb :list="list" icon-type="shoulder"> </lew-breadcrumb>
</template>
