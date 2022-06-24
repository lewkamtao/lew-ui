<script setup lang="ts">
import { ref } from 'vue';
import { DemoInput1, DemoInput2 } from '../../demo';

let pre1 = ref(``);
let pre2 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Input</lew-title>
        <lew-demo-box title="x 布局" :code="pre1">
            <demo-input1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" :code="pre2">
            <demo-input2 />
        </lew-demo-box>
    </div>
</template>
