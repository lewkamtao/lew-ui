<script setup lang="ts">
import {
    DemoBadge1,
    DemoBadge2,
    DemoBadge3,
    DemoBadge1_code,
    DemoBadge2_code,
    DemoBadge3_code,
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
        param: 'value',
        description:
            '显示内容，如果无内容，则默认显示一个点，round可以控制其为圆点。',
        type: 'string | number',
        default: 'undefined',
    },
    {
        param: 'type',
        description: '显示色彩类型',
        type: `normal | success | error | warning | info`,
        default: 'normal',
    },
    {
        param: 'round',
        description: '是否为圆形。',
        type: 'boolean',
        default: 'false',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Badge</lew-title>

        <lew-demo-box title="普通" :code="DemoBadge1_code">
            <demo-badge1 />
        </lew-demo-box>
        <lew-demo-box title="点" :code="DemoBadge2_code">
            <demo-badge2 />
        </lew-demo-box>
        <lew-demo-box title="直接使用" :code="DemoBadge3_code">
            <demo-badge3 />
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
