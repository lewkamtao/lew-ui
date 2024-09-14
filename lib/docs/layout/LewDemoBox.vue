<script setup lang="ts">
import { LewCollapseTransition } from 'lew-ui'

defineProps({
  title: {
    type: String,
    default() {
      return ''
    }
  },
  tag: {
    type: String,
    default() {
      return ''
    }
  },
  code: {
    type: String,
    default() {
      return ''
    }
  }
})

const isShowCode = ref(false)
</script>

<template>
  <div class="demo-box">
    <lew-title :id="title" :size="18" class="demo-docs-title"
      >{{ title }}
      <lew-tag v-if="tag" type="light" color="blue" style="margin: 2px 0px 0px 5px">
        {{ tag }}
      </lew-tag>
    </lew-title>
    <div class="desc">
      <slot name="desc"></slot>
    </div>
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
          <lew-icon v-if="!isShowCode" :size="16" type="chevron-down" />
          <lew-icon v-else :size="16" type="chevron-up" />
        </div>
        {{ isShowCode ? '关闭' : '显示源码' }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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
