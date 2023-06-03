<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import { DemoLoading1, DemoLoading1_code } from './demo'
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
    <lew-title>Loading</lew-title>
    <LewDemoBox title="普通" :code="DemoLoading1_code">
      <DemoLoading1 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
