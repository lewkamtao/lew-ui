<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import { DemoPopover1, DemoPopover1_code } from './demo'
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
    <lew-title>Popover</lew-title>
    <p class="sub-title">
      如果你需要信息提示，请可以尝试一下
      <lew-mark type="info" to="/Tooltip">
        Tooltip
      </lew-mark>
    </p>
    <LewDemoBox
      title="询问校验"
      badge="自定义 HTML"
      :code="DemoPopover1_code"
    >
      <DemoPopover1 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
