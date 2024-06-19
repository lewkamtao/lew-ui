<script setup lang="ts">
import {
  DemoDrawer1,
  DemoDrawer2,
  DemoDrawer3,
  DemoDrawer4,
  DemoDrawer1Code,
  DemoDrawer2Code,
  DemoDrawer3Code,
  DemoDrawer4Code
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
    <lew-title>Drawer</lew-title>
    <lew-demo-box title="基础用法" :code="DemoDrawer1Code">
      <DemoDrawer1 />
    </lew-demo-box>
    <lew-demo-box title="异步关闭" :code="DemoDrawer2Code">
      <DemoDrawer2 />
    </lew-demo-box>
    <lew-demo-box title="自定义头部和底部" :code="DemoDrawer3Code">
      <DemoDrawer3 />
    </lew-demo-box>
    <lew-demo-box title="是否允许Esc关闭" :code="DemoDrawer4Code">
      <DemoDrawer4 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  margin: 0 auto;
  > div {
    margin-bottom: 40px;
  }
}
</style>
