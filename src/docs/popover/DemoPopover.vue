<script setup lang="ts">
import { DemoPopover1, DemoPopover1_code } from './demo';

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
        <lew-title>Popover</lew-title>
        <p class="sub-title">
            如果你需要信息提示，请可以尝试一下
            <lew-mark type="info" to="/Tooltip">Tooltip</lew-mark>
        </p>
        <lew-demo-box
            title="询问校验"
            badge="自定义 HTML"
            :code="DemoPopover1_code"
        >
            <demo-popover1></demo-popover1>
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
