<script setup lang="ts">
import { DemoComment1, DemoComment1_code } from './demo';
import { ref } from 'vue';

const columns = [
    {
        title: '参数名',
        width: '200px',
        field: 'param',
    },
    {
        title: '描述',
        width: '320px',
        field: 'description',
    },
    {
        title: '类型',
        width: 'auto',
        field: 'type',
    },
    {
        title: '默认值',
        width: '200px',
        field: 'default',
    },
];
const docsTable = ref([]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Comment</lew-title>
        <p class="sub-title">这是一个简单评论列表</p>
        <lew-demo-box title="常规" :code="DemoComment1_code">
            <demo-comment1>删除</demo-comment1></lew-demo-box
        >
        <lew-title size="16px">props</lew-title>
        <lew-table :data="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
