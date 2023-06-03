<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoSwitch1,
  DemoSwitch1_code,
  DemoSwitch2,
  DemoSwitch2_code,
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
    <lew-title>Switch</lew-title>
    <LewDemoBox title="圆的" :code="DemoSwitch1_code">
      <DemoSwitch1 />
    </LewDemoBox>
    <LewDemoBox title="方的" :code="DemoSwitch2_code">
      <DemoSwitch2 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
