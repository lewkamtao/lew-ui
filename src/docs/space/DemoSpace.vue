<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import {
  DemoSpace1,
  DemoSpace1_code,
  DemoSpace2,
  DemoSpace2_code,
  DemoSpace3,
  DemoSpace3_code,
} from './demo'
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Space</lew-title>
    <LewDemoBox title="row" :code="DemoSpace1_code">
      <DemoSpace1 />
    </LewDemoBox>
    <LewDemoBox title="column" :code="DemoSpace2_code">
      <DemoSpace2 />
    </LewDemoBox>
    <LewDemoBox title="mode" :code="DemoSpace3_code">
      <DemoSpace3 />
    </LewDemoBox>
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
