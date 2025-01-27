<script setup lang="ts">
import {
  DemoBadge1,
  DemoBadge2,
  DemoBadge3,
  DemoBadge4,
  DemoBadge1Code,
  DemoBadge2Code,
  DemoBadge3Code,
  DemoBadge4Code
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
    <lew-demo-box title="普通" :code="DemoBadge1Code">
      <demo-badge1 />
    </lew-demo-box>
    <lew-demo-box title="点" :code="DemoBadge2Code">
      <demo-badge2 />
    </lew-demo-box>
    <lew-demo-box title="直接使用" :code="DemoBadge3Code">
      <demo-badge3 />
    </lew-demo-box>
    <lew-demo-box title="处理中" :code="DemoBadge4Code">
      <demo-badge4 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
