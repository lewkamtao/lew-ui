<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoButton1,
  DemoButton1_code,
  DemoButton2,
  DemoButton2_code,
  DemoButton3,
  DemoButton3_code,
  DemoButton4,
  DemoButton4_code,
  DemoButton5,
  DemoButton5_code,
  DemoButton6,
  DemoButton6_code,
} from './demo'
import * as API from './api'

const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-expect-error
    return API[key]
  }),
)
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Button</lew-title>
    <p class="sub-title">
      赏心悦目的异步效果
    </p>
    <LewDemoBox title="常规" :code="DemoButton1_code">
      <DemoButton1 />
    </LewDemoBox>
    <LewDemoBox title="尺寸" :code="DemoButton2_code">
      <DemoButton2 />
    </LewDemoBox>
    <LewDemoBox title="圆形" :code="DemoButton3_code">
      <DemoButton3 />
    </LewDemoBox>
    <LewDemoBox title="加载" :code="DemoButton4_code">
      <DemoButton4 />
    </LewDemoBox>
    <LewDemoBox title="其他" :code="DemoButton5_code">
      <DemoButton5 />
    </LewDemoBox>
    <LewDemoBox title="图标" :code="DemoButton6_code">
      <DemoButton6 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-button {
    margin: 10px;
}
</style>
