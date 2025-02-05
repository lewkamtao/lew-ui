<script setup lang="ts">
import {
  DemoBadge1,
  DemoBadge2,
  DemoBadge3,
  DemoBadge4,
  DemoBadge5,
  DemoBadge1Code,
  DemoBadge2Code,
  DemoBadge3Code,
  DemoBadge4Code,
  DemoBadge5Code
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
      :title="$t('components.badge.demo1.title')"
      :code="DemoBadge1Code"
    >
      <demo-badge1 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.badge.demo2.title')"
      :code="DemoBadge2Code"
    >
      <demo-badge2 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.badge.demo3.title')"
      :code="DemoBadge3Code"
    >
      <demo-badge3 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.badge.demo4.title')"
      :code="DemoBadge4Code"
    >
      <demo-badge4 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.badge.demo5.title')"
      :code="DemoBadge5Code"
    >
      <demo-badge5 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
