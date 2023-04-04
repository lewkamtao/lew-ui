<script setup lang="ts">
import { DemoResult1, DemoResult1_code } from './demo';

const columns = [
    {
        title: '参数名',
        width: 200,
        field: 'param',
    },

    {
        title: '类型',
        width: 200,
        field: 'type',
    },
    {
        title: '默认值',
        width: 200,
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
        param: 'size',
        description: '标题尺寸大小',
        type: 'string(px)',
        default: '24px',
    },
    {
        param: 'bold',
        description: '粗体值',
        type: `100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900`,
        default: '500',
    },
]);
</script>
<template>
    <div class="demo-wrapper">
        <lew-title>Result</lew-title>
        <lew-demo-box title="状态" :code="DemoResult1_code">
            <demo-result1 />
        </lew-demo-box>
        <lew-title size="16px">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
