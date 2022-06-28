<script setup lang="ts">
import { DemoPopover1, DemoPopover1_code } from './demo';
import { ref } from 'vue';

const docsTable = ref([
    {
        param: 'options',
        description: '列表配置',
        type: 'array',
        default: '[]',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Popover</lew-title>
        <p class="sub-title">
            如果你需要信息提示，请可以尝试一下
            <lew-mark type="info" to="/Tooltip">Tooltip</lew-mark>
        </p>
        <lew-demo-box
            title="询问校验"
            badge="自定义 HTML"
            :code="DemoPopover1_code"
        >
            <demo-popover1></demo-popover1>
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
