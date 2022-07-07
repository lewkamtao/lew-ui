<script setup lang="ts">
import {
    DemoInput1,
    DemoInput2,
    DemoInput3,
    DemoInput4,
    DemoInput5,
    DemoInput1_code,
    DemoInput2_code,
    DemoInput3_code,
    DemoInput4_code,
    DemoInput5_code,
} from './demo';

import { ref } from 'vue';

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
];const docsTable1 = ref([
    {
        param: 'type',
        description: '输入框类型',
        type: 'string',
        default: 'text',
    },
    {
        param: 'model-value (v-model)',
        description: '绑定值',
        type: 'string',
        default: "''",
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
]);
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
];const docsTable2 = ref([
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
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Input</lew-title>
        <lew-demo-box title="x 布局" :code="DemoInput1_code">
            <demo-input1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" :code="DemoInput2_code">
            <demo-input2 />
        </lew-demo-box>
        <lew-demo-box title="可清空" :code="DemoInput3_code">
            <demo-input3 />
        </lew-demo-box>
        <lew-demo-box title="显示密码" :code="DemoInput4_code">
            <demo-input4 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoInput5_code">
            <demo-input5 />
        </lew-demo-box>
        <lew-title size="16px">Props</lew-title>
        <vxe-table :data="docsTable1">
            <vxe-column
                show-overflow
                field="param"
                width="220px"
                title="参数名"
            ></vxe-column>
            <vxe-column
                show-overflow
                field="description"
                title="描述"
            ></vxe-column>
            <vxe-column
                show-overflow
                width="300"
                field="type"
                title="类型"
            ></vxe-column>
            <vxe-column
                show-overflow
                field="default"
                title="默认值"
            ></vxe-column>
        </vxe-table>
        <lew-title style="margin-top: 40px" size="16px">Event</lew-title>
        <vxe-table :data="docsTable2">
            <vxe-column
                show-overflow
                field="param"
                width="220px"
                title="参数名"
            ></vxe-column>
            <vxe-column
                show-overflow
                field="description"
                title="描述"
            ></vxe-column>
            <vxe-column
                show-overflow
                width="300"
                field="type"
                title="类型"
            ></vxe-column>
        </vxe-table>
    </div>
</template>
