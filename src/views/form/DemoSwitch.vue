<script setup lang="ts">
import { ref } from 'vue';
import { DemoSwitch1, DemoSwitch2 } from '../../demo';

let pre1 = ref(``);
let pre2 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Switch</lew-title>
        <lew-demo-box title="圆的" :code="pre1">
            <demo-switch1 />
        </lew-demo-box>
        <lew-demo-box title="方的" :code="pre2">
            <demo-switch2 />
        </lew-demo-box>
    </div>
</template>
