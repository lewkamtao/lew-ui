<script setup lang="ts">
import { Check, Copy } from "lucide-vue-next";
import LewCodeHighlighter from "../layout/LewCodeHighlighter.vue";

defineProps({
  code: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});

const isCopied = ref(false);

// 复制代码功能
async function copyCode(code: string) {
  try {
    await navigator.clipboard.writeText(code);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error("复制失败:", err);
    // 降级方案：使用传统的复制方法
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  }
}
</script>

<template>
  <div class="code-box">
    <!-- 标题和描述区域 -->
    <div v-if="title || description" class="code-header">
      <h3 v-if="title" class="code-title">
        {{ title }}
      </h3>
      <p v-if="description" class="code-description">
        {{ description }}
      </p>
    </div>

    <!-- 代码内容区域 -->
    <div class="hl-pre lew-scrollbar">
      <div class="copy-btn" @click="copyCode(code)">
        <Check v-if="isCopied" :size="16" class="copy-icon success" />
        <Copy v-else :size="16" class="copy-icon" />
      </div>
      <div class="pre-box">
        <LewCodeHighlighter :code="code" lang="ts" max-height="auto" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code-box {
  margin: 50px 0px 50px 0px;
  border-radius: var(--lew-border-radius-small);
  overflow: hidden;
  background-color: var(--lew-bgcolor-0);

  .code-header {
    padding: 16px;

    .code-title {
      margin: 0 0 8px 0;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.25;
    }

    .code-description {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
      opacity: 0.7;
    }
  }

  .hl-pre {
    position: relative;
    margin: 0;

    .copy-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background-color: var(--lew-bgcolor-3);
      border-radius: var(--lew-border-radius-small);
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid var(--lew-border-color-1);

      .copy-icon {
        color: var(--lew-text-color-5);
        transition: color 0.2s ease;

        &.success {
          color: #10b981;
        }
      }

      &:hover {
        background-color: var(--lew-bgcolor-4);
        border-color: var(--lew-border-color-2);

        .copy-icon:not(.success) {
          color: var(--lew-text-color-3);
        }
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
}
</style>
