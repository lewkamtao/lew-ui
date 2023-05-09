<script setup lang="ts">
import {
    DemoSwitch1,
    DemoSwitch2,
    DemoSwitch1_code,
    DemoSwitch2_code,
} from './demo';
import LewDemoBox from '../../layout/LewDemoBox.vue';
import LewDocsTables from '../../layout/LewDocsTables.vue';

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
const columns2 = [
    {
        title: '事件名',
        width: 150,
        field: 'event',
    },
    {
        title: '参数',
        width: 120,
        field: 'params',
    },
    {
        title: '描述',
        width: 240,
        field: 'description',
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
]);
const docsTable2 = ref([
    {
        event: 'change',
        description: '值发生改变时触发',
        params: 'boolean',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Switch</lew-title>
        <lew-demo-box title="圆的" :code="DemoSwitch1_code">
            <demo-switch1 />
        </lew-demo-box>
        <lew-demo-box title="方的" :code="DemoSwitch2_code">
            <demo-switch2 />
        </lew-demo-box>
        <br />
        <lew-title :size="16">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
        <br />
        <br />
        <br />
        <lew-title :size="16">Events</lew-title>
        <lew-table :data-source="docsTable2" :columns="columns2" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
