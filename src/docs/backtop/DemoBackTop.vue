<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoBackTop1,
  DemoBackTop1_code,
  DemoBackTop2,
  DemoBackTop2_code,
  DemoBackTop3,
  DemoBackTop3_code,
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
    <lew-title>BackTop</lew-title>
    <LewDemoBox title="基础用法" :code="DemoBackTop1_code">
      <DemoBackTop1 />
    </LewDemoBox>
    <LewDemoBox title="自定义内容" :code="DemoBackTop2_code">
      <DemoBackTop2 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
    <LewDemoBox title="指令" :code="DemoBackTop3_code">
      <DemoBackTop3 />
    </LewDemoBox>
  </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;

    > div {
        margin-bottom: 40px;
    }
}
</style>
