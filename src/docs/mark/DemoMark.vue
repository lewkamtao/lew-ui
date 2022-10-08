<script setup lang="ts">
import { ref } from 'vue';
import { DemoMark1, DemoMark1_code } from './demo';

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
const docsTable = ref([
    {
        param: 'type',
        description: '配色类型',
        type: `normal | success | error | warning | info`,
        default: 'normal',
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
        <lew-title size="16px">props</lew-title>
        <lew-table :data="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
