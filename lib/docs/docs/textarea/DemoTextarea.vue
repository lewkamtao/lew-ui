<script setup lang="ts">
import {
  DemoTextarea1,
  DemoTextarea2,
  DemoTextarea3,
  DemoTextarea4,
  DemoTextarea5,
  DemoTextarea6,
  DemoTextarea7,
  DemoTextarea1Code,
  DemoTextarea2Code,
  DemoTextarea3Code,
  DemoTextarea4Code,
  DemoTextarea5Code,
  DemoTextarea6Code,
  DemoTextarea7Code
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
    <lew-title>Textarea</lew-title>
    <lew-demo-box title="尺寸" :code="DemoTextarea1Code">
      <demo-textarea1 />
    </lew-demo-box>
    <lew-demo-box title="字数限制" :code="DemoTextarea2Code">
      <demo-textarea2 />
    </lew-demo-box>
    <lew-demo-box title="聚焦后选择全部文本" :code="DemoTextarea3Code">
      <demo-textarea3 />
    </lew-demo-box>
    <lew-demo-box title="可清空的" :code="DemoTextarea4Code"> <demo-textarea4 /> </lew-demo-box>
    <lew-demo-box title="只读和禁用" :code="DemoTextarea5Code"> <demo-textarea5 /> </lew-demo-box>
    <lew-demo-box title="缩放模式" :code="DemoTextarea6Code"> <demo-textarea6 /> </lew-demo-box>
    <lew-demo-box title="按下回车键触发事件" :code="DemoTextarea7Code">
      <demo-textarea7 />
      <lew-alert
        style="margin-top: 20px"
        :size="16"
        :options="[
          {
            type: 'info',
            title: '提示',
            content: '当开启时，按下 shift +  enter 可以进行换行。'
          }
        ]"
      />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
