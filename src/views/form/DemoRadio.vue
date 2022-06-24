<script setup lang="ts">
import {
    DemoRadio1,
    DemoRadio2,
    DemoRadio3,
    DemoRadio1_code,
    DemoRadio2_code,
    DemoRadio3_code,
} from '../../demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Radio</lew-title>
        <lew-demo-box title="x 布局" :code="DemoRadio1_code">
            <demo-radio1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" :code="DemoRadio2_code">
            <demo-radio2
        /></lew-demo-box>
        <lew-demo-box title="块" :code="DemoRadio3_code"
            ><demo-radio3 />
        </lew-demo-box>
    </div>
</template>
