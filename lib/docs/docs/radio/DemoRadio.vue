<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoRadio1,
  DemoRadio2,
  DemoRadio3,
  DemoRadio1Code,
  DemoRadio2Code,
  DemoRadio3Code
} from './demo'
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
    <lew-title>Radio</lew-title>
    <lew-demo-box title="常规" :code="DemoRadio1Code">
      <demo-radio1 />
    </lew-demo-box>
    <lew-demo-box title="y 布局" :code="DemoRadio2Code"> <demo-radio2 /></lew-demo-box>
    <lew-demo-box title="块" :code="DemoRadio3Code"><demo-radio3 /> </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
