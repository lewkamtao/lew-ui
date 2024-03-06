<script setup lang="ts">
import {
    DemoButton1,
    DemoButton2,
    DemoButton3,
    DemoButton4,
    DemoButton5,
    DemoButton6,
    DemoButton7,
    DemoButton1Code,
    DemoButton2Code,
    DemoButton3Code,
    DemoButton4Code,
    DemoButton5Code,
    DemoButton6Code,
    DemoButton7Code,
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
        <lew-demo-box title="基本用法" :code="DemoButton1Code">
            <demo-button1 />
        </lew-demo-box>
        <lew-demo-box title="尺寸" :code="DemoButton2Code"
            ><demo-button7 />
        </lew-demo-box>
        <lew-demo-box title="色彩系统" :code="DemoButton2Code"
            ><demo-button2 />
        </lew-demo-box>
        <lew-demo-box title="Icon Text" :code="DemoButton3Code"
            ><demo-button3 />
        </lew-demo-box>
        <lew-demo-box title="Loading" :code="DemoButton4Code">
            <demo-button4 />
        </lew-demo-box>
        <lew-demo-box title="Disabled" :code="DemoButton5Code">
            <demo-button5 />
        </lew-demo-box>
        <lew-demo-box title="模拟请求" :code="DemoButton6Code">
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
