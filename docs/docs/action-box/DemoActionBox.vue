<script setup lang="ts">
import LewComponentInfo from 'docs/layout/LewComponentInfo.vue'
import LewDemoBoxLayout from 'docs/layout/LewDemoBoxLayout.vue'
import LewDocsTables from 'docs/layout/LewDocsTables.vue'
import { useRoute } from 'vue-router'
import * as API from './api'
import { codeGroup, demoGroup } from './demo'

const route = useRoute()

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
    <LewDemoBoxLayout
      :demo-group="demoGroup"
      :code-group="codeGroup"
      :component-name="componentName"
      :columns="2"
      gap="20px"
    />
    <LewDocsTables :options="options" />
  </div>
</template>
