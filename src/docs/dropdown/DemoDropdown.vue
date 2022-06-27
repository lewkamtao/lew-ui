<script setup lang="ts">
import { ref } from 'vue';
import {
    DemoDropdown1,
    DemoDropdown2,
    DemoDropdown3,
    DemoDropdown1_code,
    DemoDropdown2_code,
    DemoDropdown3_code,
} from './demo';

const docsTable = ref([
    {
        param: 'options',
        description: '列表配置',
        type: 'array',
        default: '[]',
    },
    {
        param: 'trigger',
        description: '触发方式',
        type: `hover | click`,
        default: 'hover',
    },
    {
        param: 'placement',
        description: '下拉展示的位置',
        type: 'string',
        default: 'bottom',
    },
    {
        param: 'width',
        description: '下拉气泡宽度',
        type: 'string(px)',
        default: "''",
    },
    {
        param: 'arrow',
        description: '是否显示箭头',
        type: 'boolean',
        default: 'false',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Dropdown</lew-title>
        <p class="sub-title">
            你可以使用
            <lew-mark link="/Popover" type="info">Popover</lew-mark>
            进行高度自定义下拉菜单
        </p>
        <lew-demo-box title="常规" :code="DemoDropdown1_code">
            <demo-dropdown1 />
        </lew-demo-box>
        <lew-demo-box title="不仅仅是按钮" :code="DemoDropdown2_code">
            <demo-dropdown2 />
        </lew-demo-box>
        <lew-demo-box title="无箭头" :code="DemoDropdown3_code">
            <demo-dropdown3 />
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
        <p class="demo-tips">
            你可以在
            <lew-mark link="/Tooltip" type="info">Tooltip</lew-mark>
            找到你需要的位置参数。
        </p>
    </div>
</template>
