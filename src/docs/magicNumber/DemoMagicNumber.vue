<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoMagicNumber1,
  DemoMagicNumber1_code,
  DemoMagicNumber2,
  DemoMagicNumber2_code,
  DemoMagicNumber3,
  DemoMagicNumber3_code,
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
    <lew-title>MagicNumber</lew-title>
    <p class="sub-title">
      这是一个很酷数值变化效果。
    </p>
    <LewDemoBox title="任意值" :code="DemoMagicNumber1_code">
      <DemoMagicNumber1 />
    </LewDemoBox>
    <LewDemoBox title="自增" :code="DemoMagicNumber2_code">
      <DemoMagicNumber2 />
    </LewDemoBox>
    <LewDemoBox title="天然支持千分位" :code="DemoMagicNumber3_code">
      <DemoMagicNumber3 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
