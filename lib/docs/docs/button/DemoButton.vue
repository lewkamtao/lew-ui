<script setup lang="ts">
import {
  DemoButton1,
  DemoButton2,
  DemoButton3,
  DemoButton4,
  DemoButton5,
  DemoButton6,
  DemoButton7,
  DemoButton1Code,
  DemoButton2Code,
  DemoButton3Code,
  DemoButton4Code,
  DemoButton5Code,
  DemoButton6Code,
  DemoButton7Code
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
    <lew-title>Button</lew-title>
    <p class="sub-title">Pleasant asynchronous effects</p>
    <lew-demo-box title="Type" :code="DemoButton1Code">
      <demo-button1 />
    </lew-demo-box>
    <lew-demo-box title="Size" :code="DemoButton7Code"
      ><demo-button7 />
    </lew-demo-box>
    <lew-demo-box title="Color" :code="DemoButton2Code"
      ><demo-button2 />
    </lew-demo-box>
    <lew-demo-box title="Icon" :code="DemoButton3Code"
      ><demo-button3 />
    </lew-demo-box>
    <lew-demo-box title="Loading State" :code="DemoButton4Code">
      <demo-button4 />
    </lew-demo-box>
    <lew-demo-box title="Disabled State" :code="DemoButton5Code">
      <demo-button5 />
    </lew-demo-box>
    <lew-demo-box title="Simulate Request" :code="DemoButton6Code">
      <demo-button6 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-button {
  margin: 10px;
}
</style>
