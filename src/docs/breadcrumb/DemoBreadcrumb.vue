<script setup lang="ts">
import {
    DemoBreadcrumb1,
    DemoBreadcrumb2,
    DemoBreadcrumb3,
    DemoBreadcrumb1_code,
    DemoBreadcrumb2_code,
    DemoBreadcrumb3_code,
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
        param: 'options',
        description: '配置表',
        type: 'options',
        default: '[]',
    },
    {
        param: 'iconType',
        description: '显示类型',
        type: `sprit | shoulder`,
        default: 'sprit',
    },
]);

const optionsTable = ref([
    {
        param: 'label',
        description: '文本内容',
        type: 'string',
        default: "''",
    },
    {
        param: 'to',
        description: '绑定跳转链接',
        type: `string`,
        default: "''",
    },
    {
        param: 'active',
        description: '是否是选中状态',
        type: 'boolean',
        default: 'false',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Breadcrumb</lew-title>

        <lew-demo-box title="常规" :code="DemoBreadcrumb1_code">
            <demo-breadcrumb1 />
        </lew-demo-box>
        <lew-demo-box title="自定义当前选中" :code="DemoBreadcrumb2_code">
            <demo-breadcrumb2 />
        </lew-demo-box>
        <lew-demo-box title="图标类型" :code="DemoBreadcrumb3_code">
            <demo-breadcrumb3 />
        </lew-demo-box>
        <lew-title size="16px">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
        <lew-title style="margin-top: 40px" size="16px">Options</lew-title>
        <lew-table :data="optionsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
