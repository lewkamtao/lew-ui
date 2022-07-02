<script setup lang="ts">
import {
    DemoInput1,
    DemoInput2,
    DemoInput3,
    DemoInput1_code,
    DemoInput2_code,
    DemoInput3_code,
} from './demo';

import { ref } from 'vue';

const docsTable = ref([
    {
        param: 'model-value (v-model)',
        description: '绑定值',
        type: 'string',
        default: "''",
    },
    {
        param: 'clearable',
        description: '是否可清空',
        type: 'boolean',
        default: false,
    },
    {
        param: 'clear',
        description: '清空按钮',
        type: 'event',
        default: '',
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
        <lew-title size="16px">Props</lew-title>
        <vxe-table :data="docsTable">
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
    </div>
</template>
