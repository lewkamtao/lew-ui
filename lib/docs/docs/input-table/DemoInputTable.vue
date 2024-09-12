<script setup lang="ts">
import {
  DemoInputTable1,
  DemoInputTable1Code,
  DemoInputTable2,
  DemoInputTable2Code,
  DemoInputTable3,
  DemoInputTable3Code
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
    <lew-title>InputTable</lew-title>
    <p class="sub-title">输入表格组件</p>
    <lew-demo-box title="基础用法" :code="DemoInputTable1Code">
      <demo-input-table1 />
    </lew-demo-box>
    <lew-demo-box title="简洁的" :code="DemoInputTable2Code">
      <demo-input-table2 />
    </lew-demo-box>
    <lew-demo-box v-if="false" title="尺寸" :code="DemoInputTable3Code">
      <demo-input-table3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
  margin: 10px;
}
</style>
