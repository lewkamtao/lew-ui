<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoTextTrim1,
  DemoTextTrim1_code,
  DemoTextTrim2,
  DemoTextTrim2_code,
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
    <lew-title>TextTrim</lew-title>
    <p class="sub-title">
      虽然这小家伙看起来很简单，但是我觉得它非常有用，在我看来。
    </p>
    <LewDemoBox title="不换行" :code="DemoTextTrim1_code">
      <DemoTextTrim1 />
    </LewDemoBox>
    <LewDemoBox title="多行省略" :code="DemoTextTrim2_code">
      <DemoTextTrim2 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
