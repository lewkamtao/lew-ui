<script setup lang="ts">
import { DemoAlert1, DemoAlert1_code } from '../../demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Alert</lew-title>
        <lew-demo-box title="警报" :code="DemoAlert1_code">
            <demo-alert1 />
        </lew-demo-box>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin: 30px 0px;
    }
}
</style>
