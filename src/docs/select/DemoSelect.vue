<script setup lang="ts">
import { ref } from 'vue';
import {
    DemoSelect1,
    DemoSelect1_code,
    DemoSelect2,
    DemoSelect2_code,
} from './demo';

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
        param: 'model-value (v-model)',
        description: '绑定值',
        type: 'string | array',
        default: "''",
    },
    {
        param: 'options',
        description: '选项',
        type: 'options',
        default: '[]',
    },
    {
        param: 'trigger',
        description: '触发方式',
        type: 'click | hover',
        default: 'click',
    },
    {
        param: 'multiple',
        description: '多选模式，开启后，v-model需要是数组类型',
        type: 'boolean',
        default: 'false',
    },
]);

const optionsTable = ref([
    {
        param: 'label',
        description: '选项组的标签',
        type: 'string',
        default: "''",
    },
    {
        param: 'value',
        description: '值',
        type: `string`,
        default: "''",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Select</lew-title>
        <lew-demo-box title="触发方式" :code="DemoSelect1_code">
            <demo-select1 />
        </lew-demo-box>
        <lew-demo-box title="多选" :code="DemoSelect2_code">
            <demo-select2 />
        </lew-demo-box>
        <lew-title size="16px">Props</lew-title>
        <lew-table :data="docsTable" :columns="columns" height="auto">
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
