<script setup lang="ts">
import {
    DemoPopok1,
    DemoPopok2,
    DemoPopok1_code,
    DemoPopok2_code,
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
        param: 'options',
        description: '列表配置',
        type: 'array',
        default: '[]',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Popok</lew-title>
        <lew-demo-box title="简单的询问" tag="click" :code="DemoPopok1_code">
            <demo-popok1> </demo-popok1>
        </lew-demo-box>

        <lew-demo-box title="简单的询问" tag="hover" :code="DemoPopok2_code">
            <demo-popok2> </demo-popok2>
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
