<script setup lang="ts">
import {
  DemoMessage1,
  DemoMessage2,
  DemoMessage3,
  DemoMessage1Code,
  DemoMessage2Code,
  DemoMessage3Code
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
    <lew-title>Message</lew-title>
    <p class="sub-title">一个全局反馈的提示，很简单，很有灵性。</p>
    <lew-demo-box title="基本" :code="DemoMessage1Code">
      <demo-message1 />
    </lew-demo-box>
    <lew-demo-box title="可控制的" :code="DemoMessage2Code">
      <demo-message2 />
    </lew-demo-box>
    <lew-demo-box title="模拟请求" :code="DemoMessage3Code">
      <demo-message3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
