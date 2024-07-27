<script setup lang="ts">
import {
  DemoUpload1,
  DemoUpload2,
  DemoUpload3,
  DemoUpload1Code,
  DemoUpload2Code,
  DemoUpload3Code
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
    <lew-title>Upload</lew-title>
    <p class="sub-title">上传组件</p>
    <lew-demo-box title="常规" :code="DemoUpload1Code">
      <demo-upload1 />
    </lew-demo-box>
    <lew-demo-box title="自定义上传" :code="DemoUpload2Code">
      <demo-upload2 />
    </lew-demo-box>
    <lew-demo-box title="上传图片" :code="DemoUpload3Code">
      <demo-upload3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
  margin: 10px;
}
</style>
