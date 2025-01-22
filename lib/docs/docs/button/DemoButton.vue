<script setup lang="ts">
import {
  DemoButton1,
  DemoButton2,
  DemoButton3,
  DemoButton4,
  DemoButton5,
  DemoButton6,
  DemoButton1Code,
  DemoButton2Code,
  DemoButton3Code,
  DemoButton4Code,
  DemoButton5Code,
  DemoButton6Code
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
    <lew-demo-box
      :title="$t('components.button.demo1.title')"
      :code="DemoButton1Code"
    >
      <demo-button1 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.button.demo2.title')"
      :code="DemoButton2Code"
    >
      <demo-button2 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.button.demo3.title')"
      :code="DemoButton3Code"
    >
      <demo-button3 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.button.demo4.title')"
      :code="DemoButton4Code"
    >
      <demo-button4 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.button.demo5.title')"
      :code="DemoButton5Code"
    >
      <demo-button5 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.button.demo6.title')"
      :code="DemoButton6Code"
    >
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
