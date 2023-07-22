<script setup lang="ts">
import {
    DemoDialog1,
    DemoDialog1_code,
    DemoDialog2,
    DemoDialog2_code,
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
        <lew-title>Dialog</lew-title>
        <p class="sub-title">
            如果你需要更简单的询问框，请可以尝试一下
            <lew-mark type="light" color="blue" to="/Popok">Popok</lew-mark>
        </p>
        <lew-demo-box title="快捷唤起" :code="DemoDialog1_code">
            <demo-dialog1 />
        </lew-demo-box>
        <lew-demo-box title="快捷唤起" :code="DemoDialog2_code">
            <demo-dialog2 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
