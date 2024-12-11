<script setup lang="ts">
import {
  DemoColorPicker1,
  DemoColorPicker1Code,
  DemoColorPicker2,
  DemoColorPicker2Code,
  DemoColorPicker3,
  DemoColorPicker3Code,
  DemoColorPicker4,
  DemoColorPicker4Code,
  DemoColorPicker5,
  DemoColorPicker5Code
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
    <lew-demo-box title="基础用法" :code="DemoColorPicker1Code">
      <demo-color-picker1 />
    </lew-demo-box>
    <lew-demo-box title="不同尺寸" :code="DemoColorPicker2Code">
      <template #desc>
        <div>
          使用 <lew-mark>size</lew-mark> 属性设置颜色选择器的尺寸，可选值为 small、medium、large。
        </div>
      </template>
      <demo-color-picker2 />
    </lew-demo-box>
    <lew-demo-box title="自定义宽度" :code="DemoColorPicker3Code">
      <template #desc>
        <div>
          使用 <lew-mark>width</lew-mark> 属性设置颜色选择器的宽度。
        </div>
      </template>
      <demo-color-picker3 />
    </lew-demo-box>
    <lew-demo-box title="禁用状态" :code="DemoColorPicker4Code">
      <template #desc>
        <div>
          使用 <lew-mark>disabled</lew-mark> 属性禁用颜色选择器。
        </div>
      </template>
      <demo-color-picker4 />
    </lew-demo-box>
    <lew-demo-box title="只读状态" :code="DemoColorPicker5Code">
      <template #desc>
        <div>
          使用 <lew-mark>readonly</lew-mark> 属性设置颜色选择器为只读状态。
        </div>
      </template>
      <demo-color-picker5 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-color-picker {
  margin: 10px;
}
</style>
