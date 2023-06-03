<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoPopok1,
  DemoPopok1_code,
  DemoPopok2,
  DemoPopok2_code,
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
    <lew-title>Popok</lew-title>
    <LewDemoBox title="简单的询问" tag="click" :code="DemoPopok1_code">
      <DemoPopok1 />
    </LewDemoBox>

    <LewDemoBox title="简单的询问" tag="hover" :code="DemoPopok2_code">
      <DemoPopok2 />
    </LewDemoBox>
    <lew-title :size="16">
      Props
    </lew-title>
    <LewDocsTables :options="options" />
  </div>
</template>
