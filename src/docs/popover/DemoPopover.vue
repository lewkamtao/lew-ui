<script setup lang="ts">
import { DemoPopover1, DemoPopover1_code } from './demo';
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
        <lew-title>Popover</lew-title>
        <p class="sub-title">
            如果你需要信息提示，请可以尝试一下
            <lew-mark type="light" color="blue" to="/Tooltip">Tooltip</lew-mark>
        </p>
        <lew-demo-box
            title="询问校验"
            badge="自定义 HTML"
            :code="DemoPopover1_code"
        >
            <demo-popover1></demo-popover1>
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
