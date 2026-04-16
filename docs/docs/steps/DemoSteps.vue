<script setup lang="ts">
import LewComponentInfo from 'docs/layout/LewComponentInfo.vue'
</script>

<template>
  <div class="demo-wrapper">
    <LewComponentInfo />

    <LewDemoBox title="组件废弃说明">
      <lew-alert type="warning">
        <template #title>
          Steps（LewSteps）已移除
        </template>
        <template #content>
          <code>LewSteps</code> / <code>lew-steps</code> 已从本组件库中删除，相关主题变量（<code>--lew-color-steps-*</code>）与导出类型一并移除。<br><br>
          若需步骤条，请在业务中自行实现（如结合 <code>LewFlex</code>、图标与文案），或使用其他满足设计体系的方案。
        </template>
      </lew-alert>
    </LewDemoBox>
  </div>
</template>
