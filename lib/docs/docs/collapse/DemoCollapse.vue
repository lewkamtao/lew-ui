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

const open = (url: string) => {
  window.open(url)
}
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Collapse</lew-title>
    <p class="sub-title">折叠面板</p>
    <lew-demo-box title="常规" :code="DemoCollapse1Code">
      <demo-collapse1 />
    </lew-demo-box>
    <lew-demo-box title="标题插槽" :code="DemoCollapse2Code">
      <demo-collapse2 />
    </lew-demo-box>
    <lew-demo-box title="手风琴" :code="DemoCollapse3Code">
      <template #desc>
        <div>当 <lew-mark>v-model</lew-mark> 绑定值为字符串类型，会开启手风琴模式。</div>
      </template>
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
