<script setup lang="ts">
import {
    DemoInputPro1,
    DemoInputPro2,
    DemoInputPro1_code,
    DemoInputPro2_code,
} from './demo';
import LewDemoBox from '../../layout/LewDemoBox.vue';
import LewDocsTables from '../../layout/LewDocsTables.vue';

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
                name: 'type',
                description: '输入框类型',
                type: 'string',
                default: 'text',
            },
            {
                name: 'model-value (v-model)',
                description: '绑定值',
                type: 'string',
                default: '-',
            },

            {
                name: 'disabled',
                description: '禁用',
                type: 'boolean',
                default: 'false',
            },
            {
                name: 'placeholder',
                description: '默认提示',
                type: 'string',
                default: '请输入',
            },
            {
                name: 'readonly',
                description: '是否只读',
                type: 'boolean',
                default: 'false',
            },
            {
                name: 'clearable',
                description: '是否可清空',
                type: 'boolean',
                default: false,
            },
            {
                name: 'clear',
                description: '清空触发的回调方法',
                type: '(e: value) => void',
                default: '-',
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
                name: 'input',
                description: '输入',
                type: '() => void',
                default: 'false',
            },
            {
                name: 'change',
                description: '值变化',
                type: '() => void',
                default: 'false',
            },
            {
                name: 'blur',
                description: '失焦',
                type: '() => void',
                default: 'false',
            },
            {
                name: 'focus',
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
        <lew-title>InputPro</lew-title>
        <p class="sub-title">这是一个增强版的输入框，新增：预选择</p>
        <lew-demo-box title="x 布局" :code="DemoInputPro1_code">
            <demo-input-pro1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" :code="DemoInputPro2_code">
            <demo-input-pro2 />
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
