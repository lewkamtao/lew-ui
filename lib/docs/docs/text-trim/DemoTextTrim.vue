<script setup lang="ts">
import {
  DemoTextTrim1,
  DemoTextTrim1Code,
  DemoTextTrim2,
  DemoTextTrim2Code,
  DemoTextTrim3,
  DemoTextTrim3Code,
  DemoTextTrim4,
  DemoTextTrim4Code
} from './demo'
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
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
    <lew-demo-box title="基本用法" :code="DemoTextTrim1Code">
      <demo-text-trim1 />
    </lew-demo-box>
    <lew-demo-box title="多行省略" :code="DemoTextTrim2Code">
      <demo-text-trim2 />
    </lew-demo-box>
    <lew-demo-box title="文件名省略" :code="DemoTextTrim3Code">
      <demo-text-trim3 />
      <template #description>
        使用
        <code>reserve-end</code>
        属性可以在文本溢出时保留末尾的指定数量字符，这在处理文件名时特别有用。
        例如，可以保留文件扩展名，使文件类型一目了然。
      </template>
    </lew-demo-box>
    <lew-demo-box title="x轴对齐方向" :code="DemoTextTrim4Code">
      <demo-text-trim4 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
