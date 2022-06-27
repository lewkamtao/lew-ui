<script setup lang="ts">
import {
    DemoCheckbox1,
    DemoCheckbox2,
    DemoCheckbox3,
    DemoCheckbox4,
    DemoCheckbox1_code,
    DemoCheckbox2_code,
    DemoCheckbox3_code,
    DemoCheckbox4_code,
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
        <lew-title>Checkbox</lew-title>
        <p class="sub-title">通过复选框选择一个或多个数据。</p>
        <lew-demo-box title="x 布局" tag="方的" :code="DemoCheckbox1_code">
            <demo-checkbox1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" tag="圆的" :code="DemoCheckbox2_code">
            <demo-checkbox2
        /></lew-demo-box>
        <lew-demo-box title="块" :code="DemoCheckbox3_code" tag="方的">
            <demo-checkbox3 />
        </lew-demo-box>
        <lew-demo-box title="块" :code="DemoCheckbox4_code" tag="圆的">
            <demo-checkbox4 />
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
