<script setup lang="ts">
import { DemoForm1, DemoForm1_code } from './demo';

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
        param: 'title',
        description: '表单标题',
        type: 'string',
        default: "''",
    },
    {
        param: 'direction',
        description: '表单item方向',
        type: 'x | y',
        default: 'x',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Form</lew-title>
        <lew-demo-box title="表单总览" :code="DemoForm1_code">
            <demo-form1 />
        </lew-demo-box>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
