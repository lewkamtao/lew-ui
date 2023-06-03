<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoFlex1,
  DemoFlex1_code,
  DemoFlex2,
  DemoFlex2_code,
  DemoFlex3,
  DemoFlex3_code,
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
    <lew-title>Flex</lew-title>
    <p class="sub-title">
      这是一个专门为弹性布局写的组件
    </p>
    <LewDemoBox title="row" :code="DemoFlex1_code">
      <DemoFlex1 />
    </LewDemoBox>
    <LewDemoBox title="column" :code="DemoFlex2_code">
      <DemoFlex2 />
    </LewDemoBox>
    <LewDemoBox title="mode" :code="DemoFlex3_code">
      <DemoFlex3 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
