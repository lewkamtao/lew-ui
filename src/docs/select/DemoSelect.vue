<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoSelect1,
  DemoSelect1_code,
  DemoSelect2,
  DemoSelect2_code,
  DemoSelect3,
  DemoSelect3_code,
  DemoSelect4,
  DemoSelect4_code,
  DemoSelect5,
  DemoSelect5_code,
  DemoSelect6,
  DemoSelect6_code,
} from './demo'
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
    <lew-title>Select</lew-title>
    <p class="sub-title">
      一个自带搜索的、支持异步请求、支持虚拟列表、支持插槽的选择器
    </p>
    <LewDemoBox title="常规" :code="DemoSelect1_code">
      <DemoSelect1 />
    </LewDemoBox>
    <LewDemoBox title="触发方式" :code="DemoSelect2_code">
      <DemoSelect2 />
    </LewDemoBox>
    <LewDemoBox title="支持搜索" :code="DemoSelect3_code">
      <DemoSelect3 />
    </LewDemoBox>
    <LewDemoBox title="插槽" :code="DemoSelect4_code">
      <DemoSelect4 />
    </LewDemoBox>
    <LewDemoBox title="禁用项" :code="DemoSelect5_code">
      <DemoSelect5 />
    </LewDemoBox>
    <LewDemoBox title="其他" :code="DemoSelect6_code">
      <DemoSelect6 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
