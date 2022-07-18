<!--
 * @Author: cola
 * @Date: 2022-07-18 22:10:46
 * @LastEditors: cola
 * @Description: 
-->
<template>
    <div class="demo-wrapper">
        <lew-title>Icon-Carbon</lew-title>

        <lew-demo-box title="色彩" :code="DemoIcon1_code">
            <demo-icon1 />
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

<script setup lang="ts">
import { DemoIcon1, DemoIcon1_code } from './demo';
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
const docsTable = ref([]);
</script>

<style scoped lang="scss">
.icon {
    --bg-color: rgba(255, 255, 255);
    background-image: radial-gradient(transparent 1px, var(--bg-color) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
}
</style>
