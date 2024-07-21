<script setup lang="ts">
import { DemoUpload1, DemoUpload1Code } from './demo'
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
    <lew-demo-box title="row" :code="DemoUpload1Code">
      <demo-upload1 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
  margin: 10px;
}
</style>
