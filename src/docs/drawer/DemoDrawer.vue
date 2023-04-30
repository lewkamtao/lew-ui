<!--
 * @Author: sonders
 * @Date: 2022-07-12 17:20:50
 * @LastEditors: sonders
 * @LastEditTime: 2022-07-13 15:05:26
 * @Description: 
 * 
-->
<script setup lang="ts">
import { DemoDrawer1, DemoDrawer1_code } from './demo';

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
        param: 'v-model:visible',
        description: '打开抽屉',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'width',
        description: '宽度',
        type: 'number',
        default: '30(百分比)',
    },
    {
        param: 'height',
        description: '高度',
        type: 'number',
        default: '30(百分比)',
    },
    {
        param: 'position',
        description: '位置',
        type: 'string',
        default: 'right(left,right,top,bottom)',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Drawer</lew-title>
        <lew-demo-box title="基础用法" :code="DemoDrawer1_code">
            <DemoDrawer1 />
        </lew-demo-box>

        <lew-title :size="16">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }">
                {{ row.description }}
            </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin-bottom: 40px;
    }
}
</style>
