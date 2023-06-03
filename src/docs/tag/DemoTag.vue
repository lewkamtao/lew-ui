<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoTag1,
  DemoTag1_code,
  DemoTag2,
  DemoTag2_code,
  DemoTag3,
  DemoTag3_code,
  DemoTag4,
  DemoTag4_code,
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
    <lew-title>Tag</lew-title>
    <LewDemoBox title="基础" :code="DemoTag1_code">
      <DemoTag1 />
    </LewDemoBox>
    <LewDemoBox title="尺寸" :code="DemoTag2_code">
      <DemoTag2 />
    </LewDemoBox>
    <LewDemoBox title="禁用与关闭" :code="DemoTag3_code">
      <DemoTag3 />
    </LewDemoBox>
    <LewDemoBox title="插槽" :code="DemoTag4_code">
      <DemoTag4 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
