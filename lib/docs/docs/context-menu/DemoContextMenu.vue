<script setup lang="ts">
import {
  DemoContextMenu1,
  DemoContextMenu2,
  DemoContextMenu3,
  DemoContextMenu4,
  DemoContextMenu1Code,
  DemoContextMenu2Code,
  DemoContextMenu3Code,
  DemoContextMenu4Code
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
    <lew-title>ContextMenu</lew-title>
    <p class="sub-title">通过右键点击触发弹出菜单</p>
    <lew-demo-box title="基本用法" :code="DemoContextMenu1Code">
      <demo-context-menu1 />
    </lew-demo-box>
    <lew-demo-box title="支持多级嵌套" :code="DemoContextMenu2Code">
      <demo-context-menu2 />
    </lew-demo-box>
    <lew-demo-box title="支持动态更新" :code="DemoContextMenu3Code">
      <demo-context-menu3 />
    </lew-demo-box>
    <lew-demo-box title="空状态" :code="DemoContextMenu4Code">
      <demo-context-menu4 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
