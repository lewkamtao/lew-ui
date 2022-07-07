<!--
 * @Author: Kamtao
 * @Date: 2022-07-04 12:15:55
 * @LastEditTime: 2022-07-07 16:23:27
 * @Description: 
-->
<script setup lang="ts">
import { ref } from 'vue';
import { DemoPlyrVideo1, DemoPlyrVideo1_code } from './demo';

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
        param: 'url',
        description: '视频链接',
        type: 'string',
        default: `''`,
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>PlyrVideo</lew-title>
        <lew-demo-box title="普通" :code="DemoPlyrVideo1_code">
            <demo-plyr-video1 />
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
