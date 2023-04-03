<script setup lang="ts">
import { DemoMessage1, DemoMessage1_code } from './demo';

const columns = [
    {
        title: '参数名',
        width: '120px',
        field: 'param',
    },
    {
        title: '描述',
        width: '120px',
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
        param: 'message',
        description: '消息文字',
        type: 'string',
        default: '--',
    },
    {
        param: 'type',
        description: '消息类型',
        type: `'success' | 'warning' | 'error' | 'info' | 'normal'`,
        default: `'normal'`,
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Message</lew-title>
        <lew-demo-box title="快捷唤起" :code="DemoMessage1_code">
            <demo-message1>删除</demo-message1></lew-demo-box
        >
        <lew-title size="16px">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
