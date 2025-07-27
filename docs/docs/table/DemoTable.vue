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
  .replace(/^[A-Z]/, match => match.toLowerCase())
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
      :code="codeGroup[index]"
      :description="
        $t(`components.${componentName}.demo${index + 1}.description`)
      "
      :tips-type="$t(`components.${componentName}.demo${index + 1}.tipsType`)"
      :tips-title="$t(`components.${componentName}.demo${index + 1}.tipsTitle`)"
      :tips-content="
        $t(`components.${componentName}.demo${index + 1}.tipsContent`)
      "
    >
      <component :is="item" />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>
