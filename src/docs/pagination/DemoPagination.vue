<script setup lang="ts">
import {
    DemoPagination1,
    DemoPagination2,
    DemoPagination1_code,
    DemoPagination2_code,
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
        param: 'total',
        description: '总数',
        type: 'number',
        default: '100',
    },
    {
        param: 'pageNum',
        description: '当前页码',
        type: 'number',
        default: '1',
    },
    {
        param: 'pageSize',
        description: '页大小',
        type: 'number',
        default: '20',
    },
    {
        param: 'pageShowSize',
        description:
            '展示页码长度，这里有一定特殊性，比如长度是2，如果超出相应长度，就会只展示5个页码。',
        type: 'number',
        default: '2',
    },
    {
        param: 'background',
        description: '是否显示背景',
        type: 'boolean',
        default: 'true',
    },
    {
        param: 'round',
        description: '是否是圆形',
        type: 'boolean',
        default: 'true',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Pagination</lew-title>
        <p class="sub-title">一个高颜值的、支持双向绑定的分页器</p>
        <lew-demo-box title="常规" :code="DemoPagination1_code">
            <demo-pagination1 />
        </lew-demo-box>
        <lew-demo-box title="巨量" :code="DemoPagination2_code">
            <demo-pagination2 />
        </lew-demo-box>
        <br />
        <lew-title size="16px">props</lew-title>
        <lew-table :data="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
