<script setup lang="ts">
import {
  DemoModal1,
  DemoModal2,
  DemoModal3,
  DemoModal4,
  DemoModal1Code,
  DemoModal2Code,
  DemoModal3Code,
  DemoModal4Code
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
    <lew-title>Modal</lew-title>
    <p class="sub-title">一个拥有丝滑动画的模态对话框，提供了多种配置方式。</p>
    <lew-demo-box title="基本" :code="DemoModal1Code">
      <demo-modal1 />
    </lew-demo-box>
    <lew-demo-box title="异步关闭" :code="DemoModal2Code">
      <demo-modal2 />
    </lew-demo-box>
    <lew-demo-box title="自定义头部和底部" :code="DemoModal3Code">
      <demo-modal3 />
    </lew-demo-box>
    <lew-demo-box title="是否允许esc关闭" :code="DemoModal4Code">
      <demo-modal4 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.modal-body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
}
</style>
