<template>
    <div class="demo-wrapper">
        <lew-title>Icon</lew-title>
        <p class="sub-title">
            这里强烈建议您可以使用
            <lew-mark to="https://www.xicons.org" type="info">xicons</lew-mark>，这是
            <lew-mark to="https://www.xicons.org" type="info">Naive UI</lew-mark>
            官方推荐使用的图标库，非常棒。
        </p>
        <lew-demo-box title="图标" :code="DemoIcon1_code">
            <demo-icon1 />
        </lew-demo-box>
    </div>
</template>

<script setup lang="ts">
import { DemoIcon1, DemoIcon1_code } from './demo';
</script>

<style scoped lang="scss">
.icon {
    --bg-color: rgba(255, 255, 255);
    background-image: radial-gradient(transparent 1px, var(--bg-color) 1px);
    background-size: 4px 4px;
}
</style>
