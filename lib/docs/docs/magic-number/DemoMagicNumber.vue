<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue';
import LewComponentInfo from '@/layout/LewComponentInfo.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
// 转小写
const componentName: string = (route.name as string)
  .replace('R-Lew', '')
  .replace(/^[A-Z]/, (match) => match.toLowerCase());
</script>

<template>
  <div class="demo-wrapper">
    <lew-component-info />
    <lew-demo-box title="组件升级通知">
      <lew-alert type="info">
        <template #title>MagicNumber 组件废弃通知</template>
        <template #content>
          我们将在 <b>v2.5.7</b> 版本中废弃 MagicNumber 组件。<br /><br />

          在不断追求卓越的过程中，我们很高兴发现了
          <a href="https://github.com/barvian/number-flow" target="_blank">
            https://github.com/barvian/number-flow
          </a>
          这个令人惊叹的库。<br />它不仅完全符合我们对高品质的追求，更能为您带来前所未有的动画体验。<br />我们推荐使用
          number-flow 作为数字动画解决方案。 <br /><br />

          <b>为什么选择 number-flow:</b><br />
          <br />
          1. 惊艳动画更具吸引力
          <br />
          2. 极致灵活的配置选项
          <br />
          3. 卓越的性能表现
          <br /><br />
          我们诚挚推荐您使用 number-flow，相信它将为您的项目注入新的活力。
        </template>
      </lew-alert>
    </lew-demo-box>
  </div>
</template>
