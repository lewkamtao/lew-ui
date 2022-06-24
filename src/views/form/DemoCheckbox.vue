<script setup lang="ts">
import { ref } from 'vue';
import {
    DemoCheckbox1,
    DemoCheckbox2,
    DemoCheckbox3,
    DemoCheckbox4,
} from '../../demo';

let pre1 = ref(``);
let pre2 = ref(``);
let pre3 = ref(``);
let pre4 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Checkbox</lew-title>
        <lew-demo-box title="x 布局" badge="方的" :code="pre1">
            <demo-checkbox1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" badge="圆的" :code="pre2">
            <demo-checkbox2
        /></lew-demo-box>
        <lew-demo-box title="块" :code="pre3" badge="方的">
            <demo-checkbox3 />
        </lew-demo-box>
        <lew-demo-box title="块" :code="pre4" badge="圆的">
            <demo-checkbox4 />
        </lew-demo-box>
    </div>
</template>
