<script lang="ts" setup>
import { ref } from 'vue';

const options = ref([
    {
        label: 'Home',
        to: '/',
    },
    {
        label: 'Brand',
        to: '/',
    },
    {
        label: 'Detail',
        to: '/',
        active: true,
    },
]);
</script>

<template>
    <lew-breadcrumb :options="options" icon-type="shoulder" />
</template>
