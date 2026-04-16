<script setup lang="ts">
import LewComponentInfo from 'docs/layout/LewComponentInfo.vue'
</script>

<template>
  <div class="demo-wrapper">
    <LewComponentInfo />

    <LewDemoBox title="组件废弃说明">
      <lew-alert type="warning">
        <template #title>
          Empty（LewEmpty）已废弃
        </template>
        <template #content>
          请在业务侧自行实现空状态（文案、插图与布局）。组件仍暂时导出以保持兼容，表格、选择器、树等内部展示已改为纯文案空状态，不再依赖 LewEmpty。
        </template>
      </lew-alert>
    </LewDemoBox>
  </div>
</template>
