<script setup lang="ts">
import {
  DemoAlert1,
  DemoAlert1Code,
  DemoAlert2,
  DemoAlert2Code,
  DemoAlert3,
  DemoAlert3Code
} from './demo'
import LewDemoBox from '@/layout/LewDemoBox.vue'
import LewDocsTables from '@/layout/LewDocsTables.vue'
import LewComponentInfo from '@/layout/LewComponentInfo.vue'
import * as API from './api'

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
    <lew-demo-box title="基础用法" :code="DemoAlert1Code">
      <demo-alert1 />
    </lew-demo-box>
    <lew-demo-box title="支持插槽" :code="DemoAlert2Code">
      <demo-alert2 />
    </lew-demo-box>
    <lew-demo-box title="更多场景" :code="DemoAlert3Code">
      <demo-alert3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
