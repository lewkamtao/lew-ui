<script setup lang="ts">
import { DemoTabs1, DemoTabs2, DemoTabs1_code, DemoTabs2_code } from './demo';

const docsTable = reactive([
    {
        desc: 'Props',
        columns: [
            {
                title: '参数名',
                width: 120,
                field: 'param',
            },

            {
                title: '类型',
                width: 120,
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
        ],
        data: [
            {
                param: 'modelValue',
                description: '值',
                type: 'string | number',
                default: `''`,
            },
            {
                param: 'options',
                description: '配置',
                type: `TabsOptions`,
                default: [],
            },
            {
                param: 'width',
                description: '宽度',
                type: `number`,
                default: '',
            },
            {
                param: 'itemWidth',
                description: 'item 宽度',
                type: `number`,
                default: '',
            },
            {
                param: 'round',
                description: '是否圆角',
                type: `boolean`,
                default: 'false',
            },
            {
                param: 'type',
                description: '类型',
                type: `block | line`,
                default: 'block',
            },
        ],
    },
    {
        desc: 'TabsOptions',
        columns: [
            {
                title: '参数名',
                width: 120,
                field: 'param',
            },
            {
                title: '类型',
                width: 120,
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
                type: `number`,
                default: "''",
            },
        ],
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Tabs</lew-title>
        <p class="sub-title"></p>
        <lew-demo-box title="常规" :code="DemoTabs1_code">
            <demo-tabs1 />
            <lew-alert
                style="margin-top: 20px"
                :size="16"
                :list="[
                    {
                        type: 'info',
                        title: '提示',
                        content: `值得注意的是，按住Shift，上下滑动滚轮，可以实现横向滑动。`,
                    },
                ]"
            />
        </lew-demo-box>
        <lew-demo-box title="圆形" :code="DemoTabs2_code">
            <demo-tabs2
        /></lew-demo-box>
        <div v-for="(item, index) in docsTable" :key="index">
            <br />
            <br />
            <lew-title :size="16">{{ item.desc }}</lew-title>
            <lew-table
                :data-source="item.data"
                :columns="item.columns"
                height="auto"
            >
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
