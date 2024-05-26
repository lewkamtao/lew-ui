<script setup lang="ts">
import {
  DemoInputTag1,
  DemoInputTag2,
  DemoInputTag3,
  DemoInputTag4,
  DemoInputTag5,
  DemoInputTag1Code,
  DemoInputTag2Code,
  DemoInputTag3Code,
  DemoInputTag4Code,
  DemoInputTag5Code
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
            content: '在focus状态下，按下Enter新增标签。'
          }
        ]"
      />
    </lew-demo-box>
    <lew-demo-box title="提示语" :code="DemoInputTag2Code">
      <demo-input-tag2 />
    </lew-demo-box>
    <lew-demo-box title="是否允许重复" :code="DemoInputTag3Code">
      <demo-input-tag3 />
    </lew-demo-box>
    <lew-demo-box title="受控默认值" :code="DemoInputTag4Code">
      <demo-input-tag4 />
    </lew-demo-box>
    <lew-demo-box title="其他" :code="DemoInputTag5Code">
      <demo-input-tag5 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
