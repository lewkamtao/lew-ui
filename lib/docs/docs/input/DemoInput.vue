<script setup lang="ts">
import {
  DemoInput1,
  DemoInput2,
  DemoInput3,
  DemoInput4,
  DemoInput5,
  DemoInput6,
  DemoInput7,
  DemoInput8,
  DemoInput9,
  DemoInput10,
  DemoInput11,
  DemoInput1Code,
  DemoInput2Code,
  DemoInput3Code,
  DemoInput4Code,
  DemoInput5Code,
  DemoInput6Code,
  DemoInput7Code,
  DemoInput8Code,
  DemoInput9Code,
  DemoInput10Code
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

    <lew-demo-box title="尺寸" :code="DemoInput1Code">
      <demo-input1 />
    </lew-demo-box>
    <lew-demo-box title="前后缀" :code="DemoInput2Code">
      <demo-input2 />
    </lew-demo-box>
    <lew-demo-box title="字数限制" :code="DemoInput3Code">
      <demo-input3 />
    </lew-demo-box>
    <lew-demo-box title="对齐方式" :code="DemoInput4Code">
      <demo-input4 />
    </lew-demo-box>
    <lew-demo-box title="密码可见" :code="DemoInput5Code">
      <demo-input5 />
    </lew-demo-box>
    <lew-demo-box title="宽度自适应" :code="DemoInput6Code">
      <demo-input6 />
    </lew-demo-box>
    <lew-demo-box title="聚焦后选择全部文本" :code="DemoInput7Code">
      <demo-input7 />
    </lew-demo-box>
    <lew-demo-box title="可清空的" :code="DemoInput8Code">
      <demo-input8 />
    </lew-demo-box>
    <lew-demo-box title="只读状态" :code="DemoInput9Code">
      <demo-input9 />
    </lew-demo-box>
    <lew-demo-box title="禁用状态" :code="DemoInput10Code">
      <demo-input10 />
    </lew-demo-box>
    <lew-demo-box title="按下回车键触发事件" :code="DemoInput10Code">
      <demo-input11 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.scroll-x {
  width: 100%;
  overflow-x: auto;
}
</style>
