<script setup lang="ts">
import {
  DemoForm1,
  DemoForm1Code,
  DemoForm2,
  DemoForm2Code,
  DemoForm3,
  DemoForm3Code,
  DemoForm4,
  DemoForm4Code,
  DemoForm5,
  DemoForm5Code
} from './demo'
import { Send } from 'lucide-vue-next'
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import * as API from './api'

const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-ignore
    return API[key]
  })
)

const toFormEngine = () => {
  window.open('/#/form-engine')
}
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Form</lew-title>
    <p class="sub-title">这是一个基于Yup实现的表单校验引擎。</p>
    <br />
    <lew-alert type="info">
      <template #title>特别的</template>
      <template #content>
        我们重磅推出快速构建表单的引擎，可以根据自己的需求快速定制表单。<br /><br />
        该引擎的
        <strong>强校验</strong>
        功能能够提高数据的准确性和可靠性。<br />
        同时，
        <strong>强布局</strong>
        功能具有较强的约束性，让开发者不需要为布局而烦恼。<br /><br />
        现邀请您体验新一代的表单构建方式，感受<strong>强校验和强布局</strong>带来的便捷和效率提升。
      </template>
      <template #footer>
        <lew-button @click="toFormEngine" round size="small">
          立即前往
          <Send :size="14" />
        </lew-button>
      </template>
    </lew-alert>
    <lew-demo-box title="普通表单" :code="DemoForm1Code">
      <demo-form1 />
    </lew-demo-box>

    <lew-demo-box title="方向" :code="DemoForm2Code">
      <demo-form2 />
    </lew-demo-box>
    <lew-demo-box title="自定义校验" :code="DemoForm3Code">
      <demo-form3 />
    </lew-demo-box>
    <lew-demo-box title="支持网格布局" :code="DemoForm4Code">
      <demo-form4 />
    </lew-demo-box>
    <lew-demo-box title="支持在线配置" :code="DemoForm5Code">
      <template #desc>
        <div>
          你可以通过
          <lew-mark cursor="pointer" @click="toFormEngine">表单引擎</lew-mark>
          进行快捷布局表单
        </div>
      </template>
      <demo-form5 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
