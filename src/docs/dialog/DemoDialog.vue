<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import { DemoDialog1, DemoDialog1_code } from './demo'
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
    <lew-title>Dialog</lew-title>
    <p class="sub-title">
      如果你需要更简单的询问框，请可以尝试一下
      <lew-mark type="info" to="/Popok">
        Popok
      </lew-mark>
    </p>
    <LewDemoBox title="快捷唤起" :code="DemoDialog1_code">
      <DemoDialog1>删除</DemoDialog1>
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
