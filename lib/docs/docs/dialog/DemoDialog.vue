<script setup lang="ts">
import {
  DemoDialog1,
  DemoDialog1Code,
  DemoDialog2,
  DemoDialog2Code
} from './demo'
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import * as API from './api'
import LewComponentInfo from '@/layout/LewComponentInfo.vue'
const options = ref(
  Object.keys(API).map((key) => {
    // @ts-ignore
    return API[key]
  })
)
</script>

<template>
  <div class="demo-wrapper">
    <lew-component-info />
    <lew-demo-box title="快捷唤起" :code="DemoDialog1Code">
      <demo-dialog1 />
    </lew-demo-box>
    <lew-demo-box title="简单的" :code="DemoDialog2Code">
      <demo-dialog2 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
