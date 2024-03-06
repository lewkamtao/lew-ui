<script setup lang="ts">
import { DemoMessage1, DemoMessage1Code } from './demo';
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
        <lew-title>Message</lew-title>
        <lew-demo-box title="快捷唤起" :code="DemoMessage1Code">
            <demo-message1>删除</demo-message1></lew-demo-box
        >
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
