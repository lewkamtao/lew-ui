<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import { DemoMark1, DemoMark1_code } from './demo'
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
    <lew-title>Mark</lew-title>
    <p class="sub-title">
      虽然这小家伙看起来很简单，但是我觉得它非常有用，在我看来。
    </p>
    <LewDemoBox title="文本标记" :code="DemoMark1_code">
      <DemoMark1>删除</DemoMark1>
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
