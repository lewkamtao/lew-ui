<script setup lang="ts">
import LewComponentInfo from 'docs/layout/LewComponentInfo.vue'
import LewDemoBox from 'docs/layout/LewDemoBox.vue'
import LewDocsTables from 'docs/layout/LewDocsTables.vue'
import { useRoute } from 'vue-router'
import LewCodeBox from '../../components/LewCodeBox.vue'
import * as API from './api'
import { codeGroup, demoGroup } from './demo'
import uploadHelperCode from './uploadHelper.ts?raw'

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
      :description="$t(`components.${componentName}.demo${index + 1}.description`)"
      :code="codeGroup[index]"
    >
      <component :is="item" />
    </LewDemoBox>
    <LewCodeBox title="uploadHelper.ts" :code="uploadHelperCode" />
    <LewDocsTables :options="options" />
  </div>
</template>
