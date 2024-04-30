<script setup lang="ts">
import { DemoInputTag1, DemoInputTag1Code } from './demo'
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
    <lew-title>InputTag</lew-title>
    <p class="sub-title">这是一个标签的输入框</p>
    <lew-demo-box title="常规" :code="DemoInputTag1Code">
      <demo-input-tag1 />
      <lew-alert
        style="margin-top: 20px"
        :size="16"
        :list="[
          {
            type: 'info',
            title: '提示',
            content: '在focus状态下，按下Enter新增标签，快速按下两次退格删除标签。'
          }
        ]"
      />
    </lew-demo-box>
    <lew-docs-tables :options="options"></lew-docs-tables>
  </div>
</template>
