<script setup lang="ts">
import {
    DemoBackTop1,
    DemoBackTop1Code,
    DemoBackTop2,
    DemoBackTop2Code,
    DemoBackTop3,
    DemoBackTop3Code,
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
        <lew-title>BackTop</lew-title>
        <lew-demo-box title="基础用法" :code="DemoBackTop1Code">
            <demo-back-top1 />
        </lew-demo-box>
        <lew-demo-box title="自定义内容" :code="DemoBackTop2Code">
            <demo-back-top2 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
        <lew-demo-box title="指令" :code="DemoBackTop3Code">
            <demo-back-top3 />
        </lew-demo-box>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;

    > div {
        margin-bottom: 40px;
    }
}
</style>
