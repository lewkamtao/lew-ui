<script setup lang="ts">
import {
    DemoInput1,
    DemoInput2,
    DemoInput3,
    DemoInput4,
    DemoInput1_code,
    DemoInput2_code,
    DemoInput3_code,
    DemoInput4_code,
} from './demo';
import LewDemoBox from '../../layout/LewDemoBox.vue';
import LewDocsTables from '../../layout/LewDocsTables.vue';

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
                default: "-",
            },
            {
                param: 'size',
                description: '尺寸',
                type: 'small ｜ medium ｜ large',
                default: 'text',
            },
            {
                param: 'disabled',
                description: '禁用',
                type: 'boolean',
                default: 'false',
            },
            {
                param: 'placeholder',
                description: '默认提示',
                type: 'string',
                default: '请输入',
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
            {
                param: 'clear',
                description: '清空触发的回调方法',
                type: '(e: value) => void',
                default: '-',
            },
            {
                param: 'auto-width',
                description: '宽度自动',
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
                param: 'input',
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
        ],
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Input</lew-title>
        <lew-demo-box title="尺寸" :code="DemoInput1_code">
            <demo-input1 />
        </lew-demo-box>
        <lew-demo-box title="字数限制" :code="DemoInput2_code">
            <demo-input2 />
        </lew-demo-box>
        <lew-demo-box title="密码可见" :code="DemoInput3_code">
            <demo-input3 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoInput4_code">
            <demo-input4 />
        </lew-demo-box>
        <lew-demo-box title="尺寸" :code="DemoInput1_code">
            <demo-input1 />
        </lew-demo-box>
        <lew-demo-box title="字数限制" :code="DemoInput2_code">
            <demo-input2 />
        </lew-demo-box>
        <lew-demo-box title="密码可见" :code="DemoInput3_code">
            <demo-input3 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoInput4_code">
            <demo-input4 />
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

<style lang="scss" scoped>
.scroll-x {
    width: 100%;
    overflow-x: auto;
}
</style>
