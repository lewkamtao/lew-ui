<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoTooltip1,
  DemoTooltip1_code,
  DemoTooltip2,
  DemoTooltip2_code,
  DemoTooltip3,
  DemoTooltip3_code,
  DemoTooltip4,
  DemoTooltip4_code,
  DemoTooltip5,
  DemoTooltip5_code,
} from './demo'
import * as API from './api'

const options = Object.keys(API).map((key: any) => {
  return (API as any)[key]
})
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Uplaod</lew-title>
    <p class="sub-title">
      通过点击或者拖拽上传文件。
    </p>
    <LewDemoBox title="基础用法" :code="DemoTooltip1_code">
      <DemoTooltip1 />
    </LewDemoBox>

    <LewDemoBox title="照片墙" :code="DemoTooltip2_code">
      <DemoTooltip2 />
    </LewDemoBox>

    <LewDemoBox title="图片列表缩略图" :code="DemoTooltip3_code">
      <DemoTooltip3 />
    </LewDemoBox>

    <LewDemoBox title="拖拽上传" :code="DemoTooltip4_code">
      <DemoTooltip4 />
    </LewDemoBox>

    <LewDemoBox title="手动上传" :code="DemoTooltip5_code">
      <DemoTooltip5 />
    </LewDemoBox>
    <br>
    <LewDocsTables :options="options" />
  </div>
</template>
