<script setup lang="ts">
import LewComponentInfo from 'docs/layout/LewComponentInfo.vue'
</script>

<template>
  <div class="demo-wrapper">
    <LewComponentInfo />

    <LewDemoBox title="组件废弃说明">
      <lew-alert type="warning">
        <template #title>
          BackTop（LewBackTop / v-backtop）已废弃
        </template>
        <template #content>
          建议使用浏览器原生滚动或自行实现「回到顶部」按钮。LewBackTop 与 <code>v-backtop</code> 指令仍暂时保留以保持兼容。
        </template>
      </lew-alert>
    </LewDemoBox>
  </div>
</template>
