<script setup lang="ts">
import {
    DemoTag1,
    DemoTag2,
    DemoTag3,
    DemoTag4,
    DemoTag1_code,
    DemoTag2_code,
    DemoTag3_code,
    DemoTag4_code,
} from './demo';

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
        param: 'type',
        description: '头像链接',
        type: 'string',
        default: `''`,
    },
    {
        param: 'size',
        description: '尺寸大小',
        type: 'small ｜ medium ｜ large',
        default: 'medium',
    },
    {
        param: 'closable',
        description: '是否可关闭',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'disabled',
        description: '禁用',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'to',
        description: '跳转链接',
        type: 'string',
        default: "''",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Tag</lew-title>
        <lew-demo-box title="基础" :code="DemoTag1_code">
            <demo-tag1 />
        </lew-demo-box>
        <lew-demo-box title="尺寸" :code="DemoTag2_code">
            <demo-tag2 />
        </lew-demo-box>
        <lew-demo-box title="禁用与关闭" :code="DemoTag3_code">
            <demo-tag3 />
        </lew-demo-box>
        <lew-demo-box title="插槽" :code="DemoTag4_code">
            <demo-tag4 />
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
