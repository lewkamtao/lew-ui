<script setup lang="ts">
import {
  DemoDesc1,
  DemoDesc1Code,
  DemoDesc2,
  DemoDesc2Code,
  DemoDesc3,
  DemoDesc3Code,
  DemoDesc4,
  DemoDesc4Code
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
    <lew-title>Desc</lew-title>
    <br />
    <lew-demo-box title="基础用法" :code="DemoDesc1Code">
      <demo-desc1 />
    </lew-demo-box>
    <lew-demo-box title="方向" :code="DemoDesc2Code">
      <demo-desc2 />
    </lew-demo-box>
    <lew-demo-box title="丰富的" :code="DemoDesc3Code">
      <demo-desc3 />
    </lew-demo-box>
    <lew-demo-box title="支持在线配置" :code="DemoDesc4Code">
      <demo-desc4 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
