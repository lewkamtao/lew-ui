<script setup lang="ts">
import {
    DemoNotification1,
    DemoNotification1_code,
    DemoNotification2,
    DemoNotification2_code,
} from './demo';

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
        param: 'options',
        description: '列表配置',
        type: 'array',
        default: '[]',
    },
    {
        param: 'delay',
        description: '通知的展示时长，设为0时则不会自动关闭',
        type: 'number',
        default: '3000',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Notification</lew-title>
        <lew-demo-box title="快捷唤起" :code="DemoNotification1_code">
            <demo-notification1>删除</demo-notification1></lew-demo-box
        >
        <lew-demo-box title="自定义展示时间" :code="DemoNotification2_code">
            <demo-notification2></demo-notification2
        ></lew-demo-box>
        <lew-title size="16px">Props</lew-title>
        <lew-table :data-source="docsTable" :columns="columns" height="auto">
            <template #param="{ row }"> {{ row.param }} </template>
            <template #description="{ row }"> {{ row.description }} </template>
            <template #type="{ row }"> {{ row.type }} </template>
            <template #default="{ row }"> {{ row.default }} </template>
        </lew-table>
    </div>
</template>
