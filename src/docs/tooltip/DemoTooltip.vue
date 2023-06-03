<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoTooltip1,
  DemoTooltip1_code,
  DemoTooltip2,
  DemoTooltip2_code,
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
    <lew-title>Tooltip</lew-title>
    <LewDemoBox title="悬浮显示" tag="推荐" :code="DemoTooltip1_code">
      <DemoTooltip1 />
    </LewDemoBox>
    <LewDemoBox title="点击事件触发" :code="DemoTooltip2_code">
      <DemoTooltip2 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
