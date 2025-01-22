<script setup lang="ts">
import {
  DemoSlider1,
  DemoSlider1Code,
  DemoSlider2,
  DemoSlider2Code,
  DemoSlider3,
  DemoSlider3Code,
  DemoSlider4,
  DemoSlider4Code,
  DemoSlider5,
  DemoSlider5Code,
  DemoSlider6,
  DemoSlider6Code
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

    <lew-demo-box title="尺寸" :code="DemoSlider1Code">
      <demo-slider1 />
    </lew-demo-box>
    <lew-demo-box title="不同步长" :code="DemoSlider2Code">
      <demo-slider2 />
    </lew-demo-box>
    <lew-demo-box title="限定范围" :code="DemoSlider3Code">
      <demo-slider3 />
    </lew-demo-box>
    <lew-demo-box title="只读" :code="DemoSlider4Code">
      <demo-slider4 />
    </lew-demo-box>
    <lew-demo-box title="禁用" :code="DemoSlider5Code">
      <demo-slider5 />
    </lew-demo-box>
    <lew-demo-box title="配置项" :code="DemoSlider6Code">
      <demo-slider6 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
