<script setup lang="ts">
import {
    DemoTooltip1,
    DemoTooltip2,
    DemoTooltip1_code,
    DemoTooltip2_code,
} from './demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Tooltip</lew-title>
        <lew-demo-box title="悬浮显示" badge="推荐" :code="DemoTooltip1_code">
            <demo-tooltip1 />
        </lew-demo-box>
        <lew-demo-box title="点击事件触发" :code="DemoTooltip2_code">
            <demo-tooltip2 />
        </lew-demo-box>
    </div>
</template>
