<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoDropdown1,
  DemoDropdown1_code,
  DemoDropdown2,
  DemoDropdown2_code,
  DemoDropdown3,
  DemoDropdown3_code,
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
    <lew-title>Dropdown</lew-title>
    <p class="sub-title">
      你可以使用
      <lew-mark to="/Popover" type="info">
        Popover
      </lew-mark>
      进行高度自定义下拉菜单
    </p>
    <LewDemoBox title="常规" :code="DemoDropdown1_code">
      <DemoDropdown1 />
    </LewDemoBox>
    <LewDemoBox title="不仅仅是按钮" :code="DemoDropdown2_code">
      <DemoDropdown2 />
    </LewDemoBox>
    <LewDemoBox title="无箭头" :code="DemoDropdown3_code">
      <DemoDropdown3 />
    </LewDemoBox>

    <LewDocsTables :options="options" />
    <p class="demo-tips">
      你可以在
      <lew-mark to="/Tooltip" type="info">
        Tooltip
      </lew-mark>
      找到你需要的位置参数。
    </p>
  </div>
</template>
