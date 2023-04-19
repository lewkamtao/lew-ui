<script setup lang="ts">
import { DemoDialog1, DemoDialog1_code } from './demo';

const columns = [
    {
        title: '参数名',
        width: 120,
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
        width: 320,
        field: 'description',
    },
];
const docsTable = ref([
    {
        param: 'type',
        description: '消息类型',
        type: "'success' | 'warning' | 'info' | 'error' | 'normal'",
        default: "' '",
    },
    {
        param: 'title',
        description: '标题',
        type: 'string',
        default: "' '",
    },
    {
        param: 'content',
        description: '内容',
        type: 'string',
        default: "' '",
    },
    {
        param: 'closeOnClickOverlay',
        description: '点击遮罩层关闭弹窗',
        type: 'boolean',
        default: 'true',
    },
    {
        param: 'layout',
        description: '布局',
        type: "'normal' | 'easy'",
        default: 'normal',
    },
    {
        param: 'ok',
        description: '确认回调',
        type: 'function',
        default: '',
    },
    {
        param: 'cancel',
        description: '取消回调',
        type: 'function',
        default: '',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Dialog</lew-title>
        <p class="sub-title">
            如果你需要更简单的询问框，请可以尝试一下
            <lew-mark type="info" to="/Popok">Popok</lew-mark>
        </p>
        <lew-demo-box title="快捷唤起" :code="DemoDialog1_code">
            <demo-dialog1>删除</demo-dialog1></lew-demo-box
        >
        <lew-title :size="16">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
