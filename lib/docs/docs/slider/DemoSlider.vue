<script setup lang="ts">
import { DemoSlider1, DemoSlider1Code } from './demo'
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
    <lew-title>Slider</lew-title>
    <lew-demo-box title="滑块" :code="DemoSlider1Code">
      <demo-slider1 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
