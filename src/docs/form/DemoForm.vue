<script setup lang="ts">
import {
    DemoForm1,
    DemoForm1_code,
    DemoForm2,
    DemoForm2_code,
    DemoForm3,
    DemoForm3_code,
    DemoForm4,
    DemoForm4_code,
    DemoForm5,
    DemoForm5_code,
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
        <lew-title>Form</lew-title>
        <p class="sub-title">这是一个基于Yup实现的表单校验引擎。</p>

        <lew-demo-box title="普通表单" :code="DemoForm1_code">
            <demo-form1 />
        </lew-demo-box>

        <lew-demo-box title="方向" :code="DemoForm2_code">
            <demo-form2 />
        </lew-demo-box>
        <lew-demo-box title="自定义校验" :code="DemoForm3_code">
            <demo-form3 />
        </lew-demo-box>
        <lew-demo-box v-if="false" title="总览" :code="DemoForm4_code">
            <demo-form4 />
        </lew-demo-box>
        <lew-demo-box v-if="false" title="其他" :code="DemoForm5_code">
            <demo-form5 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
