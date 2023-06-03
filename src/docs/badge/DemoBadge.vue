<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoBadge1,
  DemoBadge1_code,
  DemoBadge2,
  DemoBadge2_code,
  DemoBadge3,
  DemoBadge3_code,
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
    <lew-title>Badge</lew-title>
    <LewDemoBox title="普通" :code="DemoBadge1_code">
      <DemoBadge1 />
    </LewDemoBox>
    <LewDemoBox title="点" :code="DemoBadge2_code">
      <DemoBadge2 />
    </LewDemoBox>
    <LewDemoBox title="直接使用" :code="DemoBadge3_code">
      <DemoBadge3 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
