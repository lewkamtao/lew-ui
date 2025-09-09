<script setup lang="ts">
import LewCodeHighlighter from '../layout/LewCodeHighlighter.vue'

const code = ref(`pnpm add lew-ui --save`)
</script>

<template>
  <div class="guide-wrapper">
    <lew-title>安装</lew-title>
    <p>使用 npm 安装。</p>
    <LewCodeHighlighter :code="code" lang="bash" />
  </div>
</template>
