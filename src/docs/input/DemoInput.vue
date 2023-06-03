<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoInput1,
  DemoInput1_code,
  DemoInput2,
  DemoInput2_code,
  DemoInput3,
  DemoInput3_code,
  DemoInput4,
  DemoInput4_code,
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
    <lew-title>Input</lew-title>
    <LewDemoBox title="尺寸" :code="DemoInput1_code">
      <DemoInput1 />
    </LewDemoBox>
    <LewDemoBox title="前后缀" :code="DemoInput2_code">
      <DemoInput2 />
    </LewDemoBox>
    <LewDemoBox title="密码可见" :code="DemoInput3_code">
      <DemoInput3 />
    </LewDemoBox>
    <LewDemoBox title="其他" :code="DemoInput4_code">
      <DemoInput4 />
    </LewDemoBox>
    <LewDemoBox title="尺寸" :code="DemoInput1_code">
      <DemoInput1 />
    </LewDemoBox>
    <LewDemoBox title="字数限制" :code="DemoInput2_code">
      <DemoInput2 />
    </LewDemoBox>
    <LewDemoBox title="密码可见" :code="DemoInput3_code">
      <DemoInput3 />
    </LewDemoBox>
    <LewDemoBox title="其他" :code="DemoInput4_code">
      <DemoInput4 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.scroll-x {
    width: 100%;
    overflow-x: auto;
}
</style>
