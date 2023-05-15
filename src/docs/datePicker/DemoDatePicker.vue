<script setup lang="ts">
import { DemoDatePicker1, DemoDatePicker1_code } from './demo';
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
        <lew-title>DatePicker</lew-title>
        <p class="sub-title">一个很漂亮的、支持双向绑定的日期选择器。</p>
        <lew-demo-box title="常规" :code="DemoDatePicker1_code">
            <demo-date-picker1 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
