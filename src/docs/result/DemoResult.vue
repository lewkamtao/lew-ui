<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import { DemoResult1, DemoResult1_code } from './demo'
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
    <lew-title>Result</lew-title>
    <LewDemoBox title="状态" :code="DemoResult1_code">
      <DemoResult1 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
