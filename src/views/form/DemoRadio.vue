<script setup lang="ts">
import { ref } from 'vue';
import { DemoRadio1, DemoRadio2, DemoRadio3 } from '../../demo';
let pre1 = ref(``);
let pre2 = ref(``);
let pre3 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Radio</lew-title>
        <lew-demo-box title="x 布局" :code="pre1">
            <demo-radio1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" :code="pre2">
            <demo-radio2
        /></lew-demo-box>
        <lew-demo-box title="块" :code="pre3"><demo-radio3 /> </lew-demo-box>
    </div>
</template>
