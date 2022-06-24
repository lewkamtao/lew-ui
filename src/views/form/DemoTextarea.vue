<script setup lang="ts">
import {
    DemoTextarea1,
    DemoTextarea2,
    DemoTextarea3,
    DemoTextarea1_code,
    DemoTextarea2_code,
    DemoTextarea3_code,
} from '../../demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Textera</lew-title>
        <lew-demo-box title="x 布局" :code="DemoTextarea1_code">
            <demo-textarea1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" :code="DemoTextarea2_code">
            <demo-textarea2 />
        </lew-demo-box>
        <lew-demo-box title="禁止缩放" :code="DemoTextarea3_code">
            <demo-textarea3 />
        </lew-demo-box>
    </div>
</template>
