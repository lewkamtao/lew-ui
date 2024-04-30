<script setup lang="ts">
import { DemoLoading1, DemoLoading1Code } from './demo'
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
    <lew-title>Loading</lew-title>
    <lew-demo-box title="普通" :code="DemoLoading1Code">
      <demo-loading1 />
    </lew-demo-box>
    <lew-docs-tables :options="options"></lew-docs-tables>
  </div>
</template>
