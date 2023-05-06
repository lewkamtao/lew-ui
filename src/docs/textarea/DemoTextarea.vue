<script setup lang="ts">
import {
    DemoTextarea1,
    DemoTextarea2,
    DemoTextarea3,
    DemoTextarea1_code,
    DemoTextarea2_code,
    DemoTextarea3_code,
} from './demo';

const docsTable = reactive([
    {
        desc: 'Props',
        columns: [
            {
                title: '参数名',
                width: 150,
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
                width: 220,
                field: 'description',
            },
        ],
        data: [
            {
                param: 'model-value (v-model)',
                description: '绑定值',
                type: 'string',
                default: "''",
            },
            {
                param: 'size',
                description: '尺寸',
                type: 'small ｜ medium ｜ large',
                default: 'text',
            },
            {
                param: 'placeholder',
                description: '默认提示',
                type: 'string',
                default: '请输入',
            },
            {
                param: 'disabled',
                description: '禁用',
                type: 'boolean',
                default: 'false',
            },
            {
                param: 'readonly',
                description: '是否只读',
                type: 'boolean',
                default: 'false',
            },
            {
                param: 'clearable',
                description: '是否可清空',
                type: 'boolean',
                default: false,
            },
        ],
    },
    {
        desc: 'Event',
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
                param: 'textarea',
                description: '输入',
                type: '() => void',
                default: 'false',
            },
            {
                param: 'change',
                description: '值变化',
                type: '() => void',
                default: 'false',
            },
            {
                param: 'blur',
                description: '失焦',
                type: '() => void',
                default: 'false',
            },
            {
                param: 'focus',
                description: '聚焦',
                type: '() => void',
                default: 'false',
            },
            {
                param: 'clear',
                description: '清空触发的回调方法',
                type: '(e: value) => void',
                default: '-',
            },
        ],
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Textarea</lew-title>
        <lew-demo-box title="尺寸" :code="DemoTextarea1_code">
            <demo-textarea1 />
        </lew-demo-box>
        <lew-demo-box title="字数限制" :code="DemoTextarea2_code">
            <demo-textarea2 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoTextarea3_code">
            <demo-textarea3 />
        </lew-demo-box>
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
