<script setup lang="ts">
import { DemoAlert1, DemoAlert1Code, DemoAlert2, DemoAlert2Code, DemoAlert3, DemoAlert3Code } from './demo'
import LewDemoBox from '@/layout/LewDemoBox.vue'
import LewDocsTables from '@/layout/LewDocsTables.vue'
import * as API from './api'

const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-ignore
    return API[key]
  })
)

const { push } = useRouter()
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Alert</lew-title>
    <p class="sub-title">
      如果你需要使用全局的提示，请可以尝试一下
      <lew-mark
        type="light"
        cursor="pointer"
        color="blue"
        @click="push('/Message')"
        >Message</lew-mark
      >
    </p>
    <lew-demo-box title="基础用法" :code="DemoAlert1Code">
      <demo-alert1 />
    </lew-demo-box>
    <lew-demo-box title="支持插槽" :code="DemoAlert2Code">
      <demo-alert2 />
    </lew-demo-box>
    <lew-demo-box title="更多场景" :code="DemoAlert3Code">
      <demo-alert3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
