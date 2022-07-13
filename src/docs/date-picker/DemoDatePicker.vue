<script setup lang="ts">
import { DemoDatePicker1, DemoDatePicker1_code } from './demo';
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
        <lew-title>Checkbox</lew-title>
        <p class="sub-title">通过复选框选择一个或多个数据。</p>
        <lew-demo-box title="x 布局" tag="方的" :code="DemoDatePicker1_code">
            <demo-date-picker1 />
        </lew-demo-box>

        <lew-title size="16px">Props</lew-title>
        <lew-table :data="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
