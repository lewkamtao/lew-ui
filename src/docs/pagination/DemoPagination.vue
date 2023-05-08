<script setup lang="ts">
import {
    DemoPagination1,
    DemoPagination2,
    DemoPagination3,
    DemoPagination1_code,
    DemoPagination2_code,
    DemoPagination3_code,
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
const docsTable = ref([
    {
        param: 'total',
        description: '总数',
        type: 'number',
        default: '100',
    },
    {
        param: 'currentPage',
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
        param: 'visiblePagesCount',
        description:
            '展示页码长度，这里有一定特殊性，比如长度是2，如果超出相应长度，就会只展示5个页码。',
        type: 'number',
        default: '5',
    },
    {
        param: 'pageSizeOptions',
        description: '页码配置',
        type: 'Options',
        default: '-',
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
        <lew-demo-box title="模拟异步" :code="DemoPagination3_code">
            <demo-pagination3 />
        </lew-demo-box>
        <br />
        <lew-title :size="16">props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
