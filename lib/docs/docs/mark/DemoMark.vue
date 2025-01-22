<script setup lang="ts">
import { DemoMark1, DemoMark1Code } from './demo'
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
    <lew-demo-box title="文本标记" :code="DemoMark1Code">
      <demo-mark1>删除</demo-mark1></lew-demo-box
    >
    <lew-docs-tables :options="options" />
  </div>
</template>
