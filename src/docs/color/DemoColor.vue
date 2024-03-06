<script setup lang="ts">
    import { DemoColor1, DemoColor1Code } from './demo';
    import LewDemoBox from '../../layout/LewDemoBox.vue';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Color</lew-title>
        <lew-demo-box title="色彩" :code="DemoColor1Code">
            <demo-color1 />
        </lew-demo-box>
    </div>
</template>
