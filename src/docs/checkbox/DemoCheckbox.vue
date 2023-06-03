<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoCheckbox1,
  DemoCheckbox1_code,
  DemoCheckbox2,
  DemoCheckbox2_code,
  DemoCheckbox3,
  DemoCheckbox3_code,
  DemoCheckbox4,
  DemoCheckbox4_code,
  DemoCheckbox5,
  DemoCheckbox5_code,
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
    <lew-title>Checkbox</lew-title>
    <p class="sub-title">
      通过复选框选择一个或多个数据。
    </p>
    <LewDemoBox title="常规" :code="DemoCheckbox1_code">
      <DemoCheckbox1 />
    </LewDemoBox>
    <LewDemoBox title="y 布局" :code="DemoCheckbox2_code">
      <DemoCheckbox2 />
    </LewDemoBox>
    <LewDemoBox title="块" :code="DemoCheckbox3_code" tag="方的">
      <DemoCheckbox3 />
    </LewDemoBox>
    <LewDemoBox title="块" :code="DemoCheckbox4_code" tag="圆的">
      <DemoCheckbox4 />
    </LewDemoBox>
    <LewDemoBox title="单个模式" :code="DemoCheckbox5_code">
      <DemoCheckbox5 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
