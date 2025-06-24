<script setup lang="ts">
import { LewCollapseTransition } from 'lew-ui';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';
import docsLocale from '@/locals';
import { renderDescription } from '@/lib/utils';
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
});

const isShowCode = ref(false);
const checkHasContent = computed(() => (text: string) => {
  if (text && text.indexOf('components.') !== 0) {
    return true;
  }
  return false;
});
</script>

<template>
  <div class="demo-box">
    <lew-title :id="title" :size="18" class="demo-docs-title"
      >{{ title }}
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
    <div
      v-if="checkHasContent(description)"
      class="desc"
      v-html="renderDescription(description)"
    ></div>
    <div class="demo-item">
      <div class="demo-cp lew-scrollbar">
        <slot></slot>
      </div>
      <LewCollapseTransition>
        <div v-if="isShowCode && code" class="hl-pre lew-scrollbar">
          <div class="pre-box">
            <highlightjs autodetect :code="code" />
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
            ? docsLocale.t('base.close')
            : docsLocale.t('base.showCode')
        }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-box {
  margin: 50px 0px 50px 0px;
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
    overflow-y: auto;
    overflow-x: hidden;
    border-top: var(--lew-border-1);
    max-height: 500px;

    .pre-box {
      border-radius: var(--lew-border-radius-small);
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
