<script setup lang="ts">
import {
  DemoInputNumber1,
  DemoInputNumber1Code,
  DemoInputNumber2,
  DemoInputNumber2Code,
  DemoInputNumber3,
  DemoInputNumber3Code,
  DemoInputNumber4,
  DemoInputNumber4Code,
  DemoInputNumber5,
  DemoInputNumber5Code
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
    <lew-demo-box title="尺寸" :code="DemoInputNumber1Code">
      <demo-input-number1 />
    </lew-demo-box>
    <lew-demo-box title="聚焦时全选" :code="DemoInputNumber2Code">
      <demo-input-number2 />
    </lew-demo-box>
    <lew-demo-box title="限制范围" :code="DemoInputNumber3Code">
      <demo-input-number3 />
    </lew-demo-box>
    <lew-demo-box title="精确数值" :code="DemoInputNumber4Code">
      <demo-input-number4 />
    </lew-demo-box>
    <lew-demo-box title="禁用和只读" :code="DemoInputNumber5Code">
      <demo-input-number5 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
  margin: 10px;
}
</style>
