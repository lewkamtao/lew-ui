<script setup lang="ts">
import { ref } from 'vue';
import { DemoTextarea1, DemoTextarea2, DemoTextarea3 } from '../../demo';
let pre1 = ref(``);
let pre2 = ref(``);
let pre3 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Textera</lew-title>
        <lew-demo-box title="x 布局" :code="pre1">
            <demo-textarea1 />
        </lew-demo-box>
        <lew-demo-box title="y 布局" :code="pre2">
            <demo-textarea2 />
        </lew-demo-box>
        <lew-demo-box title="禁止缩放" :code="pre3">
            <demo-textarea3 />
        </lew-demo-box>
    </div>
</template>
