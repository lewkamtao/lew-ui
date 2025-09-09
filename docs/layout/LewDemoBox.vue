<script setup lang="ts">
import { renderDescription } from 'docs/lib/utils'
import docsLocale from 'docs/locals'
import { LewCollapseTransition } from 'lew-ui'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-vue-next'
import LewCodeHighlighter from './LewCodeHighlighter.vue'

defineProps({
  title: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: '',
  },
  tipsContent: {
    type: String,
    default: '',
  },
  tipsType: {
    type: String,
    default: 'info',
  },
  tipsTitle: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  code: {
    type: String,
    default: '',
  },
})

const isShowCode = ref(false)
const isCopied = ref(false)

const checkHasContent = computed(() => (text: string) => {
  if (text && text.indexOf('components.') !== 0) {
    return true
  }
  return false
})

// 复制代码功能
async function copyCode(code: string) {
  try {
    await navigator.clipboard.writeText(code)
    isCopied.value = true
    LewMessage.success(docsLocale.t('base.copySuccess'))
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  }
  catch (err) {
    console.error('复制失败:', err)
    // 降级方案：使用传统的复制方法
    const textArea = document.createElement('textarea')
    textArea.value = code
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="demo-box">
    <lew-title :id="title" size="18px" class="demo-docs-title">
      {{ title }}
      <lew-tag
        v-if="checkHasContent(tag)"
        type="light"
        color="blue"
        style="margin: 2px 0px 0px 5px"
      >
        {{ tag }}
      </lew-tag>
    </lew-title>
    <lew-alert
      v-if="checkHasContent(tipsContent)"
      :type="checkHasContent(tipsType) ? tipsType : 'info'"
      :title="tipsTitle"
      :content="tipsContent"
    />
    <div class="desc">
      <RenderComponent
        v-if="checkHasContent(description)"
        :render-fn="renderDescription(description)"
      />
    </div>
    <div class="demo-item">
      <div class="demo-cp lew-scrollbar">
        <slot />
      </div>
      <LewCollapseTransition>
        <div v-show="isShowCode && code" class="hl-pre">
          <div class="copy-btn" @click="copyCode(code)">
            <Check v-if="isCopied" :size="16" class="copy-icon success" />
            <Copy v-else :size="16" class="copy-icon" />
          </div>
          <div class="pre-box lew-scrollbar">
            <LewCodeHighlighter :code="code" lang="vue" />
          </div>
        </div>
      </LewCollapseTransition>
      <div class="show-bar" @click="isShowCode = !isShowCode">
        <div class="icon">
          <ChevronDown v-if="!isShowCode" :size="16" />
          <ChevronUp v-else :size="16" />
        </div>
        {{
          isShowCode
            ? docsLocale.t("base.close")
            : docsLocale.t("base.showCode")
        }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-box {
  margin: 20px 0px;

  .desc {
    margin: 20px 0px;
    color: var(--lew-text-color-5);
  }

  .demo-item {
    margin: 10px 0px;
    background-color: var(--lew-bgcolor-0);
    border-radius: var(--lew-border-radius-small);
    box-shadow: var(--lew-box-shadow);
    overflow: hidden;
  }

  .demo-docs-title {
    text-transform: capitalize;
  }

  .hl-pre {
    position: relative;
    border-top: var(--lew-border-1);

    .pre-box {
      border-radius: var(--lew-border-radius-small);
    }

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

  .show-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: var(--lew-border-1);
    width: 100%;
    height: 35px;
    font-size: 14px;
    cursor: pointer;
    color: #999;
    background-color: var(--lew-bgcolor-1);

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    }
  }

  .show-bar:hover {
    background-color: var(--lew-bgcolor-3);
    color: var(--lew-text-color-3);
  }

  .demo-cp {
    width: 100%;
    overflow-x: auto;
    box-sizing: border-box;
    padding: 30px;
  }

  @media (max-width: 767px) {
    .demo-cp {
      overflow-x: auto;
    }
  }
}
</style>
