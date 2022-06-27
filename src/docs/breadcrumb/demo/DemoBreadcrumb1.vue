<script lang="ts" setup>
import { ref } from 'vue';

const list = ref([
    {
        label: '首页',
        path: '/',
    },
    {
        label: '商品分类',
        path: '',
    },
    {
        label: '商品列表',
        path: '',
    },
    {
        label: '商品详情',
        path: '/',
        active: true,
    },
]);
</script>

<template>
    <lew-breadcrumb :list="list"> </lew-breadcrumb>
</template>
