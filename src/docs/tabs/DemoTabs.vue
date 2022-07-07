<script setup lang="ts">
import { DemoTabs1, DemoTabs1_code } from './demo';
import { ref } from 'vue';

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
];const docsTable = ref([
    {
        param: 'modelValue',
        description: '配置表',
        type: 'options',
        default: '[]',
    },
    {
        param: 'options',
        description: '显示类型',
        type: `options`,
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
        param: 'value',
        description: '值',
        type: `string`,
        default: "''",
    },
    {
        param: 'activeIndex',
        description: '选中的索引',
        type: `nubmer`,
        default: "''",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Tabs</lew-title>
        <lew-demo-box title="常规" :code="DemoTabs1_code">
            <demo-tabs1
        /></lew-demo-box>
        <lew-title size="16px">Props</lew-title>
        <lew-table :data="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
        <lew-title style="margin-top: 40px" size="16px">Options</lew-title>
        <vxe-table :data="optionsTable">
            <vxe-column
                show-overflow
                field="param"
                width="220px"
                title="参数名"
            ></vxe-column>
            <vxe-column
                show-overflow
                field="description"
                title="描述"
            ></vxe-column>
            <vxe-column
                show-overflow
                width="300"
                field="type"
                title="类型"
            ></vxe-column>
            <vxe-column
                show-overflow
                field="default"
                title="默认值"
            ></vxe-column>
        </vxe-table>
    </div>
</template>
