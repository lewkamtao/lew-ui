<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoRate1,
  DemoRate2,
  DemoRate3,
  DemoRate1Code,
  DemoRate2Code,
  DemoRate3Code
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
    <lew-title>Rate</lew-title>
    <lew-demo-box title="常规" :code="DemoRate1Code">
      <demo-rate1 />
    </lew-demo-box>
    <lew-demo-box title="y 布局" :code="DemoRate2Code">
      <demo-rate2
    /></lew-demo-box>
    <lew-demo-box title="块" :code="DemoRate3Code"
      ><demo-rate3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
