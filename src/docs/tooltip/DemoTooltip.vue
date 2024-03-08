<script setup lang="ts">
    import { DemoTooltip1, DemoTooltip2, DemoTooltip1Code, DemoTooltip2Code } from './demo';
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
        <lew-title>Tooltip</lew-title>
        <lew-demo-box title="悬浮显示" tag="推荐" :code="DemoTooltip1Code">
            <demo-tooltip1 />
        </lew-demo-box>
        <lew-demo-box title="点击事件触发" :code="DemoTooltip2Code">
            <demo-tooltip2 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
