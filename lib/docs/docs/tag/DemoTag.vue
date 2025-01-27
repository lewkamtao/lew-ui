<script setup lang="ts">
import {
  DemoTag1,
  DemoTag2,
  DemoTag3,
  DemoTag4,
  DemoTag5,
  DemoTag6,
  DemoTag7,
  DemoTag1Code,
  DemoTag2Code,
  DemoTag3Code,
  DemoTag4Code,
  DemoTag5Code,
  DemoTag6Code,
  DemoTag7Code
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
      :title="$t('components.tag.demo1.title')"
      :code="DemoTag1Code"
    >
      <demo-tag1 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.tag.demo2.title')"
      :code="DemoTag2Code"
    >
      <demo-tag2 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.tag.demo3.title')"
      :code="DemoTag3Code"
    >
      <demo-tag3 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.tag.demo4.title')"
      :code="DemoTag4Code"
    >
      <demo-tag4 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.tag.demo5.title')"
      :code="DemoTag5Code"
    >
      <demo-tag5 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.tag.demo6.title')"
      :code="DemoTag6Code"
    >
      <demo-tag6 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.tag.demo7.title')"
      :code="DemoTag7Code"
    >
      <demo-tag7 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
