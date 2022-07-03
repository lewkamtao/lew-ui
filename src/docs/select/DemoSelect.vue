<script setup lang="ts">
import {
    DemoSelect1,
    DemoSelect1_code,
    DemoSelect2,
    DemoSelect2_code,
} from './demo';
import { ref } from 'vue';
const docsTable = ref([
    {
        param: 'model-value (v-model)',
        description: '绑定值',
        type: 'string | array',
        default: "''",
    },
    {
        param: 'options',
        description: '选项',
        type: 'options',
        default: '[]',
    },
    {
        param: 'trigger',
        description: '触发方式',
        type: 'click | hover',
        default: 'click',
    },
    {
        param: 'multiple',
        description: '多选模式，开启后，v-model需要是数组类型',
        type: 'boolean',
        default: 'false',
    },
]);

const optionsTable = ref([
    {
        param: 'label',
        description: '选项组的标签',
        type: 'string',
        default: "''",
    },
    {
        param: 'value',
        description: '值',
        type: `string`,
        default: "''",
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Select</lew-title>
        <lew-demo-box title="触发方式" :code="DemoSelect1_code">
            <demo-select1 />
        </lew-demo-box>
        <lew-demo-box title="多选" :code="DemoSelect2_code">
            <demo-select2 />
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
        <lew-title style="margin-top: 40px" size="16px">Options</lew-title>
        <vxe-table :data="optionsTable">
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
