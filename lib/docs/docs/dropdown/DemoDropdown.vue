<script setup lang="ts">
import {
  DemoDropdown1,
  DemoDropdown2,
  DemoDropdown3,
  DemoDropdown1Code,
  DemoDropdown2Code,
  DemoDropdown3Code
} from './demo'
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import * as API from './api'

const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-ignore
    return API[key]
  })
)

const { push } = useRouter()
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Dropdown</lew-title>
    <p class="sub-title">
      你可以使用
      <lew-mark
        cursor="pointer"
        k
        @click="push('/Popover')"
        type="light"
        color="blue"
        >Popover</lew-mark
      >
      进行高度自定义下拉菜单
    </p>
    <lew-demo-box title="常规" :code="DemoDropdown1Code">
      <demo-dropdown1 />
    </lew-demo-box>
    <lew-demo-box title="不仅仅是按钮" :code="DemoDropdown2Code">
      <demo-dropdown2 />
    </lew-demo-box>
    <lew-demo-box title="无箭头" :code="DemoDropdown3Code">
      <demo-dropdown3 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
    <p class="demo-tips">
      你可以在
      <lew-mark
        cursor="pointer"
        @click="push('/Tooltip')"
        type="light"
        color="blue"
        >Tooltip</lew-mark
      >
      找到你需要的位置参数。
    </p>
  </div>
</template>
