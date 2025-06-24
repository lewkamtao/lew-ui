<script setup lang="ts">
import { demoGroup, codeGroup } from './demo';
import LewDemoBox from '@/layout/LewDemoBox.vue';
import LewDocsTables from '@/layout/LewDocsTables.vue';
import * as API from './api';
import LewComponentInfo from '@/layout/LewComponentInfo.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
// 转小写
const componentName: string = (route.name as string)
  .replace('R-Lew', '')
  .replace(/^[A-Z]/, (match) => match.toLowerCase());
const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-ignore
    return API[key];
  })
);
</script>

<template>
  <div class="demo-wrapper">
    <lew-component-info />
    <lew-demo-box
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
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>
