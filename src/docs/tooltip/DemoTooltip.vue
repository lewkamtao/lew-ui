<script setup lang="ts">
import {
    DemoTooltip1,
    DemoTooltip2,
    DemoTooltip1_code,
    DemoTooltip2_code,
} from './demo';
import { ref } from 'vue';

const docsTable = ref([
    {
        param: 'content',
        description: '内容',
        type: 'string',
        default: "''",
    },
    {
        param: 'placement',
        description: '位置',
        type: 'string',
        default: "''",
    },
    {
        param: 'trigger',
        description: '触发方式',
        type: 'hover | click',
        default: 'hover',
    },
    {
        param: 'allowHTML',
        description: '是否支持HTML',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'arrow',
        description: '是否需要箭头',
        type: 'boolean',
        default: 'true',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Tooltip</lew-title>
        <lew-demo-box title="悬浮显示" tag="推荐" :code="DemoTooltip1_code">
            <demo-tooltip1 />
        </lew-demo-box>
        <lew-demo-box title="点击事件触发" :code="DemoTooltip2_code">
            <demo-tooltip2 />
        </lew-demo-box>
        <lew-title size="16px">v-tooltip</lew-title>
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
