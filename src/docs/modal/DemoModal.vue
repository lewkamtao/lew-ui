<script setup lang="ts">
import { DemoModal1, DemoModal1_code } from './demo';

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
        param: 'visible',
        description: '列表配置',
        type: 'boolean',
        default: false,
    },
    {
        param: 'title',
        description: '列表配置',
        type: 'string',
        default: '[]',
    },
    {
        param: 'width',
        description: '宽度',
        type: 'string',
        default: '[]',
    },
    {
        param: 'height',
        description: '高度',
        type: 'string',
        default: '[]',
    },
    {
        param: 'closeOnClickOverlay',
        description: '点击遮罩关闭',
        type: 'Boolean',
        default: '[]',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Modal</lew-title>

        <lew-demo-box title="模态框" :code="DemoModal1_code">
            <demo-modal1 />
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

<style lang="scss" scoped>
.modal-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    box-sizing: border-box;
}
</style>
