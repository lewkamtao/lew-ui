<script setup lang="ts">
import {
  DemoAvatar1,
  DemoAvatar2,
  DemoAvatar3,
  DemoAvatar4,
  DemoAvatar1Code,
  DemoAvatar2Code,
  DemoAvatar3Code,
  DemoAvatar4Code
} from './demo'
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import LewComponentInfo from '@/layout/LewComponentInfo.vue'
import * as API from './api'
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
      :title="$t('components.avatar.demo1.title')"
      :code="DemoAvatar1Code"
    >
      <demo-avatar1 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.avatar.demo2.title')"
      :code="DemoAvatar2Code"
    >
      <demo-avatar2 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.avatar.demo3.title')"
      :code="DemoAvatar3Code"
    >
      <demo-avatar3 />
    </lew-demo-box>
    <lew-demo-box
      :title="$t('components.avatar.demo4.title')"
      :code="DemoAvatar4Code"
    >
      <demo-avatar4 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
  margin: 10px;
}
</style>
