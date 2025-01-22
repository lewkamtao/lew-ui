<script setup lang="ts">
import {
  DemoTag1,
  DemoTag2,
  DemoTag3,
  DemoTag4,
  DemoTag5,
  DemoTag6,
  DemoTag1Code,
  DemoTag2Code,
  DemoTag3Code,
  DemoTag4Code,
  DemoTag5Code,
  DemoTag6Code
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
    <lew-demo-box title="Type" :code="DemoTag1Code">
      <demo-tag1 />
    </lew-demo-box>
    <lew-demo-box title="Size" :code="DemoTag2Code">
      <demo-tag2 />
    </lew-demo-box>
    <lew-demo-box title="Color System" :code="DemoTag3Code">
      <demo-tag3 />
    </lew-demo-box>
    <lew-demo-box title="Disabled and Closable" :code="DemoTag4Code">
      <demo-tag4 />
    </lew-demo-box>
    <lew-demo-box title="Left and Right Slots" :code="DemoTag5Code">
      <demo-tag5 />
    </lew-demo-box>
    <lew-demo-box v-if="false" title="Disabled" :code="DemoTag6Code">
      <demo-tag6 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
