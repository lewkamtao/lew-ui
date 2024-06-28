<script setup lang="ts">
import { DemoMenu1, DemoMenu1Code } from './demo'
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
    <lew-title>Menu</lew-title>
    <p class="sub-title">一个简单的菜单，提供了多种配置方式。</p>
    <lew-demo-box title="常规" :code="DemoMenu1Code">
      <demo-menu1 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
