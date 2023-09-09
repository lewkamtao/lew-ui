<script setup lang="ts">
import {
    DemoTextarea1,
    DemoTextarea2,
    DemoTextarea3,
    DemoTextarea1_code,
    DemoTextarea2_code,
    DemoTextarea3_code,
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
        <lew-title>Textarea</lew-title>
        <lew-demo-box title="尺寸" :code="DemoTextarea1_code">
            <demo-textarea1 />
        </lew-demo-box>
        <lew-demo-box title="字数限制" :code="DemoTextarea2_code">
            <demo-textarea2 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoTextarea3_code">
            <demo-textarea3 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
