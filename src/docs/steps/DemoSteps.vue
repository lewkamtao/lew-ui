<script setup lang="ts">
    import {
        DemoSteps1,
        DemoSteps2,
        DemoSteps3,
        DemoSteps1Code,
        DemoSteps2Code,
        DemoSteps3Code
    } from './demo';
    import LewDemoBox from '../../layout/LewDemoBox.vue';

    const columns = [
        {
            title: '参数名',
            width: 150,
            field: 'param'
        },

        {
            title: '类型',
            width: 240,
            field: 'type'
        },
        {
            title: '默认值',
            width: 120,
            field: 'default'
        },
        {
            title: '描述',
            width: 220,
            field: 'description'
        }
    ];
    const docsTable = ref([
        {
            name: 'value',
            description: '显示内容',
            type: 'string | number',
            default: 'undefined'
        },
        {
            name: 'type',
            description: '显示类型',
            type: 'default | success | error | warning | info',
            default: 'default'
        },
        {
            name: 'round',
            description: '形状，是否为圆形。',
            type: 'boolean',
            default: 'false'
        }
    ]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Steps</lew-title>
        <lew-demo-box title="普通" :code="DemoSteps1Code">
            <demo-steps1 />
        </lew-demo-box>
        <lew-demo-box title="点" :code="DemoSteps2Code">
            <demo-steps2 />
        </lew-demo-box>
        <lew-demo-box title="直接使用" :code="DemoSteps3Code">
            <demo-steps3 />
        </lew-demo-box>
        <lew-title :size="16">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
