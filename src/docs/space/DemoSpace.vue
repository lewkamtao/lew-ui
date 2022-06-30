<script setup lang="ts">
import {
    DemoSpace1,
    DemoSpace1_code,
    DemoSpace2,
    DemoSpace2_code,
    DemoSpace3,
    DemoSpace3_code,
} from './demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Space</lew-title>
        <lew-demo-box title="row" :code="DemoSpace1_code">
            <demo-space1 />
        </lew-demo-box>
        <lew-demo-box title="column" :code="DemoSpace2_code">
            <demo-space2 />
        </lew-demo-box>
        <lew-demo-box title="mode" :code="DemoSpace3_code">
            <demo-space3 />
        </lew-demo-box>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
