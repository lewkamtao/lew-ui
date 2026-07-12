<script setup lang="ts">
import DocHeading from '../layout/DocHeading.vue'
import LewCodeHighlighter from '../layout/LewCodeHighlighter.vue'

const code = ref(`pnpm add lew-ui
# 或
npm install lew-ui`)
</script>

<template>
  <div class="guide-wrapper">
    <DocHeading>安装</DocHeading>
    <p>使用包管理器安装：</p>
    <LewCodeHighlighter :code="code" lang="bash" />
    <p>
      安装后请在入口文件引入样式
      <code>import 'lew-ui/style'</code>，详见「如何使用」。
    </p>
  </div>
</template>
