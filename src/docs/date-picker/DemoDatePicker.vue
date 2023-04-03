<script setup lang="ts">
import { DemoDatePicker1, DemoDatePicker1_code } from './demo';

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
    {
        param: 'auto-close',
        description: '是否在选择日期后自动关闭气泡',
        type: 'boolean',
        default: "''",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>DatePicker</lew-title>
        <p class="sub-title">一个很漂亮的、支持双向绑定的日期选择器。</p>
        <lew-demo-box title="常规" :code="DemoDatePicker1_code">
            <demo-date-picker1 />
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
