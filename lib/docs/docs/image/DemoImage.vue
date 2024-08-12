<script setup lang="ts">
import {
  DemoImage1,
  DemoImage2,
  DemoImage3,
  DemoImage1Code,
  DemoImage2Code,
  DemoImage3Code
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
    <lew-title>Image</lew-title>
    <p class="sub-title">图片组件</p>
    <lew-demo-box title="普通" :code="DemoImage1Code">
      <demo-image1 />
    </lew-demo-box>
    <lew-demo-box title="加载状态" :code="DemoImage2Code">
      <demo-image2 />
    </lew-demo-box>
    <lew-demo-box title="加载失败" :code="DemoImage3Code">
      <demo-image3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-image {
  margin: 10px;
}
</style>
