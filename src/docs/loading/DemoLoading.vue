<script setup lang="ts">
import { DemoLoading1, DemoLoading1_code } from './demo';

const columns = [
    {
        title: '参数名',
        width: 120,
        field: 'param',
    },
    {
        title: '类型',
        width: 240,
        field: 'type',
    },
    {
        title: '默认值',
        width: 120,
        field: 'default',
    },
    {
        title: '描述',
        width: 320,
        field: 'description',
    },
];
const docsTable = ref([
    {
        param: 'isShow',
        description: '是否展示',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'title',
        description: '加载文字提示',
        type: `string`,
        default: '""',
    },
]);
</script>
<template>
    <div class="demo-wrapper">
        <lew-title>Loading</lew-title>
        <lew-demo-box title="普通" :code="DemoLoading1_code">
            <demo-loading1 />
        </lew-demo-box>
        <lew-title :size="16">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
