<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import { DemoMessage1, DemoMessage1_code } from './demo'
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
    <lew-title>Message</lew-title>
    <LewDemoBox title="快捷唤起" :code="DemoMessage1_code">
      <DemoMessage1>删除</DemoMessage1>
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
