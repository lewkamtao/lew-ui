<script setup lang="ts">
import {
    DemoInput1,
    DemoInput2,
    DemoInput1_code,
    DemoInput2_code,
} from '../../demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Input</lew-title>
        <lew-demo-box title="x 布局" :code="DemoInput1_code">
            <demo-input1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" :code="DemoInput2_code">
            <demo-input2 />
        </lew-demo-box>
    </div>
</template>
