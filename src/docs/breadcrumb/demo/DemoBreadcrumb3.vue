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
    },
    {
        label: 'Detail',
        path: '/',
        active: true,
    },
]);
</script>

<template>
    <lew-breadcrumb :options="options" icon-type="shoulder"> </lew-breadcrumb>
</template>
