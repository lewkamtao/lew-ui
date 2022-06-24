<script setup lang="ts">
import { ref } from 'vue';
import { DemoButton1, DemoButton2, DemoButton3, DemoButton4 } from '../../demo';

let pre1 = ref(``);
let pre2 = ref(``);
let pre3 = ref(``);
let pre4 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Button</lew-title>
        <lew-demo-box title="普通" :code="pre1"><demo-button1 /> </lew-demo-box>
        <lew-demo-box title="尺寸" :code="pre2"><demo-button2 /> </lew-demo-box>
        <lew-demo-box title="加载" :code="pre3"><demo-button3 /> </lew-demo-box>
        <lew-demo-box title="禁用" :code="pre4"><demo-button4 /> </lew-demo-box>
    </div>
</template>

<style lang="scss" scoped>
.lew-button {
    margin: 10px;
}
</style>
