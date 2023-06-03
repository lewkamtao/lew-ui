<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import { DemoModal1, DemoModal1_code } from './demo'
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
    <lew-title>Modal</lew-title>

    <LewDemoBox title="模态框" :code="DemoModal1_code">
      <DemoModal1 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.modal-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    box-sizing: border-box;
}
</style>
