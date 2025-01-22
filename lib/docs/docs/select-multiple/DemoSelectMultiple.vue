<script setup lang="ts">
import {
  DemoSelectMultiple2,
  DemoSelectMultiple1,
  DemoSelectMultiple3,
  DemoSelectMultiple4,
  DemoSelectMultiple5,
  DemoSelectMultiple6,
  DemoSelectMultiple7,
  DemoSelectMultiple8,

  DemoSelectMultiple1Code,
  DemoSelectMultiple2Code,
  DemoSelectMultiple3Code,
  DemoSelectMultiple4Code,
  DemoSelectMultiple5Code,
  DemoSelectMultiple6Code,
  DemoSelectMultiple7Code,
  DemoSelectMultiple8Code
} from './demo'
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
    <lew-demo-box title="常规" :code="DemoSelectMultiple1Code">
      <demo-select-multiple1 />
    </lew-demo-box>
    <lew-demo-box title="触发方式" :code="DemoSelectMultiple2Code">
      <demo-select-multiple2 />
    </lew-demo-box>
    <lew-demo-box title="支持搜索" :code="DemoSelectMultiple3Code">
      <demo-select-multiple3 />
    </lew-demo-box>
    <lew-demo-box title="插槽" :code="DemoSelectMultiple4Code">
      <demo-select-multiple4 />
    </lew-demo-box>
    <lew-demo-box title="禁用项" :code="DemoSelectMultiple5Code">
      <demo-select-multiple5 />
    </lew-demo-box>
    <lew-demo-box title="其他" :code="DemoSelectMultiple6Code">
      <demo-select-multiple6 />
    </lew-demo-box>
    <lew-demo-box title="空状态插槽" :code="DemoSelectMultiple7Code">
      <demo-select-multiple7 />
    </lew-demo-box>
    <lew-demo-box title="分组" :code="DemoSelectMultiple8Code">
      <demo-select-multiple8 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
