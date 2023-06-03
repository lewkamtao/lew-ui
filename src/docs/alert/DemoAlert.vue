<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import { DemoAlert1, DemoAlert1_code } from './demo'
import * as API from './api'

const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-expect-error
    return API[key]
  }),
)
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Alert</lew-title>
    <p class="sub-title">
      如果你需要使用全局的提示，请可以尝试一下
      <lew-mark type="info" to="/Message">
        Message
      </lew-mark>
    </p>
    <LewDemoBox title="警报" :code="DemoAlert1_code">
      <DemoAlert1 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
