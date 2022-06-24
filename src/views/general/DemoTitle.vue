<script setup lang="ts">
import { ref } from 'vue';
import { DemoTitle1, DemoTitle2 } from '../../demo';

let pre1 = ref(``);
let pre2 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Title</lew-title>
        <lew-demo-box title="普通" :code="pre1"> <demo-title1 /> </lew-demo-box>
        <lew-demo-box title="粗体" :code="pre2"> <demo-title2 /> </lew-demo-box>
    </div>
</template>
