<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoNotification1,
  DemoNotification1_code,
  DemoNotification2,
  DemoNotification2_code,
} from './demo'
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
    <lew-title>Notification</lew-title>
    <LewDemoBox title="快捷唤起" :code="DemoNotification1_code">
      <DemoNotification1>删除</DemoNotification1>
    </LewDemoBox>
    <LewDemoBox title="自定义展示时间" :code="DemoNotification2_code">
      <DemoNotification2 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
