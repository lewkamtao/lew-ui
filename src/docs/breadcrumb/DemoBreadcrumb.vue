<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoBreadcrumb1,
  DemoBreadcrumb1_code,
  DemoBreadcrumb2,
  DemoBreadcrumb2_code,
  DemoBreadcrumb3,
  DemoBreadcrumb3_code,
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
    <lew-title>Breadcrumb</lew-title>
    <LewDemoBox title="常规" :code="DemoBreadcrumb1_code">
      <DemoBreadcrumb1 />
    </LewDemoBox>
    <LewDemoBox title="自定义当前选中" :code="DemoBreadcrumb2_code">
      <DemoBreadcrumb2 />
    </LewDemoBox>
    <LewDemoBox title="图标类型" :code="DemoBreadcrumb3_code">
      <DemoBreadcrumb3 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
