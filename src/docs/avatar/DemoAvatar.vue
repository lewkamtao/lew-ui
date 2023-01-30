<script setup lang="ts">
import {
    DemoAvatar1,
    DemoAvatar2,
    DemoAvatar1_code,
    DemoAvatar2_code,
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
        param: 'src',
        description: '链接',
        type: 'string',
        default: `''`,
    },
    {
        param: 'alt',
        description: '原生属性',
        type: 'string',
        default: "''",
    },
    {
        param: 'round',
        description: '形状，是否为圆形。',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'status',
        description: '状态',
        type: 'online｜processing｜away｜offline｜busy',
        default: "''",
    },
    {
        param: 'status-position',
        description: '状态标记位置',
        type: 'top-left｜top-right｜bottom-left｜bottom-right',
        default: 'bottom-right',
    },
    {
        param: 'width',
        description: '宽度',
        type: 'string｜number',
        default: "''",
    },
    {
        param: 'height',
        description: '高度',
        type: 'string｜number',
        default: "''",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Avatar</lew-title>
        <p class="sub-title">
            如果你需要为你的头像加上消息的数量，你可以移步
            <lew-mark type="info" to="/Badge">Badge</lew-mark>
        </p>
        <lew-demo-box title="普通" :code="DemoAvatar1_code">
            <demo-avatar1 />
        </lew-demo-box>
        <lew-demo-box title="状态" :code="DemoAvatar2_code">
            <demo-avatar2 />
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
.lew-avatar {
    margin: 10px;
}
</style>
