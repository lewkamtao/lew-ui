<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import { DemoColor1, DemoColor1_code } from './demo'
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Color</lew-title>
    <LewDemoBox title="色彩" :code="DemoColor1_code">
      <DemoColor1 />
    </LewDemoBox>
  </div>
</template>
