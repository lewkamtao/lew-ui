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
