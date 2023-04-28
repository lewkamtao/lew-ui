<script setup lang="ts">
import { DemoMark1, DemoMark1_code } from './demo';

const columns = [
    {
        title: '参数名',
        width: 150,
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
        width: 220,
        field: 'description',
    },
];

const docsTable = ref([
    {
        param: 'type',
        description: '配色类型',
        type: `normal | success | error | warning | info`,
        default: 'normal',
    },
    {
        param: 'round',
        description: '是否圆角',
        type: 'boolean',
        default: false,
    },
    {
        param: 'to',
        description: '跳转链接',
        type: `string`,
        default: '#',
    },
    {
        param: 'bold',
        description: '配色类型',
        type: `normal | success | error | warning | info`,
        default: `''`,
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Mark</lew-title>
        <p class="sub-title">
            虽然这小家伙看起来很简单，但是我觉得它非常有用，在我看来。
        </p>
        <lew-demo-box title="文本标记" :code="DemoMark1_code">
            <demo-mark1>删除</demo-mark1></lew-demo-box
        >
        <lew-title :size="16">props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
