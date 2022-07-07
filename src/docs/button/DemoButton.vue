<script setup lang="ts">
import {
    DemoButton1,
    DemoButton2,
    DemoButton3,
    DemoButton4,
    DemoButton5,
    DemoButton1_code,
    DemoButton2_code,
    DemoButton3_code,
    DemoButton4_code,
    DemoButton5_code,
} from './demo';
import { ref } from 'vue';

const docsTable = ref([
    {
        param: 'type',
        description: '色彩类型',
        type: 'primary | normal | success | error | warning',
        default: `primary`,
    },
    {
        param: 'size',
        description: '尺寸大小',
        type: 'small ｜ medium ｜ large',
        default: 'medium',
    },
    {
        param: 'loading',
        description: '是否为加载状态',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'round',
        description: '是否为圆角',
        type: 'boolean',
        default: 'false',
    },
    {
        param: 'disabled',
        description: '禁用',
        type: 'boolean',
        default: 'false',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Button</lew-title>
        <p class="sub-title">
            这里仅用了一个元素来实现这个组件，我希望Lew是极简的。
        </p>
        <lew-demo-box title="普通" :code="DemoButton1_code"
            ><demo-button1 />
        </lew-demo-box>
        <lew-demo-box title="尺寸" :code="DemoButton2_code"
            ><demo-button2 />
        </lew-demo-box>
        <lew-demo-box title="圆形" :code="DemoButton3_code"
            ><demo-button3 />
        </lew-demo-box>
        <lew-demo-box title="加载" :code="DemoButton4_code"
            ><demo-button4 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoButton5_code"
            ><demo-button5 />
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

<style lang="scss" scoped>
.lew-button {
    margin: 10px;
}
</style>
