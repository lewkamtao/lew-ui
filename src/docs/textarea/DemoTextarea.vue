<script setup lang="ts">
    import {
        DemoTextarea1,
        DemoTextarea2,
        DemoTextarea3,
        DemoTextarea1Code,
        DemoTextarea2Code,
        DemoTextarea3Code
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
        <lew-demo-box title="尺寸" :code="DemoTextarea1Code">
            <demo-textarea1 />
        </lew-demo-box>
        <lew-demo-box title="字数限制" :code="DemoTextarea2Code">
            <demo-textarea2 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoTextarea3Code">
            <demo-textarea3 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
