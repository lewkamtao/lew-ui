<script setup lang="ts">
import {
    DemoSelect1,
    DemoSelect1_code,
    DemoSelect2,
    DemoSelect2_code,
    DemoSelect3,
    DemoSelect3_code,
    DemoSelect4,
    DemoSelect4_code,
    DemoSelect5,
    DemoSelect5_code,
    DemoSelect6,
    DemoSelect6_code,
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
    {
        param: 'disabled',
        description: '禁用选择器',
        type: `boolean`,
        default: "'false'",
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
    {
        param: 'disabled',
        description: '禁用选项',
        type: `boolean`,
        default: "'false'",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Select</lew-title>
        <p class="sub-title">
            一个自带搜索的、支持异步请求、支持虚拟列表、支持插槽的选择器
        </p>
        <lew-demo-box title="常规" :code="DemoSelect1_code">
            <demo-select1 />
        </lew-demo-box>
        <lew-demo-box title="触发方式" :code="DemoSelect2_code">
            <demo-select2 />
        </lew-demo-box>
        <lew-demo-box title="支持搜索" :code="DemoSelect3_code">
            <demo-select3 />
        </lew-demo-box>
        <lew-demo-box title="插槽" :code="DemoSelect4_code">
            <demo-select4 />
        </lew-demo-box>
        <lew-demo-box title="禁用项" :code="DemoSelect5_code">
            <demo-select5 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoSelect6_code">
            <demo-select6 />
        </lew-demo-box>
        <lew-title size="16px">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
        <lew-title style="margin-top: 40px" size="16px">Options</lew-title>
        <lew-table :data-source="optionsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
