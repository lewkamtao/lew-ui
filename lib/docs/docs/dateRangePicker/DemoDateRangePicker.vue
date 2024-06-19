<script setup lang="ts">
import {
  DemoDateRangePicker1,
  DemoDateRangePicker2,
  DemoDateRangePicker3,
  DemoDateRangePicker1Code,
  DemoDateRangePicker2Code,
  DemoDateRangePicker3Code
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
    <lew-demo-box title="常规" :code="DemoDateRangePicker1Code">
      <demo-date-range-picker1 />
    </lew-demo-box>
    <lew-demo-box title="可清空的" :code="DemoDateRangePicker2Code">
      <demo-date-range-picker2 />
    </lew-demo-box>
    <lew-demo-box title="其他" :code="DemoDateRangePicker3Code">
      <demo-date-range-picker3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
