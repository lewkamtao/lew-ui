<script setup lang="ts">
import {
  DemoImage1,
  DemoImage2,
  DemoImage3,
  DemoImage1Code,
  DemoImage2Code,
  DemoImage3Code
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
      :title="$t('components.image.demo1.title')"
      :code="DemoImage1Code"
    >
      <demo-image1 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.image.demo2.title')"
      tips-type="warning"
      :tips-title="$t('components.image.demo2.tipsTitle')"
      :tips-content="$t('components.image.demo2.tipsContent')"
      :code="DemoImage2Code"
    >
      <demo-image2 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.image.demo3.title')"
      :code="DemoImage3Code"
    >
      <demo-image3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-image {
  margin: 10px;
}
</style>
