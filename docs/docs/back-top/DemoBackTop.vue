<script setup lang="ts">
import LewComponentInfo from 'docs/layout/LewComponentInfo.vue'
import LewDemoBox from 'docs/layout/LewDemoBox.vue'
import LewDocsTables from 'docs/layout/LewDocsTables.vue'
import { useRoute } from 'vue-router'
import * as API from './api'
import { codeGroup, demoGroup } from './demo'

const route = useRoute()
// 转小写
const componentName: string = (route.name as string)
  .replace('R-Lew', '')
  .replace(/^[A-Z]/, match => match.toLowerCase()) // 修正:第一个字母转小写

const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-expect-error API key access
    return API[key]
  }),
)
</script>

<template>
  <div class="demo-wrapper">
    <LewComponentInfo />
    <LewDemoBox
      v-for="(item, index) in demoGroup"
      :key="index"
      :title="$t(`components.${componentName}.demo${index + 1}.title`)"
      :description="
        $t(`components.${componentName}.demo${index + 1}.description`)
      "
      :code="codeGroup[index]"
    >
      <component :is="item" />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
