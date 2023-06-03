<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import { DemoDrawer1, DemoDrawer1_code } from './demo'
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
    <lew-title>Drawer</lew-title>
    <LewDemoBox title="基础用法" :code="DemoDrawer1_code">
      <DemoDrawer1 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin-bottom: 40px;
    }
}
</style>
