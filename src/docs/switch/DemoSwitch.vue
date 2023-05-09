<script setup lang="ts">
import {
    DemoSwitch1,
    DemoSwitch2,
    DemoSwitch1_code,
    DemoSwitch2_code,
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
        <lew-title>Switch</lew-title>
        <lew-demo-box title="圆的" :code="DemoSwitch1_code">
            <demo-switch1 />
        </lew-demo-box>
        <lew-demo-box title="方的" :code="DemoSwitch2_code">
            <demo-switch2 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
