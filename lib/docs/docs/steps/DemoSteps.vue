<script setup lang="ts">
import {
  DemoSteps1,
  DemoSteps2,
  DemoSteps3,
  DemoSteps1Code,
  DemoSteps2Code,
  DemoSteps3Code
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
    <lew-demo-box title="普通" :code="DemoSteps1Code">
      <demo-steps1 />
    </lew-demo-box>
    <lew-demo-box title="状态" :code="DemoSteps2Code">
      <demo-steps2 />
    </lew-demo-box>
    <lew-demo-box title="Loading" :code="DemoSteps3Code">
      <demo-steps3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
