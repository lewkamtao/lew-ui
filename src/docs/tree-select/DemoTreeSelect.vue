<script setup lang="ts">
    import { DemoTreeSelect1, DemoTreeSelect1Code } from './demo';
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
        <lew-title>TreeSelect</lew-title>
        <lew-demo-box title="状态" :code="DemoTreeSelect1Code">
            <demo-tree-select1 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
