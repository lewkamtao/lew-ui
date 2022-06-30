<script setup lang="ts">
import {
    DemoLayout1,
    DemoLayout1_code,
    DemoLayout2,
    DemoLayout2_code,
    DemoLayout3,
    DemoLayout3_code,
} from './demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Layout</lew-title>
        <lew-demo-box title="row" :code="DemoLayout1_code">
            <demo-layout1 />
        </lew-demo-box>
        <lew-demo-box title="column" :code="DemoLayout2_code">
            <demo-layout2 />
        </lew-demo-box>
        <lew-demo-box title="mode" :code="DemoLayout3_code">
            <demo-layout3 />
        </lew-demo-box>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
