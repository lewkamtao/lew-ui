<script setup lang="ts">
import {
    DemoTextarea1,
    DemoTextarea2,
    DemoTextarea3,
    DemoTextarea1_code,
    DemoTextarea2_code,
    DemoTextarea3_code,
} from './demo';

import { ref } from 'vue';

const docsTable1 = ref([
    {
        param: 'type',
        description: '类型',
        type: 'string',
        default: "'text'",
    },
    {
        param: 'model-value (v-model)',
        description: '绑定值',
        type: 'string',
        default: "''",
    },
    {
        param: 'disabled',
        description: '是否禁用',
        type: 'string',
        default: "'text'",
    },
    {
        param: 'placeholder',
        description: '提示语',
        type: 'string',
        default: "'请输入'",
    },
    {
        param: 'readonly',
        description: '是否只读',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'resize',
        description: '缩放模式',
        type: 'string',
        default: 'none',
    },
    {
        param: 'maxLength',
        description: '字符最大长度',
        type: 'number',
        default: 'null',
    },
    {
        param: 'showCount',
        description: '是否展示字数',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'niceCount',
        description: '字数计算方式是否按照：中文2个，英文1个',
        type: 'boolean',
        default: 'false',
    },
]);

const docsTable2 = ref([
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
        <lew-title>Textera</lew-title>
        <lew-demo-box title="常规" :code="DemoTextarea1_code">
            <demo-textarea1 />
        </lew-demo-box>
        <lew-demo-box title="显示字数" :code="DemoTextarea2_code">
            <demo-textarea2 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoTextarea3_code">
            <demo-textarea3 />
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
