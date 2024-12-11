<script setup lang="ts">
import { DemoMenu1, DemoMenu1Code } from './demo'
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
    <lew-title>Menu</lew-title>
    <p class="sub-title">
      一个简单的菜单组件，仅支持两级菜单结构。如果需要更多层级的菜单，建议使用<lew-mark
        cursor="pointer"
        @click="push('/menu-tree')"
        >Menu Tree
      </lew-mark>
      组件。
    </p>
    <lew-demo-box title="常规" :code="DemoMenu1Code">
      <demo-menu1 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
