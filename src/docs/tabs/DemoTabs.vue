<!--
 * @Author: Kamtao
 * @Date: 2022-06-28 09:42:26
 * @LastEditTime: 2022-07-07 17:59:36
 * @Description: 
-->
<script setup lang="ts">
import { DemoTabs1, DemoTabs1_code } from './demo';
import { ref, reactive } from 'vue';

const docsTable = reactive([
    {
        desc: 'Props',
        columns: [
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
        ],
        data: [
            {
                param: 'modelValue',
                description: '配置表',
                type: 'options',
                default: '[]',
            },
            {
                param: 'options',
                description: '显示类型',
                type: `options`,
                default: 'sprit',
            },
        ],
    },
    {
        desc: 'Options',
        columns: [
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
        ],
        data: [
            {
                param: 'label',
                description: '文本内容',
                type: 'string',
                default: "''",
            },
            {
                param: 'value',
                description: '值',
                type: `string`,
                default: "''",
            },
            {
                param: 'activeIndex',
                description: '选中的索引',
                type: `nubmer`,
                default: "''",
            },
        ],
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Tabs</lew-title>
        <lew-demo-box title="常规" :code="DemoTabs1_code">
            <demo-tabs1
        /></lew-demo-box>
        <div v-for="(item, index) in docsTable" :key="index">
            <br />
            <br />
            <lew-title size="16px">{{ item.desc }}</lew-title>
            <lew-table :data="item.data" :columns="item.columns" height="auto">
                <template #param="{ row }"> {{ row.param }} </template>
                <template #description="{ row }">
                    {{ row.description }}
                </template>
                <template #type="{ row }"> {{ row.type }} </template>
                <template #default="{ row }"> {{ row.default }} </template>
            </lew-table>
        </div>
    </div>
</template>
