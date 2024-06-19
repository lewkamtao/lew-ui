<script setup lang="ts">
import {
  DemoDatePicker1,
  DemoDatePicker2,
  DemoDatePicker3,
  DemoDatePicker4,
  DemoDatePicker5,
  DemoDatePicker1Code,
  DemoDatePicker2Code,
  DemoDatePicker3Code,
  DemoDatePicker4Code,
  DemoDatePicker5Code
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
    <lew-title>DatePicker</lew-title>
    <p class="sub-title">一个很漂亮的、支持双向绑定的日期选择器。</p>
    <lew-demo-box title="常规" :code="DemoDatePicker1Code">
      <template #desc>
        <div>
          设置 <lew-mark>size</lew-mark> 可以使用四种尺寸 <lew-mark>small</lew-mark
          ><lew-mark>medium</lew-mark><lew-mark>large</lew-mark> 的输入框。
        </div>
      </template>
      <demo-date-picker1 />
    </lew-demo-box>
    <lew-demo-box title="可清空的" :code="DemoDatePicker2Code">
      <template #desc>
        <div>设置 <lew-mark>clearable</lew-mark> 可以开启展示按钮</div>
      </template>
      <demo-date-picker2 />
    </lew-demo-box>
    <lew-demo-box title="格式化" :code="DemoDatePicker3Code">
      <template #desc>
        <div><lew-mark>valueFormat</lew-mark> 可以设置日期格式，默认格式为 YYYY-MM-DD</div>
      </template>
      <demo-date-picker3 />
    </lew-demo-box>
    <lew-demo-box title="快捷选项" :code="DemoDatePicker4Code">
      <demo-date-picker4 />
    </lew-demo-box>
    <lew-demo-box title="其他" :code="DemoDatePicker5Code">
      <demo-date-picker5 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
