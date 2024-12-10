<script setup lang="ts">
import {
  DemoCollapse1,
  DemoCollapse1Code,
  DemoCollapse2,
  DemoCollapse2Code
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
    <lew-title>Color Picker</lew-title>
    <p class="sub-title">颜色选择器</p>
    <lew-demo-box title="基础用法" :code="DemoCollapse1Code">
      <demo-collapse1 />
    </lew-demo-box>
    <lew-demo-box title="预定义颜色" :code="DemoCollapse2Code">
      <template #desc>
        <div>
          使用 <lew-mark>predefine-colors</lew-mark> 属性预定义颜色选项。
        </div>
      </template>
      <demo-collapse2 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-color-picker {
  margin: 10px;
}
</style>
