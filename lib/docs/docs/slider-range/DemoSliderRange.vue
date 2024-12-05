<script setup lang="ts">
import {
  DemoSliderRange1,
  DemoSliderRange1Code,
  DemoSliderRange2,
  DemoSliderRange2Code,
  DemoSliderRange3,
  DemoSliderRange3Code,
  DemoSliderRange4,
  DemoSliderRange4Code,
  DemoSliderRange5,
  DemoSliderRange5Code,
  DemoSliderRange6,
  DemoSliderRange6Code
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
    <lew-title>Slider Range</lew-title>
    <lew-demo-box title="尺寸" :code="DemoSliderRange1Code">
      <demo-slider-range1 />
    </lew-demo-box>
    <lew-demo-box title="不同步长" :code="DemoSliderRange2Code">
      <demo-slider-range2 />
    </lew-demo-box>
    <lew-demo-box title="限定范围" :code="DemoSliderRange3Code">
      <demo-slider-range3 />
    </lew-demo-box>
    <lew-demo-box title="只读" :code="DemoSliderRange4Code">
      <demo-slider-range4 />
    </lew-demo-box>
    <lew-demo-box title="禁用" :code="DemoSliderRange5Code">
      <demo-slider-range5 />
    </lew-demo-box>
    <lew-demo-box title="配置项" :code="DemoSliderRange6Code">
      <demo-slider-range6 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
