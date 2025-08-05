<script setup lang="ts">
import CodeBlock from "shiki-code-block-vue";
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
    default: "500px",
  },
});
</script>
<template>
  <div class="lew-code-highlighter lew-scrollbar" :style="{ maxHeight }">
    <CodeBlock
      :lang="lang as any"
      :code="code"
      :theme="{
        light: 'github-light',
        dark: 'github-dark',
      }"
    />
  </div>
</template>

<style lang="scss">
.lew-code-highlighter {
  box-sizing: border-box;
  overflow-x: auto;
}

.lew-dark .shiki,
.lew-dark .shiki span {
  color: var(--shiki-dark) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  font-style: var(--shiki-dark-font-style) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
  background-color: var(--lew-bgcolor-0) !important;
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
}
</style>
