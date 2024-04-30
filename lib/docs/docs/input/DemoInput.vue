<script setup lang="ts">
import {
  DemoInput1,
  DemoInput2,
  DemoInput3,
  DemoInput4,
  DemoInput1Code,
  DemoInput2Code,
  DemoInput3Code,
  DemoInput4Code
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
    <lew-title>Input</lew-title>
    <lew-demo-box title="尺寸" :code="DemoInput1Code">
      <demo-input1 />
    </lew-demo-box>
    <lew-demo-box title="前后缀" :code="DemoInput2Code">
      <demo-input2 />
    </lew-demo-box>
    <lew-demo-box title="字数限制" :code="DemoInput3Code">
      <demo-input3 />
    </lew-demo-box>
    <lew-demo-box title="其他" :code="DemoInput4Code">
      <demo-input4 />
    </lew-demo-box>
    <lew-docs-tables :options="options"></lew-docs-tables>
  </div>
</template>

<style lang="scss" scoped>
.scroll-x {
  width: 100%;
  overflow-x: auto;
}
</style>
