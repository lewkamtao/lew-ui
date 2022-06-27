<script setup lang="ts">
import {
    DemoRadio1,
    DemoRadio2,
    DemoRadio3,
    DemoRadio1_code,
    DemoRadio2_code,
    DemoRadio3_code,
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
        <lew-title>Radio</lew-title>
        <lew-demo-box title="x 布局" :code="DemoRadio1_code">
            <demo-radio1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" :code="DemoRadio2_code">
            <demo-radio2
        /></lew-demo-box>
        <lew-demo-box title="块" :code="DemoRadio3_code"
            ><demo-radio3 />
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
