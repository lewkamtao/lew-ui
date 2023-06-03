<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import { DemoInputTag1, DemoInputTag1_code } from './demo'
import { API } from './api'

const options = ref(
  Object.keys(API).map((key: any) => {
    return (API as any)[key]
  }),
)
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>InputTag</lew-title>
    <p class="sub-title">
      这是一个标签的输入框
    </p>
    <LewDemoBox title="常规" :code="DemoInputTag1_code">
      <DemoInputTag1 />
      <lew-alert
        style="margin-top: 20px"
        :size="16"
        :list="[
          {
            type: 'info',
            title: '提示',
            content:
              '在focus状态下，按下Enter新增标签，快速按下两次退格删除标签。',
          },
        ]"
      />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
