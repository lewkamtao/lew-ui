<script setup lang="ts">
import { DemoColor1, DemoColor1_code } from './demo';
import LewDemoBox from '../../layout/LewDemoBox.vue';
import LewDocsTables from '../../layout/LewDocsTables.vue';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Color</lew-title>
        <lew-demo-box title="色彩" :code="DemoColor1_code">
            <demo-color1 />
        </lew-demo-box>
    </div>
</template>
