<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoTitle1,
  DemoTitle1_code,
  DemoTitle2,
  DemoTitle2_code,
  DemoTitle3,
  DemoTitle3_code,
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
    <lew-title>Title</lew-title>
    <LewDemoBox title="普通" :code="DemoTitle1_code">
      <DemoTitle1 />
    </LewDemoBox>
    <LewDemoBox title="粗体" :code="DemoTitle2_code">
      <DemoTitle2 />
    </LewDemoBox>
    <LewDemoBox title="主题色" :code="DemoTitle3_code">
      <DemoTitle3 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
