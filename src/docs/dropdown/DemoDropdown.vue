<script setup lang="ts">
import {
    DemoDropdown1,
    DemoDropdown2,
    DemoDropdown3,
    DemoDropdown1_code,
    DemoDropdown2_code,
    DemoDropdown3_code,
} from './demo';
import LewDemoBox from '../../layout/LewDemoBox.vue';
import LewDocsTables from '../../layout/LewDocsTables.vue';

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

const functionColumns = [
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
        param: 'options',
        description: '列表配置',
        type: 'array',
        default: '[]',
    },
    {
        param: 'trigger',
        description: '触发方式',
        type: `hover | click`,
        default: 'hover',
    },
    {
        param: 'placement',
        description: '下拉展示的位置',
        type: 'string',
        default: 'bottom',
    },
    {
        param: 'width',
        description: '下拉气泡宽度',
        type: 'string(px)',
        default: "-",
    },
]);

const functionTable = ref([
    {
        param: 'show',
        description: '展示下拉',
        type: 'function',
        default: '() => {}',
    },
    {
        param: 'hide',
        description: '收起下拉',
        type: `function`,
        default: '() => {}',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Dropdown</lew-title>
        <p class="sub-title">
            你可以使用
            <lew-mark to="/Popover" type="info">Popover</lew-mark>
            进行高度自定义下拉菜单
        </p>
        <lew-demo-box title="常规" :code="DemoDropdown1_code">
            <demo-dropdown1 />
        </lew-demo-box>
        <lew-demo-box title="不仅仅是按钮" :code="DemoDropdown2_code">
            <demo-dropdown2 />
        </lew-demo-box>
        <lew-demo-box title="无箭头" :code="DemoDropdown3_code">
            <demo-dropdown3 />
        </lew-demo-box>

        <lew-title :size="16">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
        <p class="demo-tips">
            你可以在
            <lew-mark to="/Tooltip" type="info">Tooltip</lew-mark>
            找到你需要的位置参数。
        </p>
        <br />
        <br />
        <lew-title :size="16">Function</lew-title>
        <lew-table
            :data-source="functionTable"
            :columns="functionColumns"
            height="auto"
        >
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
