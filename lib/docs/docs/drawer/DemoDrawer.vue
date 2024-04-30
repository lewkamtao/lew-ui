<script setup lang="ts">
import { DemoDrawer1, DemoDrawer1Code } from './demo'
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
