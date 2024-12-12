<script setup lang="ts">
import {
  DemoMenuTree1,
  DemoMenuTree1Code,
  DemoMenuTree2,
  DemoMenuTree2Code,
  DemoMenuTree3,
  DemoMenuTree3Code,
  DemoMenuTree4,
  DemoMenuTree4Code
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
    <lew-title>Menu Tree</lew-title>
    <p class="sub-title">一个树形菜单组件，支持多级菜单结构。</p>
    <lew-demo-box title="基础用法" :code="DemoMenuTree1Code">
      <demo-menu-tree1 />
    </lew-demo-box>
    <lew-demo-box title="自定义图标" :code="DemoMenuTree2Code">
      <demo-menu-tree2 />
    </lew-demo-box>
    <lew-demo-box title="默认展开" :code="DemoMenuTree3Code">
      <template #desc>
        <div>
          通过 <lew-mark>v-model</lew-mark> 控制默认展开的菜单项。
        </div>
      </template>
      <demo-menu-tree3 />
    </lew-demo-box>
    <lew-demo-box title="自定义样式" :code="DemoMenuTree4Code">
      <demo-menu-tree4 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.demo-wrapper {
  padding: 20px;
}
</style>
