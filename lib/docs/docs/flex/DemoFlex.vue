<script setup lang="ts">
import {
  DemoFlex1,
  DemoFlex1Code,
  DemoFlex2,
  DemoFlex2Code,
  DemoFlex3,
  DemoFlex3Code
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

    <lew-demo-box title="row" :code="DemoFlex1Code">
      <demo-flex1 />
    </lew-demo-box>
    <lew-demo-box title="column" :code="DemoFlex2Code">
      <demo-flex2 />
    </lew-demo-box>
    <lew-demo-box title="mode" :code="DemoFlex3Code">
      <demo-flex3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
  margin: 10px;
}
</style>
