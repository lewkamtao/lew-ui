<script setup lang="ts">
import {
  DemoCollapse1,
  DemoCollapse1Code,
  DemoCollapse2,
  DemoCollapse2Code,
  DemoCollapse3,
  DemoCollapse3Code
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
    <lew-title>Collapse</lew-title>
    <p class="sub-title">
      这是一个参考（tou）<lew-mark
        to="https://www.naiveui.com/zh-CN/os-theme/components/gradient-text"
        >Naive-UI</lew-mark
      >的 Gradient Text 设计的组件，不能说是模仿，只能说一模一样。
    </p>
    <lew-demo-box title="任意值" :code="DemoCollapse1Code">
      <demo-collapse1 />
    </lew-demo-box>
    <lew-demo-box title="自增" :code="DemoCollapse2Code">
      <demo-collapse2 />
    </lew-demo-box>
    <lew-demo-box title="天然支持千分位" :code="DemoCollapse3Code">
      <demo-collapse3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
  margin: 10px;
}
</style>
