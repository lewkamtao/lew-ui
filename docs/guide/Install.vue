<script setup lang="ts">
import DocHeading from '../layout/DocHeading.vue'
import LewCodeHighlighter from '../layout/LewCodeHighlighter.vue'

const code = ref(`pnpm add lew-ui --save`)
</script>

<template>
  <div class="guide-wrapper">
    <DocHeading>安装</DocHeading>
    <p>使用 npm 安装。</p>
    <LewCodeHighlighter :code="code" lang="bash" />
  </div>
</template>
