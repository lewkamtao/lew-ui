<script setup lang="ts">
import {
    DemoTooltip1,
    DemoTooltip2,
    DemoTooltip1_code,
    DemoTooltip2_code,
} from './demo';
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
        param: 'content',
        description: '内容',
        type: 'string',
        default: "''",
    },
    {
        param: 'placement',
        description: '位置',
        type: 'string',
        default: "''",
    },
    {
        param: 'trigger',
        description: '触发方式',
        type: 'hover | click',
        default: 'hover',
    },
    {
        param: 'allowHTML',
        description: '是否支持HTML',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'arrow',
        description: '是否需要箭头',
        type: 'boolean',
        default: 'true',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Tooltip</lew-title>
        <lew-demo-box title="悬浮显示" tag="推荐" :code="DemoTooltip1_code">
            <demo-tooltip1 />
        </lew-demo-box>
        <lew-demo-box title="点击事件触发" :code="DemoTooltip2_code">
            <demo-tooltip2 />
        </lew-demo-box>
        <lew-title size="16px">v-tooltip</lew-title>
        <lew-table :data="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
