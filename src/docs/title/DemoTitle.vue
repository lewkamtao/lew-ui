<script setup lang="ts">
import {
    DemoTitle1,
    DemoTitle2,
    DemoTitle1_code,
    DemoTitle2_code,
} from './demo';
</script>
<template>
    <div class="demo-wrapper">
        <lew-title>Title</lew-title>
        <lew-demo-box title="普通" :code="DemoTitle1_code">
            <demo-title1 />
        </lew-demo-box>
        <lew-demo-box title="粗体" :code="DemoTitle2_code">
            <demo-title2 />
        </lew-demo-box>
    </div>
</template>
