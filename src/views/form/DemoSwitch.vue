<script setup lang="ts">
import {
    DemoSwitch1,
    DemoSwitch2,
    DemoSwitch1_code,
    DemoSwitch2_code,
} from '../../demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Switch</lew-title>
        <lew-demo-box title="圆的" :code="DemoSwitch1_code">
            <demo-switch1 />
        </lew-demo-box>
        <lew-demo-box title="方的" :code="DemoSwitch2_code">
            <demo-switch2 />
        </lew-demo-box>
    </div>
</template>
