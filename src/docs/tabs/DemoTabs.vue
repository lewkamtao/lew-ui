<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import { DemoTabs1, DemoTabs1_code, DemoTabs2, DemoTabs2_code } from './demo'
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
    <lew-title>Tabs</lew-title>
    <p class="sub-title" />
    <LewDemoBox title="常规" :code="DemoTabs1_code">
      <DemoTabs1 />
      <lew-alert
        style="margin-top: 20px"
        :size="16"
        :list="[
          {
            type: 'info',
            title: '提示',
            content: `值得注意的是，按住Shift，上下滑动滚轮，可以实现横向滑动。`,
          },
        ]"
      />
    </LewDemoBox>
    <LewDemoBox title="圆形" :code="DemoTabs2_code">
      <DemoTabs2 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
