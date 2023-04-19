<script setup lang="ts">
import { DemoAlert1, DemoAlert1_code } from './demo';

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
        param: 'options',
        description: '列表配置',
        type: 'array',
        default: '[]',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Alert</lew-title>
        <p class="sub-title">
            如果你需要使用全局的提示，请可以尝试一下
            <lew-mark type="info" to="/Message">Message</lew-mark>
        </p>
        <lew-demo-box title="警报" :code="DemoAlert1_code">
            <demo-alert1 />
        </lew-demo-box>
        <br />
        <lew-title :size="16">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
