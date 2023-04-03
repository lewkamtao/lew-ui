<script setup lang="ts">
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
        type: 'string',
        default: "''",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Radio</lew-title>
        <lew-demo-box title="x 布局" :code="DemoRadio1_code">
            <demo-radio1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" :code="DemoRadio2_code">
            <demo-radio2
        /></lew-demo-box>
        <lew-demo-box title="块" :code="DemoRadio3_code"
            ><demo-radio3 />
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
