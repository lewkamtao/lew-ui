<script setup lang="ts">
import {
    DemoButton1,
    DemoButton2,
    DemoButton3,
    DemoButton4,
    DemoButton5,
    DemoButton6,
    DemoButton7,
    DemoButton1_code,
    DemoButton2_code,
    DemoButton3_code,
    DemoButton4_code,
    DemoButton5_code,
    DemoButton6_code,
    DemoButton7_code,
} from './demo';
import LewDemoBox from '../../layout/LewDemoBox.vue';
import LewDocsTables from '../../layout/LewDocsTables.vue';
import * as API from './api';

const options = ref(
    Object.keys(API).map((key: any) => {
        // @ts-ignore
        return API[key];
    })
);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Button</lew-title>
        <p class="sub-title">赏心悦目的异步效果</p>
        <lew-demo-box title="基本用法" :code="DemoButton1_code">
            <demo-button1 />
        </lew-demo-box>
        <lew-demo-box title="尺寸" :code="DemoButton2_code"
            ><demo-button7 />
        </lew-demo-box>
        <lew-demo-box title="色彩系统" :code="DemoButton2_code"
            ><demo-button2 />
        </lew-demo-box>
        <lew-demo-box title="Icon Text" :code="DemoButton3_code"
            ><demo-button3 />
        </lew-demo-box>
        <lew-demo-box title="Loading" :code="DemoButton4_code">
            <demo-button4 />
        </lew-demo-box>
        <lew-demo-box title="Disabled" :code="DemoButton5_code">
            <demo-button5 />
        </lew-demo-box>
        <lew-demo-box title="模拟请求" :code="DemoButton6_code">
            <demo-button6 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>

<style lang="scss" scoped>
.lew-button {
    margin: 10px;
}
</style>
