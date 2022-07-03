<script lang="ts" setup>
import { ref } from 'vue';
let options = ref([
    {
        label: '首页',
        to: '/',
    },
    {
        label: 'Vue',
        to: 'https://vuejs.org',
    },
    {
        label: '商品列表',
        to: '',
    },
    {
        label: '商品详情',
        to: '',
        active: true,
    },
]);
</script>

<template>
    <lew-breadcrumb :options="options" />
</template>
