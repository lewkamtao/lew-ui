<script setup lang="ts">
import {
  DemoUpload1,
  DemoUpload2,
  DemoUpload3,
  DemoUpload4,
  DemoUpload5,
  DemoUpload6,
  DemoUpload7,
  DemoUpload1Code,
  DemoUpload2Code,
  DemoUpload3Code,
  DemoUpload4Code,
  DemoUpload5Code,
  DemoUpload6Code,
  DemoUpload7Code
} from './demo'
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import uploadHelper from './uploadHelper.ts?raw'
import * as API from './api'
import LewComponentInfo from '@/layout/LewComponentInfo.vue'
const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-ignore
    return API[key]
  })
)
</script>

<template>
  <div class="demo-wrapper">
    <lew-component-info />
    <lew-demo-box title="常规" :code="DemoUpload1Code">
      <demo-upload1 />
    </lew-demo-box>
    <lew-demo-box title="限制格式和大小" :code="DemoUpload2Code">
      <demo-upload2 />
    </lew-demo-box>
    <lew-demo-box title="上传图片" :code="DemoUpload3Code">
      <demo-upload3 />
    </lew-demo-box>
    <lew-demo-box title="自定义tips" :code="DemoUpload4Code">
      <demo-upload4 />
    </lew-demo-box>
    <lew-demo-box title="照片墙" :code="DemoUpload5Code">
      <demo-upload5 />
    </lew-demo-box>
    <lew-demo-box title="不上传" :code="DemoUpload6Code">
      <demo-upload6 />
    </lew-demo-box>
    <lew-demo-box title="回显" :code="DemoUpload7Code">
      <demo-upload7 />
    </lew-demo-box>
    <lew-title size="18">uploadHelper 上传方法处理例子</lew-title>
    <div class="pre-box">
      <highlightjs autodetect :code="uploadHelper" />
    </div>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
  margin: 10px;
}
.pre-box {
  margin-bottom: 30px;
}
</style>
