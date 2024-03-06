<script setup lang="ts">
import {
    DemoTitle1,
    DemoTitle2,
    DemoTitle3,
    DemoTitle1Code,
    DemoTitle2Code,
    DemoTitle3Code,
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
        <lew-title>Title</lew-title>
        <lew-demo-box title="普通" :code="DemoTitle1Code">
            <demo-title1 />
        </lew-demo-box>
        <lew-demo-box title="粗体" :code="DemoTitle2Code">
            <demo-title2 />
        </lew-demo-box>
        <lew-demo-box title="主题色" :code="DemoTitle3Code">
            <demo-title3 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
