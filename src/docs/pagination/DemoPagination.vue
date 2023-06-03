<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoPagination1,
  DemoPagination1_code,
  DemoPagination2,
  DemoPagination2_code,
  DemoPagination3,
  DemoPagination3_code,
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
    <lew-title>Pagination</lew-title>
    <p class="sub-title">
      一个高颜值的、支持双向绑定的分页器
    </p>
    <LewDemoBox title="常规" :code="DemoPagination1_code">
      <DemoPagination1 />
    </LewDemoBox>
    <LewDemoBox title="巨量" :code="DemoPagination2_code">
      <DemoPagination2 />
    </LewDemoBox>
    <LewDemoBox title="模拟异步" :code="DemoPagination3_code">
      <DemoPagination3 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
