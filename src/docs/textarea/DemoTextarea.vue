<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoTextarea1,
  DemoTextarea1_code,
  DemoTextarea2,
  DemoTextarea2_code,
  DemoTextarea3,
  DemoTextarea3_code,
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
    <lew-title>Textarea</lew-title>
    <LewDemoBox title="尺寸" :code="DemoTextarea1_code">
      <DemoTextarea1 />
    </LewDemoBox>
    <LewDemoBox title="字数限制" :code="DemoTextarea2_code">
      <DemoTextarea2 />
    </LewDemoBox>
    <LewDemoBox title="其他" :code="DemoTextarea3_code">
      <DemoTextarea3 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
