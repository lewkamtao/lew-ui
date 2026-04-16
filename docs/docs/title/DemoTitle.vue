<script setup lang="ts">
import LewComponentInfo from 'docs/layout/LewComponentInfo.vue'
</script>

<template>
  <div class="demo-wrapper">
    <LewComponentInfo />

    <LewDemoBox title="组件废弃说明">
      <lew-alert type="warning">
        <template #title>
          Title（LewTitle）已废弃
        </template>
        <template #content>
          请优先使用语义化标题（如 <code>h1</code>–<code>h6</code>）或自行组合字号、字重与颜色。文档站内标题已改用 <code>DocHeading</code> 展示样式；LewTitle 仍导出以保持兼容。
        </template>
      </lew-alert>
    </LewDemoBox>
  </div>
</template>
