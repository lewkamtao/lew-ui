<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue';
import LewDocsTables from '../../layout/LewDocsTables.vue';

import {
    DemoRadio1,
    DemoRadio2,
    DemoRadio3,
    DemoRadio1_code,
    DemoRadio2_code,
    DemoRadio3_code,
} from './demo';

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
const columns2 = [
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
        param: 'model-value (v-model)',
        description: '绑定值',
        type: 'string',
        default: "-",
    },
    {
        param: 'options',
        description: '绑定值',
        type: 'object<RadioOptions>',
        default: '',
    },
    {
        param: 'size',
        description: '尺寸',
        type: 'small | medium | large',
        default: 'medium',
    },
    {
        param: 'block',
        description: '块模式',
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
        param: 'direction',
        description: '方向',
        type: 'string',
        default: 'x',
    },
    {
        param: 'iconable',
        description: '是否开启图标，仅在block开启之后生效。',
        type: 'boolean',
        default: 'false',
    },
]);

const docsTable2 = ref([
    {
        param: 'label',
        description: '标题',
        type: 'string',
        default: "-",
    },
    {
        param: 'value',
        description: '值',
        type: 'string',
        default: '',
    },
    {
        param: 'disabled',
        description: '禁用',
        type: 'boolean',
        default: 'false',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Radio</lew-title>
        <lew-demo-box title="常规" :code="DemoRadio1_code">
            <demo-radio1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" :code="DemoRadio2_code">
            <demo-radio2
        /></lew-demo-box>
        <lew-demo-box title="块" :code="DemoRadio3_code"
            ><demo-radio3 />
        </lew-demo-box>
        <lew-title :size="16">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
        <br />
        <br />
        <br />
        <lew-title :size="16">RadioOptions</lew-title>
        <lew-table :data-source="docsTable2" :columns="columns2" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
