<script setup lang="ts">
import {
    DemoCheckbox1,
    DemoCheckbox2,
    DemoCheckbox3,
    DemoCheckbox4,
    DemoCheckbox5,
    DemoCheckbox1_code,
    DemoCheckbox2_code,
    DemoCheckbox3_code,
    DemoCheckbox4_code,
    DemoCheckbox5_code,
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
        <lew-title>Checkbox</lew-title>
        <p class="sub-title">通过复选框选择一个或多个数据。</p>
        <lew-demo-box title="常规" :code="DemoCheckbox1_code">
            <demo-checkbox1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" :code="DemoCheckbox2_code">
            <demo-checkbox2
        /></lew-demo-box>
        <lew-demo-box title="块" :code="DemoCheckbox3_code" tag="方的">
            <demo-checkbox3 />
        </lew-demo-box>
        <lew-demo-box title="块" :code="DemoCheckbox4_code" tag="圆的">
            <demo-checkbox4 />
        </lew-demo-box>
        <lew-demo-box title="单个模式" :code="DemoCheckbox5_code">
            <demo-checkbox5 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
