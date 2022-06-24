<script setup lang="ts">
import { DemoTooltip1, DemoTooltip2 } from '../../demo';
import { ref } from 'vue';
let pre1 = ref(``);
let pre2 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Tooltip</lew-title>
        <lew-demo-box title="悬浮显示" badge="推荐" :code="pre1">
            <demo-tooltip1 />
        </lew-demo-box>
        <lew-demo-box title="点击事件触发" :code="pre2">
            <demo-tooltip2 />
        </lew-demo-box>
    </div>
</template>
