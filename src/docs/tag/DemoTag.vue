<script setup lang="ts">
import {
    DemoTag1,
    DemoTag2,
    DemoTag3,
    DemoTag4,
    DemoTag5,
    DemoTag6,
    DemoTag1_code,
    DemoTag2_code,
    DemoTag3_code,
    DemoTag4_code,
    DemoTag5_code,
    DemoTag6_code,
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
        <lew-title>Tag</lew-title>
        <lew-demo-box title="基本用法" :code="DemoTag1_code">
            <demo-tag1 />
        </lew-demo-box>
        <lew-demo-box title="尺寸" :code="DemoTag2_code">
            <demo-tag2 />
        </lew-demo-box>
        <lew-demo-box title="色彩系统" :code="DemoTag3_code">
            <demo-tag3 />
        </lew-demo-box>
        <lew-demo-box title="禁用与关闭" :code="DemoTag4_code">
            <demo-tag4 />
        </lew-demo-box>
        <lew-demo-box title="前后插槽" :code="DemoTag5_code">
            <demo-tag5 />
        </lew-demo-box>
        <lew-demo-box v-if="false" title="Disabled" :code="DemoTag6_code">
            <demo-tag6 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
