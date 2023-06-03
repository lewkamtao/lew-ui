<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoRadio1,
  DemoRadio1_code,
  DemoRadio2,
  DemoRadio2_code,
  DemoRadio3,
  DemoRadio3_code,
} from './demo'
import * as API from './api'

const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-expect-error
    return API[key]
  }),
)
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Radio</lew-title>
    <LewDemoBox title="常规" :code="DemoRadio1_code">
      <DemoRadio1 />
    </LewDemoBox>
    <LewDemoBox title="y 布局" :code="DemoRadio2_code">
      <DemoRadio2 />
    </LewDemoBox>
    <LewDemoBox title="块" :code="DemoRadio3_code">
      <DemoRadio3 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
