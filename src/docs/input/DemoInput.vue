<script setup lang="ts">
import {
    DemoInput1,
    DemoInput2,
    DemoInput1_code,
    DemoInput2_code,
} from './demo';

import { ref } from 'vue';

const docsTable = ref([
    {
        param: 'model-value (v-model)',
        description: '绑定值',
        type: 'string',
        default: "''",
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
