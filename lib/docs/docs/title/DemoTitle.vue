<script setup lang="ts">
import {
  DemoTitle1,
  DemoTitle2,
  DemoTitle3,
  DemoTitle1Code,
  DemoTitle2Code,
  DemoTitle3Code
} from './demo'
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import * as API from './api'
import LewComponentInfo from '@/layout/LewComponentInfo.vue'
const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-ignore
    return API[key]
  })
)
</script>
<template>
  <div class="demo-wrapper">
    <lew-component-info />
    <lew-demo-box
      :title="$t('components.title.demo1.title')"
      :code="DemoTitle1Code"
    >
      <demo-title1 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.title.demo2.title')"
      :code="DemoTitle2Code"
    >
      <demo-title2 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.title.demo3.title')"
      :code="DemoTitle3Code"
    >
      <demo-title3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
