<!--
 * @Author: Kamtao
 * @Date: 2022-07-07 09:22:34
 * @LastEditTime: 2022-07-08 10:57:30
 * @Description: 
-->
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
        param: 'model-value (v-model)',
        description: '绑定值',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'round',
        description: '是否是圆角',
        type: 'boolean',
        default: 'true',
    },
    {
        param: '@change',
        description: '组件值发生变化的回调',
        type: '(value: boolean) => void	',
        default: "''",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Pagination</lew-title>
        <lew-demo-box title="常规" :code="DemoPagination1_code">
            <demo-pagination1 />
        </lew-demo-box>
        <lew-demo-box v-if="false" title="方的" :code="DemoPagination2_code">
            <demo-pagination2 />
        </lew-demo-box>
        <br />
        <lew-title size="16px">coming soon···</lew-title>
        <lew-table
            v-if="false"
            :data="docsTable"
            :columns="columns"
            height="auto"
        >
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
