<script setup lang="ts">
import CodeBlock from 'shiki-code-block-vue'

defineProps({
  code: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
  },
  maxHeight: {
    type: String,
    default: '500px',
  },
})
</script>

<template>
  <div class="lew-code-highlighter lew-scrollbar" :style="{ maxHeight }">
    <CodeBlock
      :lang="lang as any"
      :code="code"
      :theme="{
        light: 'slack-ochin',
        dark: 'slack-dark',
      }"
    />
  </div>
</template>

<style lang="scss">
.lew-code-highlighter {
  box-sizing: border-box;
  overflow-x: auto;
}
pre {
  z-index: 1;
  padding: 15px;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  position: relative;
  background-color: var(--lew-bgcolor-0) !important;
  border-radius: var(--lew-border-radius-small);
}
code {
  display: block;
  line-height: 1.7;
  font-size: var(--lew-font-size-code) !important;
  letter-spacing: 0.05em;
  white-space: pre-wrap;
  font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace !important;
}

.shiki,
.shiki span {
  font-size: 15px;
}

.lew-dark .shiki,
.lew-dark .shiki span {
  color: var(--shiki-dark) !important;
}
</style>
