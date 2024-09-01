<script setup lang="ts">
import {
  DemoTabs1,
  DemoTabs2,
  DemoTabs3,
  DemoTabs4,
  DemoTabs5,
  DemoTabs1Code,
  DemoTabs2Code,
  DemoTabs3Code,
  DemoTabs4Code,
  DemoTabs5Code
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
    <lew-title>Tabs</lew-title>
    <p class="sub-title">可切换选项卡</p>
    <lew-demo-box title="常规" :code="DemoTabs1Code">
      <demo-tabs1 />
      <lew-alert
        style="margin-top: 20px"
        :size="16"
        :options="[
          {
            type: 'info',
            title: '提示',
            content: `值得注意的是，按住Shift，上下滑动滚轮，可以实现横向滑动。`
          }
        ]"
      />
    </lew-demo-box>
    <lew-demo-box title="自适应宽度" :code="DemoTabs2Code"> <demo-tabs2 /></lew-demo-box>
    <lew-demo-box title="自定义item宽度" :code="DemoTabs3Code"> <demo-tabs3 /></lew-demo-box>
    <lew-demo-box title="线" :code="DemoTabs4Code"> <demo-tabs4 /></lew-demo-box>
    <lew-demo-box title="圆形" :code="DemoTabs5Code"> <demo-tabs5 /></lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
