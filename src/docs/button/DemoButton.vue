<script setup lang="ts">
import {
    DemoButton1,
    DemoButton2,
    DemoButton3,
    DemoButton4,
    DemoButton5,
    DemoButton6,
    DemoButton1_code,
    DemoButton2_code,
    DemoButton3_code,
    DemoButton4_code,
    DemoButton5_code,
    DemoButton6_code,
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
        <lew-demo-box title="常规" :code="DemoButton1_code">
            <demo-button1 />
        </lew-demo-box>
        <lew-demo-box title="尺寸" :code="DemoButton2_code">
            <demo-button2 />
        </lew-demo-box>
        <lew-demo-box title="圆形" :code="DemoButton3_code">
            <demo-button3 />
        </lew-demo-box>
        <lew-demo-box title="加载" :code="DemoButton4_code"
            ><demo-button4 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoButton5_code"
            ><demo-button5 />
        </lew-demo-box>
        <lew-demo-box title="图标" :code="DemoButton6_code"
            ><demo-button6 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>

<style lang="scss" scoped>
.lew-button {
    margin: 10px;
}
</style>
