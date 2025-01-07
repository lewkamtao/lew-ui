<script setup lang="ts">
import {
  DemoTextTrim1,
  DemoTextTrim1Code,
  DemoTextTrim2,
  DemoTextTrim2Code
} from './demo'
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
    <lew-title>Text Trim</lew-title>
    <p class="sub-title">
      虽然这小家伙看起来很简单，但是我觉得它非常有用，在我看来。
    </p>
    <lew-demo-box title="基本用法" :code="DemoTextTrim1Code">
      <demo-text-trim1 />
    </lew-demo-box>
    <lew-demo-box title="多行省略" :code="DemoTextTrim2Code">
      <demo-text-trim2 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
