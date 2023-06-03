<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import { DemoIcon1, DemoIcon1_code, DemoIcon2, DemoIcon2_code } from './demo'
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Icon</lew-title>
    <p class="sub-title">
      由
      <lew-mark
        type="info"
        to="https://fengyuanchen.github.io/vue-feather/"
      >
        vue-feather
      </lew-mark>
      强力驱动
    </p>
    <LewDemoBox title="图标" :code="DemoIcon1_code">
      <DemoIcon1 />
    </LewDemoBox>
    <LewDemoBox title="旋转动画" :code="DemoIcon2_code">
      <DemoIcon2 />
    </LewDemoBox>
  </div>
</template>

<style scoped lang="scss">
.icon {
    --bg-color: rgba(255, 255, 255);
    background-image: radial-gradient(transparent 1px, var(--bg-color) 1px);
    background-size: 4px 4px;
}
</style>
