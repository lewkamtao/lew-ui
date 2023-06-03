<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoForm1,
  DemoForm1_code,
  DemoForm2,
  DemoForm2_code,
  DemoForm3,
  DemoForm3_code,
  DemoForm4,
  DemoForm4_code,
  DemoForm5,
  DemoForm5_code,
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
    <lew-title>Form</lew-title>
    <p class="sub-title">
      这是一个基于Yup实现的表单校验引擎。
    </p>

    <LewDemoBox title="普通表单" :code="DemoForm1_code">
      <DemoForm1 />
    </LewDemoBox>

    <LewDemoBox title="方向" :code="DemoForm2_code">
      <DemoForm2 />
    </LewDemoBox>
    <LewDemoBox title="自定义校验" :code="DemoForm3_code">
      <DemoForm3 />
    </LewDemoBox>
    <LewDemoBox title="总览" :code="DemoForm4_code">
      <DemoForm4 />
    </LewDemoBox>
    <LewDemoBox title="其他" :code="DemoForm5_code">
      <DemoForm5 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
