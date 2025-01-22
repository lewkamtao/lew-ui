<script setup lang="ts">
import { DemoPopover1, DemoPopover1Code } from './demo'
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import * as API from './api'
import LewComponentInfo from '@/layout/LewComponentInfo.vue'
const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-ignore
    return API[key]
  })
)
</script>

<template>
  <div class="demo-wrapper">
    <lew-component-info />
    <lew-demo-box title="询问校验" badge="自定义 HTML" :code="DemoPopover1Code">
      <demo-popover1 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
