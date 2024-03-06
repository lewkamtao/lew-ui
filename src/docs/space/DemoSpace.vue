<script setup lang="ts">
import {
    DemoSpace1,
    DemoSpace1Code,
    DemoSpace2,
    DemoSpace2Code,
    DemoSpace3,
    DemoSpace3Code,
} from './demo';
import LewDemoBox from '../../layout/LewDemoBox.vue';
import LewDocsTables from '../../layout/LewDocsTables.vue';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Space</lew-title>
        <lew-demo-box title="row" :code="DemoSpace1Code">
            <demo-space1 />
        </lew-demo-box>
        <lew-demo-box title="column" :code="DemoSpace2Code">
            <demo-space2 />
        </lew-demo-box>
        <lew-demo-box title="mode" :code="DemoSpace3Code">
            <demo-space3 />
        </lew-demo-box>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
