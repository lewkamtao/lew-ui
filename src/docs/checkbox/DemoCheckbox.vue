<script setup lang="ts">
import {
    DemoCheckbox1,
    DemoCheckbox2,
    DemoCheckbox3,
    DemoCheckbox4,
    DemoCheckbox1_code,
    DemoCheckbox2_code,
    DemoCheckbox3_code,
    DemoCheckbox4_code,
} from './demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Checkbox</lew-title>
        <lew-demo-box title="x 布局" tag="方的" :code="DemoCheckbox1_code">
            <demo-checkbox1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" tag="圆的" :code="DemoCheckbox2_code">
            <demo-checkbox2
        /></lew-demo-box>
        <lew-demo-box title="块" :code="DemoCheckbox3_code" tag="方的">
            <demo-checkbox3 />
        </lew-demo-box>
        <lew-demo-box title="块" :code="DemoCheckbox4_code" tag="圆的">
            <demo-checkbox4 />
        </lew-demo-box>
    </div>
</template>
