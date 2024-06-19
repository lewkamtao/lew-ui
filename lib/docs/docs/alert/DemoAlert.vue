<script setup lang="ts">
import { DemoAlert1, DemoAlert1Code } from './demo'
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
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
    <lew-title>Alert</lew-title>
    <p class="sub-title">
      如果你需要使用全局的提示，请可以尝试一下
      <lew-mark type="light" color="blue" to="/Message">Message</lew-mark>
    </p>
    <lew-demo-box title="警报" :code="DemoAlert1Code">
      <demo-alert1 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
